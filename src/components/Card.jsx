import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import { Pressable, StyleSheet, Text } from "react-native";

const Card = ({ customStyle, id, topic, name, onPress, navigation }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        style.container,
        pressed ? style.containerPressed : style.containerUnpressed,
        customStyle,
      ]}
    >
      <Text style={style.title}>{id}</Text>
      <Text style={style.title}>{topic}</Text>
      <Text style={style.title}>{name}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    minHeight: "25%",
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  icon: {
    marginRight: 8,
  },
  containerUnpressed: {
    opacity: 1,
  },
  containerPressed: {
    opacity: 0.5,
  },
  title: {
    fontFamily: "NotoSerifJPSemiBold",
    fontSize: 12,
  },
});

export default Card;
