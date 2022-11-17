import {React, Component} from "react"
import Qualtrics from "../components/utilities/Qualtrics"

export default class DebriefScreen extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
          <Qualtrics navigation={this.props.navigation} uri = {"https://virginia.az1.qualtrics.com/jfe/form/SV_eDrew5JyxPQVef4"} accountForm={false}/>
        )
    }
}
