import { View, Text, StyleSheet } from "react-native";
import globalStyles from "../styles/global";
import Button from "../components/Button";

const Services = () => {
    return (
    <View style={globalStyles.container}>
        <Button customStyle={{marginBottom: 8}} title={"Triage"} onPress={() => {/* TODO: Add functionality */}} />
        <View style={style.split}>
            <Button customStyle={[style.occupy, {marginRight: 8}]} title={"Update Records"} onPress={() => {/* TODO: Add functionality */}} />
            <Button customStyle={[style.occupy, {marginLeft: 8}]} title={"View Records"} onPress={() => {/* TODO: Add functionality */}} />
        </View>
    </View>)
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
