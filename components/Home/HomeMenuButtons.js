import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
export default function HomeMenuButtons({ icon, buttonText, onPress }) {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={{backgroundColor:"#1D73A4",shadowColor: 'black',shadowOffset: {width: 0, height: -4},shadowOpacity:1, alignItems:"center", padding:20 }}
            >
                <Image source={icon} style={{height:40,width:40}}/>
                <Text
                    style={{color:"white"}}
                >
                    {buttonText}
                </Text>

            </TouchableOpacity>
        </View>
    )
}