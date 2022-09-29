import {React, Component} from "react"
import {Text, View, Alert, TouchableOpacity, Image, ImageBackground, StyleSheet} from "react-native"
import InfoModal from "../components/utilities/InfoModal"
import settingsIcon from "../assets/settingsIcon.png"
import methodIcon from "../assets/methodIcon.png"
import tutorialIcon from "../assets/tutorialIcon.png"
import AuthSetts from "../components/Settings/AuthSetts"
import ConsentModal from "../components/Home/ConsentModal"
import HomeMenuButtons from "../components/Home/HomeMenuButtons"
import ForwardButton from "../components/utilities/ForwardButton"
import HomeImage from "../assets/HomeImage.png"
import styles from "../utilities/styles"

/*
This is the home page. 
The player can choose to:
- start a new game
- sign the informed consent
- go through the tutorial
- go to the settings page

To start a new game the player must sign the informed consent.
To go to the settings page, the player must be authenticated. 
We don't want experiment subjects messing around with our settings: that's for the researchers to do.
*/

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //consentModal:false, //true if the cosent modal is being displayed
            authSettsModal:false //true if the modal for settings access authentication is being displayed
        }
    }
   
    render() {
        return (
            <View style={styles.appBackground}>
                <View style={{alignItems:'center', justifyContent:'center', marginTop:"30%", flex:1}}>
                    <ImageBackground 
                    source={HomeImage} 
                    style={{ flex:1,height:"120%", width:"80%", justifyContent:"center",marginLeft:"15%"}}>
                    <View
                        style={{width:"80%"}}
                    >
                        <ForwardButton
                            //onPress={() => this.setState({ consentModal: true })}
                            onPress = {()=> this.props.navigation.navigate("QualtricsScreen")}
                            buttonText={"Play Hoosville"}
                            fontSize={25}
                        />
                    </View>
                    </ImageBackground>
                    
                </View>

{/*                 
                <InfoModal
                    infoBool={this.state.consentModal}
                    height = {"50%"}
                    width= {"80%"}
                    showClose={false}
                    toRender={
                    <ConsentModal 
                        acceptOnPress={()=>{
                            this.setState({consentModal:false})
                            this.props.navigation.navigate('NewGame')
                        }}
                        rejectOnPress={()=>this.setState({consentModal:false})}
                        />
                    }
                /> */}
                <InfoModal
                    infoBool={this.state.authSettsModal}
                    infoBoolClose={() => this.setState({ authSettsModal: false })}
                    showClose={false}
                    height = {"25%"}
                    width= {"50%"}
                    toRender={<AuthSetts navigation={this.props.navigation} close = {()=>this.setState({ authSettsModal: false })}/>}
                />
                <View style={{flexDirection: 'row',justifyContent:"center", flex:0}}>
                    <View style={{flex:1}}>
                        <HomeMenuButtons
                            onPress={() => this.setState({ authSettsModal: true })
                        }
                            buttonText={"Settings"}
                            icon={settingsIcon}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <HomeMenuButtons
                            onPress={() => console.log("method")}
                            icon={methodIcon}
                            buttonText={"Method"}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <HomeMenuButtons
                            onPress={() => this.props.navigation.navigate('Tutorial')}
                            icon={tutorialIcon}
                            buttonText={"Tutorial"}
                        />
                    </View>

                    </View>
            </View>

        )
    }
}

