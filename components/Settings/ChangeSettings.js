import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ChangeRequest from './ChangeRequest'
import { useState } from 'react'
import styles from '../../utilities/styles'


export default function ChangeSettings({ }) {
    const [basic, setBasic] = useState(false)
    const [friendMeter, setFriendMeter] = useState(false)
    const [events, setEvents] = useState(false)
    function dispatchJson(type, newVar = null){ return { type: type, newVar } }
    function basicSettings(){
        return (
            <View>
                <ChangeRequest
                    title="Time"
                    dispatchJson={dispatchJson('NEW_INITIALTIME')}
                />
                <ChangeRequest
                    title="Number of Players"
                    dispatchJson={dispatchJson('NEW_NUMPLAYERS')}
                />
                <ChangeRequest
                    title="Lump Sum"
                    dispatchJson={dispatchJson('NEW_LUMPSUM')}
                />
                <ChangeRequest
                    title="Payments"
                    dispatchJson={dispatchJson('NEW_PAYMENTS')}
                />
                <ChangeRequest
                    title="Maximum Money"
                    dispatchJson={dispatchJson('NEW_MAXMONEY')}
                />
            </View>
        )
    }
    function friendMeterSettings(){
        return (
            <View>
                <ChangeRequest
                    title="FriendMeter Speed"
                    dispatchJson={dispatchJson('NEW_FRIENDMETERSPEED')}
                />
                <ChangeRequest
                    title="FriendMeter Decay"
                    dispatchJson={dispatchJson('NEW_FRIENDMETERDECAY')}
                />
                <ChangeRequest
                    title="Energy-Friend Drain"
                    dispatchJson={dispatchJson('NEW_ENERGYFRIENDDRAIN')}
                />
                <ChangeRequest
                    title="Energy Recoup"
                    dispatchJson={dispatchJson('NEW_ENERGYRECOUP')}
                />
                <ChangeRequest
                    title="Energy Cost of Moving"
                    dispatchJson={dispatchJson('NEW_ENERGYCOSTMOVING')}
                />
                <ChangeRequest
                    title="Acquaintance Discount"
                    dispatchJson={dispatchJson('NEW_ACQUAINTANCEDISC')}
                />
                <ChangeRequest
                    title="Friend Discount"
                    dispatchJson={dispatchJson('NEW_FRIENDDISC')}
                />
                <ChangeRequest
                    title="Best Friend Discount"
                    dispatchJson={dispatchJson('NEW_BESTFRIENDDISC')}
                />
            </View>
        )
    }
    function eventsSettings(){
        return (
            <View>
                <ChangeRequest
                    title="Average Price Event Type1"
                    dispatchJson={dispatchJson('NEW_PRICEONE')}
                />
                <ChangeRequest
                    title="Price Standard Deviation Event Type1"
                    dispatchJson={dispatchJson('NEW_PRICEONESD')}
                />
                <ChangeRequest
                    title="Probability Event Type1"
                    dispatchJson={dispatchJson('NEW_PROBONE')}
                />
                <ChangeRequest
                    title="Price Event Type2"
                    dispatchJson={dispatchJson('NEW_PRICETWO')}
                />
                <ChangeRequest
                    title="Price Standard Deviation Event Type2"
                    dispatchJson={dispatchJson('NEW_PRICETWOSD')}
                />
                <ChangeRequest
                    title="Probability Event Type2"
                    dispatchJson={dispatchJson('NEW_PROBTWO')}
                />
                <ChangeRequest
                    title="Probability Lose Friend"
                    dispatchJson={dispatchJson('NEW_PROBZERO')}
                />
                <ChangeRequest
                    title="Average Time Between Events"
                    dispatchJson={dispatchJson('NEW_AVERAGETIMEEVENT')}
                />
                <ChangeRequest
                    title="Standard Dev Time Between Events"
                    dispatchJson={dispatchJson('NEW_STANDARDDEVTIMEEVENT')}
                />

            </View>
        )
    }
    function button(title, bool, setter){
        return (
            <View style={{ justifyContents: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={[styles.type3button]}
                    onPress={() => {
                        setter(!bool)
                    }}>
                    <Text>{bool ? "hide" : "show"} {title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    function showSection(title, bool, section, setter){
        if (bool) {
            return (<View>
                {section()}
                {button(title, bool, setter)}
            </View>)
        } else {
            return (<View>
                {button(title, bool, setter)}
            </View>)
        }
    }

    return (
        <View style={{padding: 20}}>
            <View style={styles.subtitles}>
                <Text style={[styles.subtitlesText,{color:"white"}]}>Basic Settings</Text>
            </View>
            {showSection("Basic Settings", basic, () => basicSettings(), (out) => setBasic(out))}

            <View style={styles.subtitles}>
                <Text style={[styles.subtitlesText,{color:"white"}]}>FriendMeter and Energy</Text>
            </View>
            {showSection("FriendMeter and Energy Settings", friendMeter, () => friendMeterSettings(), (out) => setFriendMeter(out))}

            <View style={styles.subtitles}>
                <Text style={[styles.subtitlesText,{color:"white"}]}>Events</Text>
            </View>
            {showSection("Events Settings", events, () => eventsSettings(), (out) => setEvents(out))}
        </View>
    )

}
