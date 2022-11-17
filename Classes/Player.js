import React from "react"
import {View, StyleSheet, Image} from "react-native"
import Bar from "../components/utilities/Bar"


export default class Player{
    constructor(xmod,ymod, name, occupationIcon, occupationName, color, id, money = 1000, relativex = 0, relativey = 0) {
        this.id = id 
        this.name = name
        this.board = 0;
        this.xmod = xmod
        this.ymod = ymod
        this.x = 30 + xmod
        this.y = 240 + ymod
        this.relativex = relativex
        this.relativey = relativey
        this.friends = [0]
        this.friendship = 0
        this.money = money
        this.occupationIcon = occupationIcon
        this.occupationName = occupationName
        this.color = color
    }
    progress(percent){
        let color = "red"
        if(percent>=90) color = "green"
        else if(percent>=60) color = "#99ff99"
        else if(percent>=30) color = "orange"
        return <View>
            <Bar height={10} width={25} percent={percent} color = {color} borderWidth={1}/>
        </View>
    }
    positionPlayer(squarePlayerOne, squarePlayerCreated, relative){
        if(0<=squarePlayerOne && squarePlayerOne<=2){
            if(Math.abs(squarePlayerCreated - squarePlayerOne)<=4) return squarePlayerCreated
            else return -1
        }else if(3<=squarePlayerOne && squarePlayerOne<=6){
            if(Math.abs(relative)<=2) return relative + 2
            else return -1
        }else if(7<=squarePlayerOne && squarePlayerOne<=9){
            if(Math.abs(squarePlayerCreated - squarePlayerOne)<=4) return squarePlayerCreated-5
            else return -1
        }else console.warn("error in positionPlayer, player class")
    }
    createPlayer(x, xmod, y, ymod, xaxis, yaxis, color, progress){
        //takes in an integer, figures out where to position a piece(with the position method) and renders it there
        let toretSquarex = x
        let toretSquarey = y
        let bar = (bool) => bool? this.progress(this.friendship): <View></View>
        if((toretSquarey>=0 && toretSquarex>=0)&& !isNaN(xaxis[toretSquarex]) && !isNaN(yaxis[toretSquarey])) {
            return (
                <View style={{position: 'absolute', left: xaxis[toretSquarex] + xmod, top: yaxis[toretSquarey] + ymod, zIndex: 1 }}>
                    {bar(progress)}
                    <Image
                        source={this.occupationIcon}
                        style={[styles.item, { backgroundColor: color}]}
                    />
                </View>
            )
        }else return <View></View>
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        height: 300,
        width: 300,
        borderRadius: 16,
        padding: 16,
        borderWidth: 8,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    item: {
        borderWidth: 3,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 25,
        width: 25,
        borderRadius: 8,
    },
});