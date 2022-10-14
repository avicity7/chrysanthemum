import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import { Pressable, StyleSheet, Text } from "react-native";

const Device = ({ customStyle, icon, title, onPress, data }) => {
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
          size={24}
          color="black"
          style={style.icon}
        />
      )}
      <Text style={style.title}>{title}</Text>
      <Text style={style.data}>{data}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    paddingVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 20,
  },
  icon: {
    marginRight: 8,
    marginLeft: 12,
  },
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
  data: {
    display: "flex",
    flex: 1,
    fontFamily: "NotoSerifJPBold",
    textAlign: "right",
    marginRight: 12,
  },
});

export default Device;
