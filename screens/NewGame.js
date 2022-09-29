import {React, Component} from "react"
import {Text, View, Button, StyleSheet, Alert, Image} from "react-native"
import occupationicons_file from "../utilities/occupationicons_file" 
import occupationNames_file from "../utilities/occupationNames_file"
import Picker from "../components/Home/Picker"
import db from './../firebase/firebase';
import {connect} from "react-redux"
import ForwardButton from "../components/utilities/ForwardButton"
import BackwardButton from "../components/utilities/BackwardButton"
import { get, child, update } from 'firebase/database';
import styles from "../utilities/styles"

const colors = [ "#a9d3fc", "#ff99b1", "#c688fc", "#fcefa4", "#b6fca9"]
const occupationIcons = occupationicons_file
const occupationNames = occupationNames_file

class NewGame extends Component {
    constructor(props) {
        super(props)
        this.state = {occupationID:0, colorID:0, id:-1}
    }
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
                                this.createGame.then(id=>{
                                    if(id>0){
                                        this.props.newGameOn(true)
                                        this.props.navigation.navigate('Board', { occupationIcons: occupationIcons[this.state.occupationID], occupationNames:occupationNames[this.state.occupationID], col: colors[this.state.colorID], id:id })
                                    } 
                                    else console.warn("there was an error with setting players id") 
                                })
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
        newGameOn:(newGameOn)=>dispatch({type:'NEW_GAMEON', newGameOn:newGameOn}),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewGame)