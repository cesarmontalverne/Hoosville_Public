import React from "react"
import {Button, View, ImageBackground, Text, StyleSheet, Alert} from "react-native"
//import board0 from "../assets/board0.png"
//import board1 from "../assets/board1.png"
import Players from "../Classes/Players"
import MovePlayer from '../components/Board/MovePlayer'
import InfoModal from "../components/utilities/InfoModal"
import Timer from "../components/Board/Timer"
import {connect} from 'react-redux'
import MiniMap from "../components/utilities/MiniMap"
import styles from "../utilities/styles"
import BackwardButton from "../components/utilities/BackwardButton"
import BoardRender from "../components/Board/BoardRender";



var players = new Players()
//var board = [board0, board1]
const yaxis = [290, 220, 155, 90, 15] //yaxis coordinates player1 could be in to move in the board
const xaxis = [20, 90, 165, 233, 303] 
class Board extends React.Component {
    constructor(props) {
        super(props)
        players.initializePlayers(this.props.numPlayers, this.props.route.params.occupationIcons,this.props.route.params.occupationNames, this.props.route.params.col, this.props.lumpSum,"Player 1", this.props.squares)
    }
    
    miniMapClose = () => {
        this.props.newMiniMap()
        this.props.newGameOn()
    }
    
    render() {
        return (
            <View style={[styles.appBackground, {justifyContent:"space-between", padding:20}]}>
                {/*<View style={{ backgroundColor: '#3F8DB9', padding: 20, height: 900, justifyContent:"space-evenly"}}>*/}
                <Timer 
                    players = {players} 
                    id = {this.props.route.params.id} 
                    navigation = {this.props.navigation}
                />
                <View style={{justifyContent: "center",alignItems: "center"}}>
                    <BoardRender
                        input={this.props.board}
                        create={() =>
                            players.createPlayers(this.props.squares, xaxis, yaxis)
                        }
                    />
                    {/* <ImageBackground
                        source={board[this.props.board]} style={{ width: 350, height: 350,}}
                    >
                        {players.createPlayers(this.props.squares, xaxis, yaxis)}
                        
                    </ImageBackground> */}
                </View>
                <MovePlayer players = {players}/>
                <InfoModal 
                    infoBool = {this.props.miniMap} 
                    players={players}
                    toRender = {
                        <View>
                            {/*<MiniMap players = {players}/>*/}
                            <BackwardButton
                                onPress = {()=>{
                                    this.props.newMiniMap()
                                    this.props.newGameOn()
                                }}
                                buttonText={"unpause"}
                            />
                                <BackwardButton
                                    onPress = {()=>
                                        {
                                            Alert.alert("End Game","Are you sure you want to end game?",
                                                [{text: "No"},
                                                {
                                                    text: "Yes",
                                                    onPress: () => {
                                                        this.props.restart()
                                                        this.props.navigation.navigate('Home')
                                                    },
                                                }
                                                ]
                                            )
                                        }
                                    }
                                buttonText={"end game"}
                            />
                        </View>
                    }
                    height = {400}
                    width = {"80%"}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        numPlayers:state.numPlayers,
        squares: state.squares,
        energy: state.energy,
        time: state.time,
        endGame:state.endGame,
        miniMap:state.miniMap,
        lumpSum:state.lumpSum,
        board:state.board
    };
  }

function mapDispatchToProps(dispatch){
    return{
        restart:()=> dispatch({type:'RESTART', newGameOn:true}),
        newMiniMap:()=>dispatch({type:"NEW_MINIMAP", newMiniMap:false}),
        newGameOn:()=>dispatch({type:'NEW_GAMEON', newGameOn:true}),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Board);
