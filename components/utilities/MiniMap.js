import {View,ImageBackground} from 'react-native'
import miniBoard from '../../assets/miniBoard.png'
import { useSelector } from 'react-redux'
const xaxis = [0,28,57,85,113,141,170,198,226,255]
const yaxis = [252,225,197,170,142,114,86,58,30,2]
export default function MiniMap({players}) {
    const squares = useSelector(state=>state.squares)
    return(
        <View style = {{padding:5}}> 
            <ImageBackground source={miniBoard} style={{ width: 280, height: 280,}}>
                {players.createPlayersMiniMap(squares,xaxis,yaxis)}
            </ImageBackground>
        </View>
    )
}