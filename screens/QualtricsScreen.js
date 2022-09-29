import {React, Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Qualtrics from '../components/utilities/Qualtrics';

export default class QualtricsScreen extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Qualtrics navigation={this.props.navigation}/>
        )
    }
}