import React from 'react';
import { View, Image, Text, TextInput } from 'react-native';

import { css } from '../assets/css/Css'

export default function inicial(props) {


  return (

    <View style={{ backgroundColor: '#fff', height: '100%', width: '100%', padding: 10 }}>
      <Image style={css.logo} source={require('../assets/img/icon.png')}></Image>
      <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 17, marginTop: '2%', width: '100%' }}>DICIONÁRIO</Text>
      <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 17, marginTop: '2%', width: '100%' }}>PORTUGUÊS KIKONGO</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: '2%', textAlign: 'center', width: '100%' }}>PORTUGUÊS KIMBUNDO</Text>
      <TextInput style={css.inputt} placeholder='Pesquisar' onFocus={() => props.navigation.navigate('Palavras')} />
      <Text style={{ fontSize: 16, marginTop: '35%', textAlign: 'center', width: '100%' }} > Powered By Projecto Gloth</Text>
    </View>

  );
}