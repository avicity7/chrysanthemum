import { useFonts } from 'expo-font';
import { useState } from "react";
import { StyleSheet, Text, View, Modal,Pressable } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import Button from "../components/Button";
import globalStyles from "../styles/global";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RefreshButton from "../components/RefreshButton";

const getTransactions = async (wallet,setData,setModalVisible,modalVisible)=>{
    const apiURL = 'http://13.212.100.69:5000';
    await fetch(apiURL + "/safePublish/getTransactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAddress: wallet,
        }),
    })
    .then((response) => response.json())
    .then((data => {
        setData(data.transactions)
    }))
}

const sendTriage = async (wallet,setData,setModalVisible,modalVisible,keys,addKey)=>{
    setModalVisible(!modalVisible);
    const apiURL = 'http://13.212.100.69:5000';
    await fetch(apiURL + "/safePublish/sendTriage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAddress: wallet,
        }),
    })
    .then((response) => response.json())
    .then((data => {
        setData(data.key)
        if (!Array.isArray(keys) && keys != []) {
            addKey([data.key])
        }
        else {
            addKey(keys.unshift(data.key))
        }
        setModalVisible(!modalVisible)
        console.log(keys)
    }))
}   

const HealthRecords = () => {
    const [userData,setData] = useState("Health Records")
    return (
        <View style = {style.container}>
            <View style={globalStyles.container}>
            <Text style = {{fontFamily: "NotoSerifJPSemiBold"}}>{userData}</Text>
            </View>
            <View style = {style.refresh}>
                <RefreshButton icon="refresh" onPress={() => {
                    //Load data
                    getTransactions("0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8",setData)
                }} />
            </View>
        </View>
    );
}


const ServicesScreen = ({navigation}) => {
    const [userData,setData] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [keys,addKey] = useState([]);
    const [loaded] = useFonts({
        NotoSerifJPRegular: require('../../assets/NotoSerifJP-Regular.otf'),
        NotoSerifJPSemiBold: require('../../assets/NotoSerifJP-SemiBold.otf'),
        NotoSerifJPBold: require('../../assets/NotoSerifJP-Bold.otf')
    });

    if (!loaded) {
        return null;
    }

    return (
    <View style = {style.header}>
        <Text style = {{fontFamily: "NotoSerifJPSemiBold",fontSize:32,marginTop:50,marginBottom:0}}>Services</Text>
        <View style={globalStyles.container}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style = {style.centeredView}>
                <View style = {style.modalView}>
                    <Text style = {{fontFamily: "NotoSerifJPRegular"}}>{userData == ""? "Loading...":<QRCode value={userData} size={200} />}</Text>
                    <Pressable
                    style={[style.button, style.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style = {{fontFamily:"NotoSerifJPBold",color:"#FFFFFF"}}>Close</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
            <View style = {style.single}>
                <Button icon="sort" customStyle={{flexGrow:1}} title={"Triage"} onPress={() => {
                    setData("");
                    sendTriage("0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8",setData,setModalVisible,modalVisible,keys,addKey);
                }} />
            </View>
            <View style={style.split}>
                <Button icon="archive-edit" customStyle={[style.occupy, {marginRight: 8}]} title={"Update Records"} onPress={() => {/* TODO: Scan QR Code, then display information + confirmation button to push */}} />
                <Button icon="archive-search" customStyle={[style.occupy, {marginLeft: 8}]} title={"View Records"} onPress={() => {navigation.navigate("Health Records")}} />
            </View>
            </View>
    </View>
    )
}

const Stack = createNativeStackNavigator();

const Services = () => {
    const [loaded] = useFonts({
        NotoSerifJPRegular: require('../../assets/NotoSerifJP-Regular.otf'),
        NotoSerifJPSemiBold: require('../../assets/NotoSerifJP-SemiBold.otf'),
        NotoSerifJPBold: require('../../assets/NotoSerifJP-Bold.otf')
    });

    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer independent = {true}>
          <Stack.Navigator initialRouteName="ServicesScreen">
            <Stack.Screen name="ServicesScreen" component={ServicesScreen} options = {{headerShown:false}} />
            <Stack.Screen name="Health Records" component={HealthRecords} options =  {{headerTitleStyle:{fontFamily:"NotoSerifJPSemiBold",color:'black'},headerBackTitle:"",headerTintColor:"#C383F4"}}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 32,
    },
    split: {
        display: "flex",
        flexDirection: "row",
        marginTop: 8,
        marginBottom: 16
    },
    occupy: {
        flexGrow: 1,
    },
    single: {
        marginBottom: 8,
        display:"flex",
        flexDirection:"row"
    },
    header: {
        flex: 1,
        backgroundColor: "white",
        padding: 32,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        marginTop: 20,
        backgroundColor: "#E79090",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    refresh: {
        marginBottom: 8,
        display:"flex",
        flexDirection:"row",
        alignSelf:"flex-end"
    },
})

export default Services;
