import { View, Text, StyleSheet, Pressable } from "react-native";
import globalStyles from "../styles/global";
import { useState } from "react";
import { useFonts } from 'expo-font';
import Device from "../components/Device";
import RefreshButton from "../components/RefreshButton";

const Articles = () => {
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
        <View style={style.header}>
            <View style = {{flexDirection:'row'}}></View>
            <Text style = {{fontFamily: "NotoSerifJPSemiBold",fontSize:32,marginTop:50,marginBottom:0}}>Articles</Text>
            <View style = {globalStyles.container}>
                <Text>{userData}</Text>
            </View>
            <View style = {style.refresh}>
                <RefreshButton icon="refresh" onPress={() => {
                    
                }} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: "white",
        padding: 32,
    },
    single: {
        marginBottom: 8,
        display:"flex",
        flexDirection:"row"
    },
    addText:{
        fontFamily: "NotoSerifJPRegular",
        color:"#888888",
        marginTop:0
    },
    refresh: {
        marginBottom: 8,
        display:"flex",
        flexDirection:"row",
        alignSelf:"flex-end"
    },
    
})


export default Articles;
