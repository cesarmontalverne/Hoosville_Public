import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../../utilities/styles'
export default function MovePlayer({players}){
    const squares = useSelector(state=>state.squares)
    const gameOn = useSelector(state=>state.gameOn)
    const energy = useSelector(state=>state.energy)
    const numPlayers = useSelector(state=>state.numPlayers)
    const energyCostMoving = useSelector(state=>state.energyCostMoving)
    const dispatch = useDispatch()
   function analog(bool){
    if(bool=="vertical"){
        return {height:30, width:6}
    }
    if(bool=="horizontal"){
        return {height:6, width:40}
    }
   }
    function MoveDirection(stepsx, stepsy, name, energyInc, energy){
        return (
            <TouchableOpacity
                style={{backgroundColor:"white", padding: 15,shadowColor: 'black',shadowOffset: {width: 10, height: 0},shadowOpacity:0.6 }}
                onPress={() => {
                    let leftBound = (stepsx < 0 && squares[0][0] == 0)
                    let rightBound = (stepsx > 0 && squares[0][0] == 9)
                    let lowerBound = (stepsy < 0 && squares[0][1] == 0)
                    let upperBound = (stepsy > 0 && squares[0][1] == 9)
                    if (!leftBound && !rightBound && !lowerBound && !upperBound && energy>1) { //avoid out of bounds coords
                        let newSquares = squares
                        newSquares[0][0] += stepsx
                        newSquares[0][1] += stepsy  
                        if(stepsx!=0){
                            if(3<=squares[0][0] && squares[0][0]<=7){
                                dispatch({type:'NEW_BOARD'})
                            }
                            for(let i = 1; i<squares.length; i+=1){//note i starts at 1, skipping 0 (who's player1)
                                players.players[i].relativex -= stepsx
                            }
                            
                        }else if(stepsy!=0){
                            if(3<=squares[0][1] && squares[0][1]<=7){
                                dispatch({type:'NEW_BOARD'})
                            }
                            for(let i = 1; i<squares.length; i+=1){
                                players.players[i].relativey -= stepsy
                            }
                            
                        }
                        dispatch({type:'NEW_SQUARES', newSquares})
                        dispatch({type:'INC_ENERGY', energyInc})
                        if(players.players.length!=numPlayers){
                            console.warn("there's something wrong with players constructed")
                        }
                    }
                }}
            >
                <View style={[analog(name)]}/>
            </TouchableOpacity>
        )
    }
   
    if (gameOn) {
        return (
            <View style={{marginTop:20}}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    {MoveDirection(0, 1, "vertical", -energyCostMoving, energy)}
                </View>
                <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
                    {MoveDirection(-1, 0, "horizontal", -energyCostMoving, energy)}
                    {/*miniMapOpener()*/}
                    {MoveDirection(1, 0, "horizontal", -energyCostMoving, energy)}
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    {MoveDirection(0, -1, "vertical", -energyCostMoving, energy)}
                </View>
            </View>
        )
    }else{
        return <View></View>
    }
}