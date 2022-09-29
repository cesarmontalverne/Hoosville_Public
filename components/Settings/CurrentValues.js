import { useSelector } from 'react-redux'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import styles from "../../utilities/styles"

export default function CurrentValues({ }) {
    const initialTime = useSelector(state => state.initialTime)
    const numPlayers = useSelector(state=>state.numPlayers)
    const lumpSum = useSelector(state=>state.lumpSum)
    const payments = useSelector(state=>state.payments)
    const maxMoney = useSelector(state=>state.maxMoney)
    const friendMeterSpeed = useSelector(state=>state.friendMeterSpeed)
    const friendMeterDecay = useSelector(state=>state.friendMeterDecay)
    const energyFriendDrain = useSelector(state=>state.energyFriendDrain)
    const energyRecoup = useSelector(state=>state.energyRecoup)
    const energyCostMoving = useSelector(state=>state.energyCostMoving)
    const acquaintanceDiscount = useSelector(state=>state.acquaintanceDiscount)
    const friendDiscount = useSelector(state=>state.friendDiscount)
    const bestfriendDiscount = useSelector(state=>state.bestfriendDiscount)
    const priceOne = useSelector(state=>state.priceOne)
    const priceOneSd = useSelector(state=>state.priceOneSd)
    const probOne = useSelector(state=>state.probOne)
    const priceTwo = useSelector(state=>state.priceTwo)
    const priceTwoSd = useSelector(state=>state.priceTwoSd)
    const probTwo = useSelector(state=>state.probTwo)
    const probZero = useSelector(state=>state.probZero)
    const averageTimeEvent = useSelector(state=>state.averageTimeEvent)
    const standardDevTimeEvent = useSelector(state=>state.standardDevTimeEvent)

    function display(title, variable){
        return(
            <View style={{flexDirection:'row', padding:2}}>
                <Text style={{width:200, padding:2, color:"white"}}>{title}</Text>
                <Text style={{width:100, padding:2, marginLeft:15, color:"white"}}>{variable}</Text>
            </View>
        )
    }
   return(
       <View>
           <View style={styles.subtitles}>
               <Text style={styles.subtitlesText}>Basic Settings</Text>
           </View>
           <View style={styles.vals}>
                {display("Initial Time", initialTime)}
                {display("Number of Players", numPlayers)}
                {display("Lump Sum", lumpSum)}
                {display("Payments", payments)}
                {display("Maximum Money", maxMoney)}
           </View>
           <View style={styles.subtitles}>
               <Text style={styles.subtitlesText}>FriendMeter and Energy</Text>
           </View>
           <View style={styles.vals}>
            {display("FriendMeter Speed", friendMeterSpeed)}
            {display("FriendMeter Decay", friendMeterDecay)}
            {display("Energy-Friend Drain", energyFriendDrain)}
            {display("Energy Recoup", energyRecoup)}
            {display("Energy Cost of Moving", energyCostMoving)}
            {display("Acquaintance Discount", acquaintanceDiscount)}
            {display("Friend Discount", friendDiscount)}
            {display("Best Friend Discount", bestfriendDiscount)}
           </View>
           <View style={styles.subtitles}>
               <Text style={styles.subtitlesText}>Events</Text>
           </View>
           <View style={styles.vals}>
            {display("Average Price Type One", priceOne)}
            {display("Average Price Type Two", priceTwo)}
            {display("Standard Deviation Price Type One", priceOneSd)}
            {display("Standard Deviation Price Type Two", priceTwoSd)}
            {display("Probability Type One", probOne)}
            {display("Probability Type Two", probTwo)}
            {display("Average Time Between Events", averageTimeEvent)}
            {display("Stand Dev Time Between Events", standardDevTimeEvent)}
            {display("Probability Unfriend Event", probZero)}
           </View>
       </View>
   )
}