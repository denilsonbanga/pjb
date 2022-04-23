import React from 'react';
import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Traducao, inicial } from './views'
import CameraScreen from './views/Camera';
import SendWord from './views/SendWord';

export default function App() {
  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="inicial"
          component={inicial}
          options={{
            title: "Dicionário",
            headerTintColor: '#333',
            headerStyle: { backgroundColor: '#da2' },
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
          }}

        />

        <Stack.Screen name="Palavras"
          component={Home}
          options={{
            headerShown: false,
            title: "Palavras",
            headerTintColor: '#333',
            headerStyle: { backgroundColor: '#da2' },
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
          }}
        />
        <Stack.Screen name="Traducao"
          component={Traducao}
          options={{
            title: "Tradução",
            headerTintColor: '#333',
            headerStyle: { backgroundColor: '#da2' },
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
          }
          } />
        <Stack.Screen name="SendWord"
          component={SendWord}
          options={{
            title: "Enviar palavra",
            headerTintColor: '#333',
            headerStyle: { backgroundColor: '#da2' },
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
          }
          } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
