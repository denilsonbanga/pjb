import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { db } from '../services/config';

const SendWord = ({ route, navigation }) => {
  const [wordTranslation, setWordTranslation] = useState({
    portuguese: route.word,
    kikongo: "",
    kimbundo: ""
  })
  const [statusRequest, setStatusRequest] = useState({
    isSending: false,
    finishSuccess: false,
    finishWithError: false,
    message: ""
  })

  async function sendWordToMail() {
    if (wordTranslation.portuguese === "") {
      setStatusRequest({ ...statusRequest, message: "Qual é a palavra em portugues", finishSuccess: false })
      return;
    } else if (wordTranslation.kikongo === "") {
      setStatusRequest({ ...statusRequest, message: "Qual é o significado em kikongo", finishSuccess: false })
      return;
    } else if (wordTranslation.kimbundo === "") {
      setStatusRequest({ ...statusRequest, message: "Qual é o significado em kimbundo", finishSuccess: false })
      return;
    }
    setStatusRequest({ ...statusRequest, isSending: true, message: "", finishSuccess: false, finishWithError: false })

    db.ref('/dicionario').push({
      check: false,
      portuguese: wordTranslation.portuguese,
      kibundo: wordTranslation.kimbundo,
      kikongo: wordTranslation.kikongo
    });
    Alert.alert('Sucesso!', 'Operação terminada com sucesso!');

    setWordTranslation({
      kikongo: '',
      kibundo: '',
      portuguese: ''
    })
  }
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>

        <TextInput
          placeholder="Palavra em protugues"
          onChangeText={(e) => setWordTranslation({ ...wordTranslation, portuguese: e })}
          value={wordTranslation.portuguese}
          style={{ width: "100%", borderBottomColor: "#000", borderBottomWidth: 1, fontSize: 20, marginBottom: 30, }} defaultValue={route.params.word} />

        <TextInput
          placeholder="Significado em KIKONGO"
          onChangeText={(e) => setWordTranslation({ ...wordTranslation, kikongo: e })}
          value={wordTranslation.kikongo}
          style={{ width: "100%", borderBottomColor: "#000", borderBottomWidth: 1, marginBottom: 30, fontSize: 20 }} />

        <TextInput
          placeholder="Significado em KIMBUNDO"
          onChangeText={(e) => setWordTranslation({ ...wordTranslation, kimbundo: e })}
          value={wordTranslation.kimbundo}
          style={{ width: "100%", borderBottomColor: "#000", borderBottomWidth: 1, fontSize: 20, marginBottom: 30, }} />

        <Text style={{ fontSize: 18, color: (statusRequest.finishSuccess ? "green" : "red") }}>{statusRequest.message}</Text>
      </View>
      {statusRequest.isSending ?
        <View
          style={{ width: "100%", backgroundColor: "#da2", padding: 10, borderRadius: 20 }}>
          <Text style={{ fontSize: 20, textAlign: "center" }} >Enviar</Text>
        </View>
        :
        <TouchableOpacity style={{ width: "100%", backgroundColor: "#da2", padding: 10, borderRadius: 20 }} onPress={() => sendWordToMail()}>
          <Text style={{ fontSize: 20, textAlign: "center" }} >Enviar</Text>
        </TouchableOpacity>
      }

    </View>
  )
}

export default SendWord;