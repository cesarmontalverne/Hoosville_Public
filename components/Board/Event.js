import { StyleSheet, Text, View, TouchableOpacity,ScrollView } from "react-native";
import React, {useEffect, useState} from 'react'
import db from './../../firebase/firebase';
import { get, child } from 'firebase/database';
import { useSelector } from "react-redux";
import { getRandomInt } from "../../utilities/getRandomInt";
import { randn_bm } from "../../utilities/randn_bm";
import ForwardButton from "../utilities/ForwardButton";

const friendLevels = [" a stranger to ", " an acquaintance of ", " friends with ", " best friends with "]

export default function Event({ handleEventClose, players }) {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [choiceText, setChoiceText] = useState("")
    const [randomPlayer, setRandomPlayer] = useState("")
    const numPlayers = useSelector(state=>state.numPlayers)
    //settings controllable
    const probZero = useSelector(state=>state.probZero)
    const priceOne = useSelector(state=>state.priceOne)
    const priceOneSd = useSelector(state=>state.priceOneSd)
    const priceTwo = useSelector(state=>state.priceTwo)
    const priceTwoSd = useSelector(state=>state.priceTwoSd)
    const probOne = useSelector(state=>state.probOne)
    const probTwo = useSelector(state=>state.probTwo)
    const acquaintanceDiscount = useSelector(state=>state.acquaintanceDiscount)
    const friendDiscount = useSelector(state=>state.friendDiscount)
    const bestfriendDiscount = useSelector(state=>state.bestfriendDiscount)
    const finalDiscount = [0,acquaintanceDiscount,friendDiscount,bestfriendDiscount]

    const [event, setEvent] = useState("")
    if(event==""){
        setRandomPlayer(players.players[getRandomInt(1, numPlayers)])
        setEvent(eventSelector(probZero,probOne, probTwo))
    }
    
    function getEvent(type) {
        if(randomPlayer!=""){
            get(child(db, `events/`+randomPlayer.occupationName+`/`+type+`/`)).then(numevents=>{
                get(child(db, `events/`+randomPlayer.occupationName+`/` + type + `/`+ getRandomInt(0, Number(numevents.val().numevents)) +`/`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setTitle(snapshot.val().title)
                        setText(snapshot.val().text)
                        setChoiceText(snapshot.val().choice)
                    } else {
                        console.warn("No data available");
                    }
                }).catch((error) => {
                    //probably there is some occupation you added here but not in the database
                    console.error(error);
                });

            })
        }else{
            console.warn("problem with random player selection")
        }
    }
    function moneyEvent(title, text, choiceText, price, priceSd, discount){
        let txt = "because you are" + friendLevels[randomPlayer.friends[0]] + randomPlayer.name +" who is a "+randomPlayer.occupationName+" you got a discount of "+discount+"% \n"
        return(
            <View>
                {choice(title, txt+text, choiceText, ()=>{
                    players.players[0].money -= randn_bm(price,priceSd)*(100-discount)/100
                })}
            </View>
        )
    }
    function UnfriendEvent(){
        return(
            <View>
                {choice("Unfriend Event", "One player moved out. If he was your friend, unfortunately you're too far away to bond", ":(", ()=>{
                    let arrLen = players.players.length
                    players.players[getRandomInt(1, arrLen)].friendship = 0 
                })}
            </View>
        )
    }
    function choice(title, text, choice, callback) {
        return (
            <View style = {{justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:15, color:"white",fontWeight:'bold', marginBottom:20}}>{title}</Text>
                <Text style={{width:250, justifyContent:'center', color:"white",  alignItems:'center'}}>{text}</Text>
                <View style={{marginTop:30}}>
                    <ForwardButton
                        onPress={()=> {
                            callback()
                            handleEventClose()
                        }}
                        buttonText={choice}
                    />
                </View>
            </View>
        )
    }

    function eventSelector(type0Prob, type1Prob, type2Prob){
        let randomizer = getRandomInt(0,100) //0 to 100
        
        if(randomizer<type0Prob) return 0
        else if(randomizer<type1Prob+type0Prob) return 1
        else if(randomizer<=type0Prob+type1Prob+type2Prob) return 2
        else return "error"
    }
    useEffect(() => {
        if(event!=0) getEvent("type"+String(event))
    }, [event])
    if (event == 0) {
        return (
            <View>
                {UnfriendEvent()}
            </View>
        )
    } else if (event == 1) {
        return (
            <ScrollView>
                {moneyEvent(title, text, choiceText, priceOne, priceOneSd, finalDiscount[randomPlayer.friends[0]])}
            </ScrollView>
        )
    }else if(event==2){
        return (
            <ScrollView>
                {moneyEvent(title, text, choiceText, priceTwo, priceTwoSd, finalDiscount[randomPlayer.friends[0]])}
            </ScrollView>
        )
    }else{return<View></View>}
}