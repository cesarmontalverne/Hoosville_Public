import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
export default function BackwardButton({onPress, buttonText, fontSize=15}){

    return(
        <View>
           <TouchableOpacity
                style={{marginTop:15, borderRadius:20}}
                onPress={onPress}
            >
                <Text
                    style={{color:"white", textAlign:"center", fontSize:fontSize}}
                >
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}