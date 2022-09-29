import React from 'react'
import {View, Text, Image} from 'react-native'
import Player from './Player'
import { getRandomInt } from '../utilities/getRandomInt'
import occupationNames_file from '../utilities/occupationNames_file'
import occupationicons_file from '../utilities/occupationicons_file'

const occupations = occupationicons_file
const occupationNames = occupationNames_file
const colors = [ "#a9d3fc", "#ff99b1", "#c688fc", "#fcefa4", "#b6fca9"]
const friendshipColors = ["red", "orange", "#99ff99", "green"]

export default class Players{
    constructor(){
        this.players = []
    }
    
    initializePlayers(numPlayers, occupationID, occupationName, color, money, playerOne="Player 1", squares){
        if(this.players.length!=0){
            this.players = []
        }
        for(let i = 0; i<numPlayers; i++){
            let playerName = "Player " + String(i+1)
            if(i==0){
                this.players.push(
                    new Player(15,0,playerOne, occupationID, occupationName, color, 0, money, squares[i][0], squares[i][1])
                    )
            }
            else{
                //bug when change occupations[i%4] to occupations[getRandomInt(0,26)] - need to add them to database
                this.players.push(
                    new Player(-15,0,playerName, occupations[i%4], occupationNames[i%4], colors[getRandomInt(0,4)], i, money, squares[i][0], squares[i][1]) 
                )
            } 
        }
        return this.players
    }
    selectRandomPlayer(numPlayers, forbiddenPlayer){
        if(forbiddenPlayer==="undefined" || numPlayers === "undefined") {
            console.warn('issue in selectRandomPlayer method - Classes/Players.js selectRandomPlayer method')
            return
        }
        let ind = this.players.indexOf(forbiddenPlayer)
        if(ind===-1){
            console.warn('forbiddenPlayer variable wasnt found - Classes/Players.js selectRandomPlayer method')
            return
        } 
        
        //this presereves the probability any player is chosen while not allowing for a particular player to be chosen
        let rand = getRandomInt(0,numPlayers-1)
        if(rand>=ind) rand+=1
        if(rand>=numPlayers) console.log(`rand ${rand} >= numPlayers ${numPlayers}`)
        return(this.players[rand])
    }
    createPlayers(squares, xaxis, yaxis) {
        return (
            this.players.map((player, index) => {
                let x = player.positionPlayer(squares[0][0], squares[player.id][0], player.relativex)
                let y = player.positionPlayer(squares[0][1], squares[player.id][1], player.relativey)
                return (
                    <View key={index}>
                        {player.createPlayer(x,player.xmod, y,player.ymod, xaxis, yaxis, player.color, player.id!=0)}
                    </View>
                )
            }))
        
    }
    createPlayersMiniMap(squares, xaxis, yaxis) {
        return (
            this.players.map((player, index) => {
                let x = squares[player.id][0]
                let y = squares[player.id][1]
                return (
                    <View key={index}>
                        {player.createPlayer(x, 0, y,0, xaxis, yaxis, friendshipColors[player.friends[0]], false)}
                    </View>
                )
            }
            ))
        
    }
}