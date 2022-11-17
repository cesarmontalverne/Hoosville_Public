import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux'
import Home from "./screens/Home"
import Board from "./screens/Board"
import NewGame from './screens/NewGame';
import DebriefScreen from './screens/DebriefScreen';
import storeRedux from './storeRedux';
import Tutorial from './screens/Tutorial';
import QualtricsScreen from './screens/QualtricsScreen'
import Account from './screens/Account'

const Stack = createStackNavigator();
const store = storeRedux
export default function App() {
  
  return (
    <Provider store ={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, gestureEnabled: false }}>
          <Stack.Screen name="NewGame" component={NewGame}/>
          <Stack.Screen name="Account" component={Account}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Board" component={Board}/>
          <Stack.Screen name="DebriefScreen" component={DebriefScreen}/>
          <Stack.Screen name="Tutorial" component={Tutorial}/>
          <Stack.Screen name="QualtricsScreen" component={QualtricsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}