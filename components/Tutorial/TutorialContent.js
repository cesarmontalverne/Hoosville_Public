import {View, Text} from 'react-native'

export default function TutorialContent({pageNumber}){
    switch (pageNumber) {
        case 0:
            return(<View><Text>page 0</Text></View>)
        case 1:
            return(<View><Text>page 1</Text></View>)
        default:
            return <View><Text>last page</Text></View>
    }
}