import {React, Component} from "react"
import {Text, View, Alert, TouchableOpacity, Image, ImageBackground, StyleSheet} from "react-native"
import InfoModal from "../components/utilities/InfoModal"
import settingsIcon from "../assets/settingsIcon.png"
import methodIcon from "../assets/methodIcon.png"
import tutorialIcon from "../assets/tutorialIcon.png"
import HomeMenuButtons from "../components/Home/HomeMenuButtons"
import ForwardButton from "../components/utilities/ForwardButton"
import HomeImage from "../assets/HomeImage.png"
import styles from "../utilities/styles"
import AsyncStore from "../utilities/AsyncStore"

/*
This is the home page. 
The player can choose to:
- start a new game- go through the tutorial
- go to the settings page

To start a new game the player must sign the informed consent.
To go to the settings page, the player must be authenticated. 
We don't want experiment subjects messing around with our settings: that's for the researchers to do.
*/

export default class Home extends Component {
    constructor(props) {
        super(props)
    }
   
    render() {
        return (
            <View style={styles.appBackground}>
                <View style={{alignItems:'center', justifyContent:'center', marginTop:"30%", flex:1}}>
                    <ImageBackground 
                    source={HomeImage} 
                    style={{ flex:1,height:"80%", width:"80%", justifyContent:"center",marginLeft:"20%"}}>
                    <View
                        style={{width:"80%"}}
                    >
                        <ForwardButton
                            onPress = {()=>{
                                AsyncStore.load("rid").then(res =>{
                                    if(res==null){ //check if account exists
                                        this.props.navigation.navigate("QualtricsScreen") //if it doesnt, go through qualtrics flow which creates and saves info
                                    }else{
                                        //dipatch data to redux
                                        this.props.navigation.navigate("NewGame")
                                    }
                                }
                                )                       
                                
                            }}
                            buttonText={"Play Hoosville"}
                            fontSize={25}
                        />
                    </View>
                    </ImageBackground>
                    
                </View>


                <View style={{ flexDirection: 'row', justifyContent: "center", flex: 0 }}>
                    <View style={{ flex: 1 }}>
                        <HomeMenuButtons
                            onPress={() => this.props.navigation.navigate('Tutorial')
                            }
                            icon={tutorialIcon}
                            buttonText={"Tutorial"}
                        />
                    </View>
                    
                    <View style={{flex:1}}>
                        <HomeMenuButtons
                            onPress={() => this.props.navigation.navigate("Account")}
                            icon={methodIcon}
                            buttonText={"Account"}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <HomeMenuButtons
                            onPress={() => {
                                AsyncStore.load("seen_debrief").then(res =>{
                                    if(res!=2){
                                        Alert.alert("Please, finish the experiment before accessing the Debriefing Form")
                                    }
                                    else{
                                        this.props.navigation.navigate("DebriefScreen")
                                    }
                                })
                            }}
                            buttonText={"Debriefing"}
                            icon={settingsIcon}
                        />
                    </View>

                    </View>
            </View>

        )
    }
}

