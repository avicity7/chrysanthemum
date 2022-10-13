import { View, Text, StyleSheet } from "react-native";
import globalStyles from "../styles/global";
import { useState } from "react";
import { useFonts } from 'expo-font';


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
        <Text style = {{fontFamily: "NotoSerifJPSemiBold",fontSize:32}}>User</Text>
        <View style = {globalStyles.container}>
            {/*Devices*/}
        </View>
       
    
    
    </View>)
}

const style = StyleSheet.create({
    greeting: {
        flex: 1,
        backgroundColor: "white",
        padding: 32,
    }
    
})

export default Home;
