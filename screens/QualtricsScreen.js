import {React, Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Qualtrics from '../components/utilities/Qualtrics';

export default class QualtricsScreen extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            //uri: "https://virginia.az1.qualtrics.com/jfe/form/SV_3lWXHfj7sSpmGEK"
            <Qualtrics navigation={this.props.navigation} uri = {"https://virginia.az1.qualtrics.com/jfe/form/SV_b8cxNgVQ6Dx6GB8"} accountForm={true}/>
        )
    }
}