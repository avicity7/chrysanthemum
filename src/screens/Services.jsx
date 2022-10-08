import { View, Text, StyleSheet } from "react-native";
import globalStyles from "../styles/global";
import Button from "../components/Button";

const Services = () => {
    return (
    <View style={globalStyles.container}>
        <Button customStyle={{margin: 8}} title={"Triage"} onPress={() => {/* TODO: Add functionality */}} />
        <View style={style.split}>
            <Button customStyle={style.occupy} title={"Update Records"} onPress={() => {/* TODO: Add functionality */}} />
            <Button customStyle={style.occupy} title={"View Records"} onPress={() => {/* TODO: Add functionality */}} />
        </View>
    </View>)
}

const style = StyleSheet.create({
    split: {
        display: "flex",
        flexDirection: "row",
    },
    occupy: {
        flexGrow: 1,
        margin: 8
    }
})

export default Services;
