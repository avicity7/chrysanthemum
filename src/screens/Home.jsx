import { View, Text, StyleSheet } from "react-native";
import globalStyles from "../styles/global";
import { useState } from "react";
import { useFonts } from 'expo-font';
import Device from "../components/Device"


const Home = () => {

    const [loaded] = useFonts({
        NotoSerifJPRegular: require('../../assets/NotoSerifJP-Regular.otf'),
        NotoSerifJPSemiBold: require('../../assets/NotoSerifJP-SemiBold.otf'),
        NotoSerifJPBold: require('../../assets/NotoSerifJP-Bold.otf')
    });

    if (!loaded) {
        return null;
    }

    return (
    <View style={style.greeting}>
        <Text style = {{fontFamily: "NotoSerifJPSemiBold",fontSize:20}}>Welcome back,</Text>
        <Text style = {{fontFamily: "NotoSerifJPSemiBold",fontSize:32,marginTop:0,marginBottom:20}}>User</Text>
        <Text style = {{fontFamily: "NotoSerifJPSemiBold",fontSize:16,marginTop:0,marginBottom:40}}>Make sure to get some sun!</Text>
        <View style = {globalStyles.deviceContainer}>
            <Text style = {{fontFamily: "NotoSerifJPRegular",fontSize:16,marginTop:0,marginBottom:20}}>Devices</Text>
            <View style = {style.single}>
                <Device icon="bed" customStyle={{flexGrow:1}} title={"Sleep"} onPress={() => {
                    sendTriage("0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8",setData);
                }} />
            </View>
            
        </View>
       
    
    
    </View>)
}

const style = StyleSheet.create({
    greeting: {
        flex: 1,
        backgroundColor: "white",
        padding: 32,
    },
    single: {
        marginBottom: 8,
        display:"flex",
        flexDirection:"row"
    }
    
})

export default Home;
