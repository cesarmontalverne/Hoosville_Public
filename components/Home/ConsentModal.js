import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import ForwardButton from "../utilities/ForwardButton";
import BackwardButton from "../utilities/BackwardButton";
import { ScrollView } from "react-native-gesture-handler";
export default function ConsentModal({acceptOnPress, rejectOnPress}){
    return(
        <View>
            <ScrollView>
            <Text style={{color:"white", fontWeight:"bold", textAlign:"center", fontSize:20, marginBottom:5}}>Lorem Ipsum</Text>
            <Text style={{color:"white", textAlign:"left", fontSize:17}}>Etiam molestie velit sed ipsum dignissim commodo. Morbi a orci mi. Etiam porttitor vitae odio sed tempor. Vivamus nec orci ipsum. Etiam turpis augue, pretium in nisl a, lobortis volutpat libero. Etiam fermentum ligula eget justo pretium euismod. Fusce et auctor diam, id dignissim arcu. Mauris egestas maximus ex. Integer nunc ipsum, aliquam nec turpis a, condimentum posuere augue. Curabitur non sagittis ex, quis semper nisi. Pellentesque vel eros ullamcorper, vehicula est id, maximus enim. Sed in arcu leo. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi lectus leo, fringilla vitae sem vel, tempor congue purus. Vestibulum quis erat in orci pretium aliquam. Maecenas interdum neque in vestibulum pulvinar.</Text>
            </ScrollView>
            <ForwardButton
                onPress={acceptOnPress}
                buttonText = {"Accept & Continue"}
            />
            <BackwardButton
                onPress={rejectOnPress}
                buttonText = {"Reject & Close"}
            />
        </View>
    )
}