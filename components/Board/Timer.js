import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import Bar from '../utilities/Bar'
import Event from './Event'
import InfoModal from '../utilities/InfoModal'
import { useSelector, useDispatch } from 'react-redux'
import { randn_bm } from '../../utilities/randn_bm'
import ForwardButton from '../utilities/ForwardButton'
import settingsIcon from '../../assets/settingsIcon.png'
import AsyncStore from '../../utilities/AsyncStore'

const timesSet = new Set()
export default function Timer({players, id, navigation}){
    const time = useSelector(state=>state.time)
    const gameOn = useSelector(state=>state.gameOn)
    const squares = useSelector(state=>state.squares)
    const initialTime = useSelector(state=>state.initialTime)
    const energy = useSelector(state=>state.energy)
    const maxMoney = useSelector(state=>state.maxMoney)
    const lumpSum = useSelector(state=>state.lumpSum)
    //settings controllable
    const friendMeterSpeed = useSelector(state=>state.friendMeterSpeed)
    const friendMeterDecay = useSelector(state=>state.friendMeterDecay)
    const energyFriendDrain = useSelector(state=>state.energyFriendDrain)
    const energyRecoup  = useSelector(state=>state.energyRecoup)
    const payments = useSelector(state=>state.payments)
    const averageTimeEvent = useSelector(state=>state.averageTimeEvent)
    const standardDevTimeEvent = useSelector(state=>state.standardDevTimeEvent)
    const dispatch = useDispatch()
    const [eventRandVar, setEventRandVar] = useState(initialTime-Math.abs(randn_bm(averageTimeEvent, standardDevTimeEvent)))
    const [endGame, setEndGame] = useState(false)
    const [eventBool, setEventBool] = useState(false)
    function checkSquares(squares, numPlayers) {
        let findInd = (arr, targetArr) => {
            for (let i = 1; i < numPlayers; i += 1) {
                if (arr[i][0] == targetArr[0] && arr[i][1] == targetArr[1]) return i
            }
            return -1
        }
        return findInd(squares, squares[0])
    }
    function friendDecay(playerList, rate){
        let friendLevel = (level) =>{
            if(level>=90) return 3
            else if(level>=60) return 2
            else if(level>=30) return 1
            else return 0
        }
        for (let i = 1; i < playerList.length; i += 1) {
            playerList[i].friendship = Math.max(playerList[i].friendship-rate, 0)
            playerList[0].friends[i] = friendLevel(playerList[i].friendship)
            //making friends friendship level increase because it's more easily searchable later
            playerList[i].friends[0] = friendLevel(playerList[i].friendship)
        }
    }
    
    function handleEventClose(){
        setEventBool(false)
        dispatch({type:'NEW_GAMEON', newGameOn:true})
        dispatch({type:'NEW_TIME', newTime:time-1})
    }
    useEffect(() => {
        let otherPlayer = checkSquares(squares, players.players.length)
        //if (time > 0 && gameOn) {
        if (gameOn) {
            setTimeout(() => {
                if (time > -2 && players.players[0].money > 0) {
                    dispatch({ type: 'NEW_TIME', newTime: time - 0.1 })
                    dispatch({ type: 'INC_ENERGY', energyInc: energyRecoup })
                    players.players[0].money = Math.min(players.players[0].money + payments, maxMoney)
                    friendDecay(players.players, friendMeterDecay)
                    if (!timesSet.has(Math.round(initialTime - time))){
                        timesSet.add(Math.round(initialTime - time))
                        dispatch({ type: 'NEW_SAVE', player: players.players[0], time: Math.round(initialTime - time),squares:squares[0] })
                    } 
                }
                if (time <= 0 || players.players[0].money <= 0) {
                    setEndGame(true)
                    dispatch({ type: 'NEW_GAMEON', newGameOn: false })
                }
                else if (time < eventRandVar && time > 2) {
                    setEventBool(true)
                    setEventRandVar(time - Math.abs(randn_bm(averageTimeEvent, standardDevTimeEvent)))
                    dispatch({ type: 'NEW_GAMEON', newGameOn: false })
                }
                else if (-1 != otherPlayer) {
                    players.players[otherPlayer].friendship = Math.min(players.players[otherPlayer].friendship + friendMeterSpeed, 100) //make sure to counteract  friendDecay function
                    dispatch({ type: 'INC_ENERGY', energyInc: -energyFriendDrain })
                    if (energy <= 0) {
                        setEndGame(true)
                        dispatch({ type: 'NEW_GAMEON', newGameOn: false })
                        dispatch({ type: "RESET" })
                    }
                }
            }, 100);
        }
    }, [time, gameOn])
    function formatTime(num) {
        toret = num.toString()
        if (toret.length < 2) return "0" + toret
        else return toret
    }
    return (
        <View>
            <InfoModal
                infoBool={eventBool}
                height={300}
                width={300}
                toRender={<Event handleEventClose={handleEventClose} players={players} />}
            />
            <InfoModal
                infoBool={endGame}
                showClose={false}
                toRender={
                    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                        <ForwardButton
                            onPress={() =>
                                {
                                AsyncStore.incrementGames()
                                AsyncStore.load("time_played").then(curTotalTime=>{
                                    let newTotalTime = String(parseInt(curTotalTime)+parseInt(initialTime-time))
                                    AsyncStore.save("time_played", newTotalTime)
                                    dispatch({ type: 'NEW_TOTALTIME', newTotalTimePlayed:newTotalTime})
                                    return newTotalTime
                                }).then(newTotalTime=>{
                                    return AsyncStore.load('seen_debrief').then(seenDebrief=>{
                                        let supposed_to_see_debrief = parseInt(newTotalTime)>5 && seenDebrief == "0"
                                        if(supposed_to_see_debrief){
                                            dispatch({ type: 'NEW_SEENDEBRIEF', newSeenDebrief:"1"})
                                            AsyncStore.save('seen_debrief',"2")
                                        }else{
                                            dispatch({ type: 'NEW_SEENDEBRIEF', newSeenDebrief:seenDebrief})
                                        }
                                        return supposed_to_see_debrief
                                    })
                                }).then((supposed_to_see_debrief)=>{
                                    dispatch({ type: 'WRITE'})
                                    timesSet.clear()
                                    setEndGame(false)
                                    dispatch({ type: 'RESTART'})
                                    return supposed_to_see_debrief
                                }).then(supposed_to_see_debrief=>{
                                    supposed_to_see_debrief?navigation.navigate('DebriefScreen'):navigation.navigate('Home')
                                })
                            }}
                            buttonText={"End Game"}
                        />
                    </View>
                }
            />
            <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                    dispatch({ type: "NEW_GAMEON", newGameOn: false })
                    dispatch({ type: "NEW_MINIMAP", newMiniMap: true })
                }}
            >
                <Image source={settingsIcon} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10, marginBottom: 10 }}>
                <Text>{formatTime(Math.floor(time / 60))}:{formatTime(Math.round(formatTime(time) % 60))}</Text>
                <Bar percent={(time / initialTime) * 100} width={300} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ padding: 5 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text>{Math.round(energy)}</Text>
                        </View>
                        <Bar percent={energy} width={140} color={"gold"} />
                    </View>
                    <View style={{ padding: 5 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text>{Math.round(players.players[0].money)}</Text>
                        </View>
                        <Bar percent={players.players[0].money / maxMoney * 100} width={140} color={"green"} />
                    </View>
                </View>
            </View>
        </View>
    )
}
