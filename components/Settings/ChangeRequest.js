import { useSelector, useDispatch } from 'react-redux'
import {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native'
import ForwardButton from '../utilities/ForwardButton'

export default function ChangeRequest({title, dispatchJson }) {
    const [txtIn, setTxtIn] = useState("")
    const dispatch = useDispatch()
    return (
        <View style={{ flexDirection: 'row', padding: 10}}>
            <View style={{ padding: 15, width:100 }}>
                <Text style={{color:"white"}}>{title}</Text>
            </View>
            <TextInput
                style={{
                    height: 40,
                    width: 80,
                    borderWidth: 1,
                    backgroundColor:"white",
                    marginTop:5
                }}
                value = {String(txtIn)}
                onChangeText={(out)=>setTxtIn(Number(out))}
            />
            <View style={{ padding: 5, marginLeft:20 }}>
                <ForwardButton
                    onPress={() => {
                        if(typeof txtIn == 'number'){
                            if(txtIn>0){
                                dispatchJson.newVar = txtIn
                                dispatch(dispatchJson)
                                setTxtIn("")
                            }else{Alert.alert('please input a positive number')}
                        }else{Alert.alert('please input a number')}
                    }}
                    buttonText={"Submit"}
                />
            </View>
        </View>
    )
}