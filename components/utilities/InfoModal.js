import { Modal, StyleSheet, Text, View, Button } from "react-native";
import styles from "../../utilities/styles"

export default function InfoModal({infoBool, infoBoolClose, toRender, height=200, width=200, showClose = true}){
    function handleClose(bool){
        if(bool){
            return <Button title='close' onPress={()=>infoBoolClose()}/>
        }
    }
    return(
        <View
            style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={infoBool}>
                <View style={styles.centeredView}>
                        <View style={[styles.modalView,{height:height, width:width, backgroundColor:"#1D73A4",
                    shadowColor: 'black',shadowOffset: {width: 0, height: -4},shadowOpacity:1,padding:10}]}>
                            {toRender}
                            {handleClose(showClose)}
                        </View>
                    </View>
            </Modal>
        </View>
    )
}
