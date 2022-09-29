import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import {WebView} from 'react-native-webview'
import {useState} from 'react'
import styles from "../../utilities/styles";

export default function Debrief({navigation}){
  let webref
  return (
    <View style={{ backgroundColor: "white", height: "100%", width: "100%", justifyContent: "center", flex: 1 }}>
    {/*
      <WebView
        source={{ uri: "https://virginia.az1.qualtrics.com/jfe/form/SV_b8cxNgVQ6Dx6GB8" }}
        style={{ margin: "10%" }}
        ref={(r) => webref = r}
        injectedJavaScript={jsCode}
        onMessage={(data) => {
          if(data.nativeEvent.data!=null){
            setRid(data.nativeEvent.data)
          }
        }}
            />
    */}
      <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={()=>{
            navigation.navigate("Home")}
            }
            style={[styles.type1button, { width: "50%", alignItems: "center", marginBottom: "20%" }]}
          >
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
        </View>
    )
}