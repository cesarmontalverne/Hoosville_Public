import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { useFonts } from 'expo-font';
import styles from "../../utilities/styles"
export default function ForwardButton({onPress, buttonText, fontSize=15}){

    return(
        <View>
           <TouchableOpacity
                style={[styles.type1button]}
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