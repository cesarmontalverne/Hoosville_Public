import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import ChangeRequest from '../components/Settings/ChangeRequest'
import InfoModal from '../components/utilities/InfoModal'
import CurrentValues from '../components/Settings/CurrentValues'
import ChangeSettings from '../components/Settings/ChangeSettings'
import styles from "../utilities/styles"
import BackwardButton from "../components/utilities/BackwardButton"

export default class Setts extends Component{
    constructor(props){
        super(props)
        this.state = {changeSettings:false, curVals:false, editEvents:false}
    }
    button = (title, bool, setter) => {
        return (
            <View style={{ justifyContents: 'center',padding:10 }}>
                <TouchableOpacity
                    style={[styles.type3button,{alignItems:"center", justifyContent:"center",height:50}]}
                    onPress={() => {
                        setter(!bool)
                    }}>
                    <Text style={{color:"black", fontSize:15}}>{title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render(){
        return(
            <View style = {[styles.appBackground]}>
                <Text style={{ marginTop:50, fontSize: 30, textAlign: 'center', color:"white", marginBottom:"10%" }}>Settings</Text>
                <View>
                    {this.button("Change Values", this.state.changeSettings, () => this.setState({ changeSettings: true }))}
                </View>
                <View>
                    {this.button("Current Values", this.state.curVals, () => this.setState({ curVals: true }))}
                </View>
                <View>
                    {this.button("Edit Events", this.state.curVals, () => this.setState({ editEvents: true }))}
                </View>
                <View style={{justifyContent:"flex-end", flex:2}}>
                    <BackwardButton
                        onPress={() => this.props.navigation.navigate('Home')}
                        buttonText ={"Back Home"}
                    />
                </View>
                <InfoModal
                    infoBool={this.state.changeSettings}
                    showClose ={false}
                    toRender={
                        <View>
                            <ScrollView>
                                <ChangeSettings/>
                            </ScrollView>
                            <BackwardButton
                                onPress={() => this.setState({ changeSettings: false })}
                                buttonText={"Back to Settings"}
                            />
                        </View>
                    }
                    height={600}
                    width={350}
                />
                <InfoModal
                    infoBool={this.state.curVals}
                    showClose={false}
                    toRender={
                        <View>
                            <ScrollView>
                                <CurrentValues />
                            </ScrollView>
                            <BackwardButton
                                onPress={() => this.setState({ curVals: false })}
                                buttonText={"Back to Settings"}
                            />
                        </View>
                    }
                    height={600}
                    width={350}
                />
            </View>
        )

    }
}