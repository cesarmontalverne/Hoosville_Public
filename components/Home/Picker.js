import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import check_mark from "../../assets/check_mark.png"

export default function Picker({statevar, statevarSetter, toRenderList, type}){
    display = (bool, src, size) => {
        if(bool){
            return(toRender(src, size))
        }
        else{
            return(<View></View>)
        }
    }
    toRender = (src,size) =>{
        switch(type){
            case "IMAGE":
                return (
                    <Image source = {src} style = {{width:size, height:size}}/>
                )
            case "COLOR":
                return  <View style = {{backgroundColor:src, width: size, height:size}}/>

        }
    }
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <TouchableOpacity style={[styles.analog, {transform: [{rotate: '270deg'}]}]}
                onPress={()=>{
                    statevarSetter(Math.max(statevar-1, 0))
                }}
            />
                <View 
                style={{ backgroundColor:"white",flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding:15}}>
                    {display(statevar>0,toRenderList[statevar-1],30)}
                    {/**
                    <View 
                    style={{borderColor:"green", borderRadius:100, borderWidth:5, 
                    width:150, height:150, justifyContent: 'center',
                    alignItems: 'center', marginLeft:10, marginRight:10}}>
                        {display(true,toRenderList[statevar],100)}
                    </View>
                     */}
                    {display(true,toRenderList[statevar],100)}
                    {display(statevar<toRenderList.length-1,toRenderList[statevar+1],30)}
                </View>
            <TouchableOpacity style={[styles.analog, {transform: [{rotate: '90deg'}]}]}
            onPress={()=>{
                statevarSetter(Math.min(statevar+1, toRenderList.length-1))
            }}
            />
            
        </View>
    )
}


const styles = StyleSheet.create({
   analog:{
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: 27,
                borderRightWidth: 27,
                borderBottomWidth: 20,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: "white",
                margin: 0,
                marginLeft: -6,
                borderWidth: 0,
                borderColor: "black"
            }
});