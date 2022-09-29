import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import {WebView} from 'react-native-webview'
import {useState} from 'react'
import styles from "../../utilities/styles";
import {connect, useDispatch} from 'react-redux'
//https://medium.com/allenhwkim/dom-changed-event-using-mutationobserver-a2b2834dded6
export default function Qualtrics({navigation}){
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
                dispatch({type:"NEW_RID", rid:rid.slice(103,120)})
                navigation.navigate("NewGame")
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
        //source={{ uri: "https://virginia.az1.qualtrics.com/jfe/form/SV_3lWXHfj7sSpmGEK" }}
        source = {{uri:"https://virginia.az1.qualtrics.com/jfe/form/SV_b8cxNgVQ6Dx6GB8"}}
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

/**
 import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import {WebView} from 'react-native-webview'
import {useState} from 'react'
import styles from "../../utilities/styles";
import {connect} from 'react'
//https://medium.com/allenhwkim/dom-changed-event-using-mutationobserver-a2b2834dded6
function Qualtrics({navigation}){
    const [rid, setRid] = useState("")
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
                navigation.navigate("NewGame",{rid:rid})}
              }
            }
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
        source={{ uri: "https://virginia.az1.qualtrics.com/jfe/form/SV_3lWXHfj7sSpmGEK" }}
        style={{ margin: "10%" }}
        ref={(r) => webref = r}
        injectedJavaScript={jsCode}
        onMessage={(data) => {
          if(data.nativeEvent.data!=null){
            setRid(data.nativeEvent.data)
          }
        }}
            />
      {test(rid!="")}
        </View>
    )
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch){
  return{
      restart:()=> dispatch({type:'RESTART', newGameOn:true}),
      newMiniMap:()=>dispatch({type:"NEW_MINIMAP", newMiniMap:false}),
      newGameOn:()=>dispatch({type:'NEW_GAMEON', newGameOn:true}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Qualtrics);

 */