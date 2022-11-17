import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import {WebView} from 'react-native-webview'
import {useState} from 'react'
import styles from "../../utilities/styles";
import loadSheets from "../../apis/loadSheets";
import {connect, useDispatch} from 'react-redux'
import AsyncStore from "../../utilities/AsyncStore";

//https://medium.com/allenhwkim/dom-changed-event-using-mutationobserver-a2b2834dded6
export default function Qualtrics({navigation, uri, accountForm}){
    const [rid, setRid] = useState("")
    const dispatch = useDispatch()
    const jsCode = `const observer = new MutationObserver( list => {
      const evt = new CustomEvent('dom-changed', {detail: list});
      document.body.dispatchEvent(evt)
    });
    observer.observe(document.body, {attributes: true, childList: true, subtree: true});
    document.body.addEventListener('dom-changed', e => {
      let endofsurvey = document.querySelector('.EndOfSurvey')
      if(endofsurvey!=null){window.ReactNativeWebView.postMessage(endofsurvey.outerHTML)}
  });`
  let test = function(bool) {
    if(bool){
      return (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={()=>{
              if(rid!=""){
                if(accountForm) {
                  AsyncStore.createAccount(rid.slice(103,120))
                  navigation.navigate("NewGame")
                }
                else navigation.navigate("Home")
              }
            }}
            style={[styles.type1button, { width: "50%", alignItems: "center", marginBottom: "20%" }]}
          >
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else{
      return <View></View>
    }
  }
  let webref
  return (
    <View style={{ backgroundColor: "white", height: "100%", width: "100%", justifyContent: "center", flex: 1 }}>
      <WebView
        source = {{uri:uri}}
        style={{ marginTop: "15%", marginHorizontal:"5%" }}
        ref={(r) => webref = r}
        injectedJavaScript={jsCode}
        onMessage={(data) => {
          if(data.nativeEvent.data!=null){
            if(rid==""){
              setRid(data.nativeEvent.data)
              dispatch({type:'NEW_RID', rid})
            }
          }
        }}
            />
      {test(rid!="")}
        </View>
    )
}