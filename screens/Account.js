import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, ImageBackground, Image} from 'react-native'
import sheets from "../apis/sheets.js"
import background from '../assets/spotlights.png'
import homescreen from '../assets/homescreen.png'
import AsyncStore from '../utilities/AsyncStore.js'
import styles from '../utilities/styles.js'
import ForwardButton from "../components/utilities/ForwardButton"
import BackwardButton from "../components/utilities/BackwardButton"

export default class Tutorial extends Component{
    constructor(props){
        super(props)
        this.state = {rid:"none", num_games:"none", rand_control:"none",time_played:"none",seen_debrief:"none"}
    }
    
    componentDidMount(){
        AsyncStore.load("rid").then((rid)=>{
            if(rid!=null) this.setState({rid:rid})
        }).catch((err) => {})
        AsyncStore.load("num_games").then((num_games)=>{
            if(num_games!=null) this.setState({num_games:num_games})
        }).catch((err) => {})
        AsyncStore.load("rand_control").then((rand_control)=>{
            if(rand_control!=null) this.setState({rand_control:rand_control})
        }).catch((err) => {})
        AsyncStore.load("seen_debrief").then((seen_debrief)=>{
            if(seen_debrief!=null) this.setState({seen_debrief:seen_debrief})
        }).catch((err) => {})
        AsyncStore.load("time_played").then((time_played)=>{
            if(time_played!=null) this.setState({time_played:time_played})
        }).catch((err) => {})
    }
    display = (title, variable)=>{
        return(
            <View style={{flexDirection:'row', padding:2}}>
                <Text style={[styles.subtitlesText,{width:150, padding:1}]}>{title}</Text>
                <Text style={{width:150, padding:2, marginLeft:15, color:"white"}}>{variable}</Text>
            </View>
        )
    }
    render() {
        return (<View style={[styles.appBackground,]}>
            <View style={{ flex: 3, padding:20,marginTop:"30%",alignItems: "center", }}>
                {this.display("Response ID", this.state.rid)}
                {this.display("Games Played", this.state.num_games)}
                {this.display("Control Group", this.state.rand_control)}
                {this.display("Seen Debrief Form", this.state.seen_debrief)}
                {this.display("Total Time Played", this.state.time_played=="none"?"none":String(Math.floor(this.state.time_played/60)) + " min "+ String(this.state.time_played%60)+" sec")}


            </View>
            
            <View style={{ flex: 1, padding:20 }}>
                    <ForwardButton
                        onPress={() => { this.props.navigation.navigate('Home') }}
                        buttonText={"Go Home"}
                        fontSize={20}
                    />
                    <BackwardButton
                    onPress={() => {
                        Alert.alert("Delete Account", "- Data of the games you have already played will not be erased \n - If you want to play again, you will be required to answer the questionnaire another time.\n\nAre you sure you want to delete your account?",
                            [{ text: "No" },
                            {
                                text: "Yes",
                                onPress: () => {
                                    AsyncStore.clearAll()
                                    this.setState({rid:"none"})
                                    this.setState({num_games:"none"})
                                    this.setState({rand_control:"none"})
                                    this.setState({time_played:"none"})
                                    this.setState({seen_debrief:"none"})

                                },
                            }
                            ]
                        )
                    }}
                        buttonText={"Delete"}
                    />
            </View>
        </View>
        )
    }
}
