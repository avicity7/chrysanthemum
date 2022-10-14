import { useFonts } from 'expo-font';
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import Button from "../components/Button";
import globalStyles from "../styles/global";

const getTransactions = async (wallet,setData)=>{
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

const sendTriage = async (wallet,setData)=>{
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
    }))
}


const Services = () => {
    const [userData,setData] = useState("test");
    const [loaded] = useFonts({
        NotoSerifJPRegular: require('../../assets/NotoSerifJP-Regular.otf'),
        NotoSerifJPSemiBold: require('../../assets/NotoSerifJP-SemiBold.otf'),
        NotoSerifJPBold: require('../../assets/NotoSerifJP-Bold.otf')
    });

    if (!loaded) {
        return null;
    }

    return (
    <View style={globalStyles.container}>
        <View style = {style.single}>
            <Button icon="sort" customStyle={{flexGrow:1}} title={"Triage"} onPress={() => {
                sendTriage("0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8",setData);
            }} />
        </View>
        <View style={style.split}>
            <Button icon="archive-edit" customStyle={[style.occupy, {marginRight: 8}]} title={"Update Records"} onPress={() => {/* TODO: Add functionality */}} />
            <Button icon="archive-search" customStyle={[style.occupy, {marginLeft: 8}]} title={"View Records"} onPress={() => {getTransactions("0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8",setData)}} />
        </View>
        {userData !== "test" ? <QRCode value={userData} size={200} /> : <Text>{userData}</Text>}
    </View>)
}

const style = StyleSheet.create({
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
    }
})

export default Services;
