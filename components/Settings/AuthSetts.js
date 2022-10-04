import { useSelector, useDispatch } from 'react-redux'
import {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native'
import ForwardButton from '../utilities/ForwardButton'
import BackwardButton from '../utilities/BackwardButton'
import SHA256 from '../../utilities/SHA256'


export default function AuthSetts({ navigation, close }) {
    const [pas, setPas] = useState("") 
    return(
        <View style ={{alignItems:'center', justifyContent:'center', flex:1}}>
            <Text style={{color:"white", fontSize:20, fontWeight:"bold", padding:10}}>input password</Text>
            <TextInput
                style={{
                    height: "20%",
                    minWidth:"60%",
                    maxWidth:"100%",
                    width: "100%",
                    backgroundColor:"white",
                    borderWidth: 1,
                    marginBottom:10
                }}
                //value = {"*".repeat(pas.length)}
                value = {pas}
                onChangeText={(out)=>setPas(out)}
            />
            
            <ForwardButton
                onPress={()=>{
                    if(SHA256(pas.toLowerCase())==""){ //removed hash used for security reasons
                        close()
                        navigation.navigate('Setts')
                    }
                    else{
                        Alert.alert("Incorrect Password")
                    }
                }}
                buttonText={"Sumbit"}
            />
            <BackwardButton
                onPress={()=>close()}
                buttonText={"close"}
            />
        </View>
    )
}