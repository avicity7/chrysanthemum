import { Pressable, Text, StyleSheet } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

const Device = ({ customStyle, icon, title, onPress }) => {
    return (
    <Pressable style={({pressed}) => ([style.container, pressed ? style.containerPressed : style.containerUnpressed, customStyle])} android_ripple={true} onPress={onPress}>
        {icon && <MaterialCommunityIcons name={icon} size={24} color="black" style={style.icon} />}
        <Text style={style.title}>{title}</Text>
    </Pressable>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#E5E5E5",
        paddingVertical: 16,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    icon: {
        marginRight: 8
    },
    containerUnpressed: {
        opacity: 1
    },
    containerPressed: {
        opacity: 0.5
    },
    title: {
        fontWeight: "bold"
    }
})

export default Button
