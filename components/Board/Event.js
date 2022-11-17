import { StyleSheet, Text, View, TouchableOpacity,ScrollView } from "react-native";
import React, {useEffect, useState} from 'react'
import db from './../../apis/firebase';
import { get, child } from 'firebase/database';
import { useSelector } from "react-redux";
import { getRandomInt } from "../../utilities/getRandomInt";
import { randn_bm } from "../../utilities/randn_bm";
import ForwardButton from "../utilities/ForwardButton";
import selectEventText from "../../utilities/selectEventText";

const friendLevels = [" a stranger to ", " an acquaintance of ", " friends with ", " best friends with "]

export default function Event({ handleEventClose, players }) {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [randomPlayer, setRandomPlayer] = useState("")
    const numPlayers = useSelector(state=>state.numPlayers)
    const events = useSelector(state=>state.events)
    //settings controllable
    const price = useSelector(state=>state.price)
    const priceSd = useSelector(state=>state.priceSd)
    const probUnfriend = useSelector(state=>state.probUnfriend)
    const acquaintanceDiscount = useSelector(state=>state.acquaintanceDiscount)
    const friendDiscount = useSelector(state=>state.friendDiscount)
    const bestfriendDiscount = useSelector(state=>state.bestfriendDiscount)
    const finalDiscount = [0,acquaintanceDiscount,friendDiscount,bestfriendDiscount]

    const [event, setEvent] = useState("")
    if(event==""){
        setRandomPlayer(players.players[getRandomInt(1, numPlayers)])
        setEvent(eventSelector(probUnfriend))
    }
    function getEvent() {
        if(randomPlayer!=""){
            let eventText = selectEventText(randomPlayer.occupationName, events)
            setTitle(eventText[0])
            setText(eventText[1])
        }else{
            console.warn("problem with random player selection")
        }

    }
    function moneyEvent(title, text, price, priceSd, discount){
        let txt = "Because you are" + friendLevels[randomPlayer.friends[0]] + "the "+randomPlayer.occupationName+" you got a discount of "+discount+"% \n"
        let finalPrice = Math.round(randn_bm(price,priceSd)*(100-discount))/100
        console.log(finalPrice)
        return(
            <View>
                {choice(title, text+"\n\n"+txt, "Pay U$"+String(finalPrice), ()=>{
                    players.players[0].money -= finalPrice
                })}
            </View>
        )
    }
    function UnfriendEvent(){
        let wasFriend = randomPlayer.friends[0]!=0
        let friendComment = wasFriend?"He was your friend, but now you're too far away to bond.":"You weren't friends, so it makes no difference to you."
        let txt = randomPlayer.name + " moved out. "+ friendComment
        return(
            <View>
                {choice("Someone Moved Out", txt, wasFriend?"Say Goodbye":"Ok.", ()=>{
                    randomPlayer.friendship = 0
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

    function eventSelector(prob){
        let randomizer = getRandomInt(0,100) //0 to 100
        if(randomizer<prob) return 2
        else if(randomizer<=100) return 1
        else return "error"
    }
    useEffect(() => {
        getEvent()
    }, [])

    if(event == 1) {
        return (
            <ScrollView>
                {moneyEvent(title, text, price, priceSd, finalDiscount[randomPlayer.friends[0]])}
            </ScrollView>
        )
    }else if (event == 2) {
        return (
            <View>
                {UnfriendEvent()}
            </View>
        )
    }else{return<View></View>}
}