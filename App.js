import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux'
import Home from "./screens/Home"
import Board from "./screens/Board"
import NewGame from './screens/NewGame';
import Setts from './screens/Setts';
import DebriefScreen from './screens/DebriefScreen';
import storeRedux from './storeRedux';
import Tutorial from './screens/Tutorial';
import QualtricsScreen from './screens/QualtricsScreen'

const Stack = createStackNavigator();
const store = storeRedux
export default function App() {
  
  return (
    <Provider store ={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="NewGame" component={NewGame}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Setts" component={Setts}/>
          <Stack.Screen name="Board" component={Board}/>
          <Stack.Screen name="DebriefScreen" component={DebriefScreen}/>
          <Stack.Screen name="Tutorial" component={Tutorial}/>
          <Stack.Screen name="QualtricsScreen" component={QualtricsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
