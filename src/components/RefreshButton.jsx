import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import { Pressable, StyleSheet, Text } from "react-native";

const RefreshButton = ({ customStyle, icon, title, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        style.container,
        pressed ? style.containerPressed : style.containerUnpressed,
        customStyle,
      ]}
      android_ripple={true}
      onPress={onPress}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={30}
          color="#FFFFFF"
          style={style.icon}
        />
      )}
      <Text style={style.title}>{title}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#C383F4",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 100,
    marginBottom: 20,
    padding: 10,
  },
  icon: {},
  containerUnpressed: {
    opacity: 1,
  },
  containerPressed: {
    opacity: 0.5,
  },
  title: {
    fontFamily: "NotoSerifJPSemiBold",
    fontSize: 16,
  },
});

export default RefreshButton;
