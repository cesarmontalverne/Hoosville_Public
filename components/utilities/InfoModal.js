import { Modal, StyleSheet, Text, View, Button } from "react-native";
import styles from "../../utilities/styles"

export default function InfoModal({infoBool, toRender, height=200, width=200}){

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
                        </View>
                    </View>
            </Modal>
        </View>
    )
}
