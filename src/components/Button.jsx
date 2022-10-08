import { Pressable, Text, StyleSheet } from "react-native"

const Button = ({ customStyle, title, onPress }) => {
    return (
    <Pressable style={({pressed}) => ([style.container, pressed ? style.containerPressed : style.containerUnpressed, customStyle])} android_ripple={true} onPress={onPress}>
        <Text style={style.title}>{title}</Text>
    </Pressable>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#E5E5E5",
        paddingVertical: 16,
        // width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
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
