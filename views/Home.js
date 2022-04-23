import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Voice from '@react-native-voice/voice';

import { db } from '../services/config';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { css } from '../assets/css/Css'
import { RNCamera } from 'react-native-camera';

export default function Home(props) {
  const [isRecord, setIsRecord] = useState(false);
  const [text, setText] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [dados, setDados] = useState([])
  const [dicionario, setDicionario] = useState([])


  useEffect(() => {
    Keyboard.dismiss()
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    let result = []
    db.ref('/dicionario').orderByValue().on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        let item = data.val() ? data.val() : {};
        
        if (item.check) {
          if (result.indexOf(item) < 0)
            result.push({
              name: item.portuguese,
              value: item.kibundo,
              kikongo: item.kikongo
            })
        }
      });

      setDados(result)
      setDicionario(result)
      setIsLoading(false)
    });
  }, [])

  // dados.sort(function (a, b) {
  //   return (a.name).localeCompare(b.name);
  // });

  function selectImage() {
    setShowCamera(true);
  }
  const _onSpeechStart = (event) => {
    setText('');
  };
  const _onSpeechEnd = () => {
    setIsRecord(false)
  };
  const _onSpeechResults = (event) => {
    setText(event.value[0]);
    search(event.value[0])
  };

  const _onSpeechError = (event) => {
    setIsRecord(false)
  };
  const _onRecordVoice = () => {
    if (isRecord) {
      Voice.stop();
      search(text)
    } else {
      Voice.start('pt-PT', {
        "RECOGNIZER_ENGINE": "GOOGLE",
        "EXTRA_PARTIAL_RESULTS": true
      });
    }
    setIsRecord(!isRecord);
  };

  //Função de pesquisa 
  function search(value = "") {

    let data = [...dados], result = []

    for (let i = 0; i < data.length; i++) {
      if (data[i].name.toLowerCase().includes(value.toLowerCase())) {

        result.push(data[i])
      }
    }
    setText(value)
    setDicionario(result);
  }

  const renderCamera = () => (
    <RNCamera
      // ref={ref => {
      //   camera = ref;
      // }}
      style={{
        flex: 1,
        width: '100%',
      }}
      type={'back'}
      flashMode={'off'}
      autoFocus={'on'}
      zoom={0}
      whiteBalance={'auto'}
      ratio={'16:9'}
      focusDepth={0}
      trackingEnabled
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}

      onTextRecognized={({ textBlocks }) => {
        if (textBlocks.length > 0) {
          console.log(textBlocks)
          setText(textBlocks[0].value)
          search(textBlocks[0].value)
          setShowCamera(false);
        }
      }}
    ></RNCamera>
  )
  if (showCamera)
    return renderCamera();


  return (

    <View style={{ backgroundColor: '#fff', height: '100%' }}>
      <View style={{ backgroundColor: '#da2', padding: 2, borderTopColor: '#da2' }}>

        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', fontSize: 17, marginTop: '7%', marginBottom: '4%', width: '100%' }}>Palavras</Text>

        <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
          <TextInput style={css.input} autoFocus={true} placeholder='Pesquisar' onChangeText={(e) => search(e)} defaultValue={text} />
          {isRecord ?
            <TouchableOpacity >
              <Icon name="keyboard-voice" size={30} color="#757575" />
            </TouchableOpacity> :
            <TouchableOpacity onPress={_onRecordVoice} >
              <Icon name="keyboard-voice" size={30} color={"black"} />
            </TouchableOpacity>
          }

          <TouchableOpacity onPress={() => selectImage()} >
            <Icon name="image-search" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ?
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <Text>Carregando os dados...</Text>
        </View> :
        <View >
          {/* Meu txt pesquisar */}
          {dicionario.length === 0 &&
            <View style={{ marginTop: "1%", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>Palavra Não Encontrada.</Text>
              <TouchableOpacity style={{ height: 40, marginTop: 20, backgroundColor: "#da2", padding: 10, borderRadius: 10 }}
                onPress={() => props.navigation.navigate("SendWord", { word: text })}
              >
                <Text style={{ color: "#000", fontSize: 20, lineHeight: 20 }}>Adicionar palavra</Text>
              </TouchableOpacity>
            </View>
          }
          {dicionario.length === 0 ?
            null :
            <FlatList style={css.container}
              data={dicionario}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) =>
                <Text
                  style={css.palavras}
                  onPress={() => props.navigation.navigate('Traducao', { key: item.name, trad: item.value.toString(), kiko: item.kikongo.toString() })} >{item.name}</Text>}
            />
          }
        </View>
      }
    </View>

  );
}