import {View, StyleSheet} from 'react-native'
import {useState} from 'react'
export default function Bar({color = "blue", percent = 50, height = 20, width = 100, borderWidth = 3}){
    var shaded = (Math.min(percent,100)/100)*width
    return(
        <View style = {[styles.outside, {height:height, width:width, backgroundColor:"white", borderColor: color, borderWidth:borderWidth}]}>
            <View style = {{height:height, width:shaded, backgroundColor:color, borderRadius: 8}}/>
        </View>
    )
}
const styles = StyleSheet.create({
    outside:{
        justifyContent:"center",
        borderRadius: 8,
    }
})