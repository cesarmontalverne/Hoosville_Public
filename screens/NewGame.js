import {React, Component} from "react"
import {Text, View, Button, StyleSheet, Alert, Image} from "react-native"
import occupationicons_file from "../utilities/occupationicons_file" 
import occupationNames_file from "../utilities/occupationNames_file"
import Picker from "../components/Home/Picker"
import db from './../apis/firebase';
import {connect} from "react-redux"
import ForwardButton from "../components/utilities/ForwardButton"
import BackwardButton from "../components/utilities/BackwardButton"
import { get, child, update } from 'firebase/database';
import styles from "../utilities/styles"
import loadSheets from "../apis/loadSheets"
import AsyncStore from "../utilities/AsyncStore"

const colors = [ "#a9d3fc", "#ff99b1", "#c688fc", "#fcefa4", "#b6fca9"]
const occupationIcons = occupationicons_file
const occupationNames = occupationNames_file

class NewGame extends Component {
    constructor(props) {
        super(props)
        this.state = {occupationID:0, colorID:0, id:-1}
    }
    /*
    createGame = new Promise((resolve, reject)=> {
        get(child(db, `/`)).then((snapshot) => {
            if (snapshot.exists()) {
                let id = Number(snapshot.val().numgames)
                update(child(db, '/'), {
                    numgames: id +1
                });
                resolve(id)
            } else {
                console.warn("No data available");
                reject(-1)
            }
        }).catch((error) => {
            //probably there is some occupation you added here but not in the database
            console.error(error);
            reject(-1)
        });
    })
    */
    setVals = async (vals) => {
        this.props.setControlValues(vals)
    }
    setOccupationID = (out) => this.setState({occupationID:out})
    setColorID = (out) => this.setState({colorID:out})
    tempPlayer = () =>{
        return(
            <View style={{justifyContent:"center"}}>
            <Image
                source={occupationIcons[this.state.occupationID]}
                style={{borderWidth: 3,borderColor: 'rgba(0,0,0,0.2)',
                    height: 40, width: 40,
                    borderRadius: 8, backgroundColor: colors[this.state.colorID]}}
            />
            </View>
        )
    }
    render() {
        return (
            <View style={[styles.appBackground,]}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex:3 }}>
                    <Text style={{fontSize:20, color: "white"}}>Select Your Avatar</Text>
                    <View style={{ padding: 20 }}>
                        <Picker
                            statevar={this.state.occupationID}
                            statevarSetter={this.setOccupationID.bind(this)}
                            toRenderList={occupationIcons}
                            size={60}
                            type="IMAGE"
                        />
                    </View>
                    <Text style={{fontSize:20, color: "white"}}>Select Your Color</Text>
                    <View style={{ padding: 20 }}>
                        <Picker
                            statevar={this.state.colorID}
                            statevarSetter={this.setColorID.bind(this)}
                            toRenderList={colors}
                            size={60}
                            type="COLOR"
                        />
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={{justifyContent:"center", alignItems:"center", padding:30}}>
                        {this.tempPlayer()}
                    </View>
                    <View styles={{padding:100}}>
                        <ForwardButton
                            onPress={() => { 
                                this.props.newGameOn(true)
                                loadSheets("Events!A1:X30").then((res)=>{this.props.setEvents(res)})
                                AsyncStore.load("rid").then((rid)=>{
                                    if(rid!=null){
                                        this.props.setRID(rid)
                                        AsyncStore.load("num_games").then((num_games)=>this.props.setNumGames(String(parseInt(num_games)+1)))
                                        AsyncStore.load("rand_control").then((control)=>{
                                            loadSheets("Presets!C1:L20").then((all_presets)=>this.setVals(all_presets[control])).then(()=>{
                                                this.props.navigation.navigate('Board', { occupationIcons: occupationIcons[this.state.occupationID], occupationNames:occupationNames[this.state.occupationID], col: colors[this.state.colorID]})
                                            })  
                                        })
                                    }else{
                                        console.warn("Account wasn't created properly. Please press 'return' button and try again")
                                    }
                                })
                                //this.props.loadRID(rid.slice(103,120))
                                //dispatch({type:"NEW_RID", rid:rid.slice(103,120)})//read this frpm async storage instead
                                //loadSheets("Presets!C1:Z30").then((res)=>console.log(res)) //change values in redux

            
                            }}
                            buttonText={"Start!"}
                            fontSize={25}
                        />
                    <BackwardButton
                            onPress={()=>this.props.navigation.navigate('Home')}
                            buttonText={"Return"}
                    />
                </View>
               </View>
            </View>
            )
    }
}
function mapStateToProps(state){return state}
function mapDispatchToProps(dispatch){
    return{
        setNumGames:(numGames)=>dispatch({type:"NEW_NUMGAMES",numGames:numGames}),
        newGameOn:(newGameOn)=>dispatch({type:'NEW_GAMEON', newGameOn:newGameOn}),
        setEvents:(data)=>dispatch({type:"NEW_EVENTS", data:data}),
        setRID:(data)=>dispatch({type:"NEW_RID", rid:data}),
        setControlValues: (data) => dispatch({
            type: "NEW_EVERY_CONTROLLABLE",
            //basic settings
            initialTime: Number(data[0]),
            time: Number(data[1]),
            numPlayers: Number(data[2]),
            lumpSum: Number(data[3]),
            payments: Number(data[4]),
            maxMoney: Number(data[5]),
            //friendmeter and energy
            friendMeterSpeed: Number(data[6]), //decay still happens(so take that into account!)
            friendMeterDecay: Number(data[7]),
            energyFriendDrain: Number(data[8]), //still recoup energy
            energyRecoup: Number(data[9]),
            energyCostMoving: Number(data[10]),
            acquaintanceDiscount: Number(data[11]),
            friendDiscount: Number(data[12]),
            bestfriendDiscount: Number(data[13]),
            //events
            price: Number(data[14]),
            priceSd: Number(data[15]),
            probUnfriend: Number(data[16]),
            averageTimeEvent: Number(data[17]),
            standardDevTimeEvent: Number(data[18])
        })

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewGame)