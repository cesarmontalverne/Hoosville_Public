import { StyleSheet } from "react-native"
export default StyleSheet.create({
    appBackground: {
        backgroundColor:"#3F8DB9", 
        flex:1
    },
    board: {
        justifyContent: "center",
        alignItems: "center",
    },
    type1button:{
        backgroundColor:"#DC890C", padding:15, borderRadius:20
    },
    type2button:{

    },
    type3button:{
        backgroundColor:"white",
        borderWidth: 2, 
        padding: 5, 
        borderRadius: 4,
        borderColor:"black",
        
    },
    analog:{
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 27,
        borderRightWidth: 27,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: "white",
        margin: 0,
        marginLeft: -6,
        borderWidth: 0,
        borderColor: "black"
    },
    //infoModal
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        alignItems: "center",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        
    },
    button: {
        borderRadius: 20,
        padding: 10,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    //changesettings
    subtitles:{
        alignItems:'center', 
        justifyContent:'center',
        marginBottom:10,
        marginTop:30
    },
    subtitlesText:{
        fontSize:15,
        color:"white",
        fontWeight:'bold'
    },
    vals:{
    width:355,
    alignItems:"center"
    }
})