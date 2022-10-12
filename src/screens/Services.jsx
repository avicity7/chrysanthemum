import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import globalStyles from "../styles/global";
import Button from "../components/Button";


const Services = () => {
    const [userData,setData] = useState("test");

    return (
    <View style={globalStyles.container}>
        <Button icon="sort" customStyle={{marginBottom: 8}} title={"Triage"} onPress={() => {
            let transactions = getTransactions("0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8",setData);
        }} />
        <View style={style.split}>
            <Button icon="archive-edit" customStyle={[style.occupy, {marginRight: 8}]} title={"Update Records"} onPress={() => {/* TODO: Add functionality */}} />
            <Button icon="archive-search" customStyle={[style.occupy, {marginLeft: 8}]} title={"View Records"} onPress={() => {/* TODO: Add functionality */}} />
        </View>
        <Text>{userData}</Text>
    </View>)
}

const getTransactions = async (wallet,setData)=>{
    const apiURL = 'http://localhost:5000';
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

const style = StyleSheet.create({
    split: {
        display: "flex",
        flexDirection: "row",
        marginTop: 8
    },
    occupy: {
        flexGrow: 1,
    }
})

export default Services;
