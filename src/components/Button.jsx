import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import { Pressable, StyleSheet, Text } from "react-native";
import globalStyles from "../styles/global";

const Button = ({ customStyle, icon, title, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        style.container,
        pressed
          ? globalStyles.containerPressed
          : globalStyles.containerUnpressed,
        customStyle,
      ]}
      onPress={onPress}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color="black"
          style={style.icon}
        />
      )}
      <Text style={style.title}>{title}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    margin:10
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontFamily: "NotoSerifJPSemiBold",
  },
});

export default Button;
