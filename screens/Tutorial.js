import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Image} from 'react-native'
import background from '../assets/spotlights.png'
import homescreen from '../assets/homescreen.png'

export default class Tutorial extends Component{
    constructor(props){
        super(props)
        this.state = {changeSettings:false, curVals:false, editEvents:false}
    }
    render(){
        <View>
            
        </View>
    }
    /*
    render(){
        return(
            <ImageBackground source={background} resizeMode = 'cover' style={styles.background}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.back}>
                        Home
                    </Text>
                </TouchableOpacity>
                <Text style={styles.header} flex>
                    Tutorial
                </Text>
                <View style={styles.rectangleBot}>
                <Text style={{fontWeight:'bold', fontSize: 20, alignSelf: 'center', marginTop: 10}}>
                    Goals
                </Text>
                <Text style={styles.mid}>
                The goal of the game is to end the game with the maximum amount of money possible. 
                If the player runs out of money they lose. 
                Because energy can be recouped, as long as the main player doesn’t reach negative energy, they are still allowed to play. 
                The full game is a timer of 30 minutes (this can be adjusted in the settings).
                </Text>
                <Text style={{fontWeight:'bold', fontSize: 20, alignSelf: 'center', marginTop: 10}}>
                    Home
                </Text>
                <Text style={styles.mid}>
                Players will first be greeted by the home screen with the options: New Game, Tutorial, and Settings.
                If both the Full name and SubId are filled out, the player can press New Game. When New Game is pressed,
                a consent box will pop up.
                </Text>
                </View>
                <Image source={homescreen} style={styles.image}>

                </Image>
            </ImageBackground>
        )
    }
    */
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        justifyContent: 'center'
    },
    back: {
        position: 'absolute',
        alignSelf: 'flex-start',
        fontSize: 20,
        flex: 1,
        top: 50,
        left: 10
    },
    header: {
        fontSize: 40,
        alignSelf: 'center',
        flex: 1,
        top: 50
    },
    rectangleBot: {
        backgroundColor: '#D9D9D9',
        borderRadius: 25,
        position: 'absolute',
        alignSelf: 'center',
        margin: 20,
        top: 80
    },
    mid: {
        flex: 1,
        alignSelf: 'center',
        margin: 20,
        fontSize: 17,
        shadowColor: 'grey'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        maxHeight: 250,
        maxWidth: 125,
        alignSelf: 'center',
        top: -40
    }
 });