
import React from 'react'
import { css } from '../assets/css/Css'
import { Text, View, TouchableOpacity } from 'react-native';
import Tts from 'react-native-tts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function Home(props) {
  Tts.setDefaultLanguage('pt-PT');
  Tts.addEventListener('tts-start', event => console.log('start', event));
  Tts.addEventListener('tts-finish', event => console.log('finish', event));
  Tts.addEventListener('tts-cancel', event => console.log('cancel', event));
  Tts.setDefaultRate(0.1);

  const _onPressSpeech = (textToSpeech) => {
    Tts.stop();
    Tts.speak(textToSpeech);
  }

  return (
    <View style={css.container, { height: '100%', backgroundColor: '#fff' }}>
      <Text style={css.wordTra} >{props.route.params.key} </Text>

      {props.route.params.trad.indexOf(",") > 0 ?
        <View style={{ paddingHorizontal: 20 }}>
          <View >
            <Text style={css.tradu}>Kimbundo:</Text>
            <TouchableOpacity
              onPress={() => _onPressSpeech(props.route.params.trad)}
              style={{ ...css.tradu, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
              <MaterialIcons name="settings-voice" size={20} />
              <Text style={{ fontWeight: "normal", fontSize: 20 }}>{props.route.params.trad}</Text>
            </TouchableOpacity>
          </View>
          <View >
            <Text style={css.tradu}>Kikongo:</Text>
            <TouchableOpacity
              onPress={() => _onPressSpeech(props.route.params.kiko)}
              style={{ ...css.tradu, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
              <MaterialIcons name="settings-voice" size={20} />
              <Text style={{ fontWeight: "normal", fontSize: 20 }}>{props.route.params.kiko}</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={{ paddingHorizontal: 20 }}>
          <View >
            <View >
              <Text style={css.tradu}>Português: </Text>
              <TouchableOpacity
                onPress={() => _onPressSpeech(props.route.params.trad)}
                style={{ ...css.tradu, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
              >
                <MaterialIcons name="settings-voice" size={20} />
                <Text style={{ ...css.tradu, fontWeight: "normal" }}>{props.route.params.trad}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Kikongo: </Text>
              
              <TouchableOpacity
                onPress={() => _onPressSpeech(props.route.params.kiko)}
                style={{ ...css.tradu, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
              >
                <MaterialIcons name="settings-voice" size={20} />
                <Text style={{ ...css.tradu, fontWeight: "normal" }}>{props.route.params.kiko}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <Text style={{ fontSize: 17, textAlign: 'center', width: '100%' }} > Ajuda-nos a Manter-se Online
        </Text>
        <Text style={{ fontSize: 17, textAlign: 'center', width: '100%' }} > Faça a sua Doação
        </Text>
        <Text style={{ fontSize: 17, textAlign: 'center', width: '100%' }} > Iban: 0040.0000.2320.1453.1018.5
        </Text>
      </View>

    </View>
  );
}