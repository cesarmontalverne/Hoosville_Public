import {React, Component} from "react"
import {View, Text} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import styles from "../utilities/styles"
import Debrief from "../components/utilities/Debrief"
import ForwardButton from "../components/utilities/ForwardButton"

export default class DebriefScreen extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
          <Debrief navigation = {this.props.navigation}/>
        )
    }
}
