import { useFonts } from "expo-font";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Device from "../components/Device";
import RefreshButton from "../components/RefreshButton";
import globalStyles from "../styles/global";

const getDeviceData = async (setData, retrievedData) => {
  const apiURL = "http://13.212.100.69:5000";
  await fetch(apiURL + "/getDeviceData", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      setData(data.stats);
      retrievedData = data.stats;
    });
};

const Home = () => {
  const [userData, setData] = useState("Refresh data");
  const [temp] = useState(userData.split("^")[0]);
  const [bpm] = useState(userData.split("^")[1]);
  const [sp02] = useState(userData.split("^")[2]);

  return (
    <View style={style.greeting}>
      <Text
        style={{
          fontFamily: "NotoSerifJPSemiBold",
          fontSize: 20,
          marginTop: 50,
          includeFontPadding: false,
        }}
      >
        Welcome back,
      </Text>
      <Text
        style={{
          fontFamily: "NotoSerifJPSemiBold",
          fontSize: 32,
          marginTop: 0,
          includeFontPadding: false,
        }}
      >
        User
      </Text>
      <Text
        style={{
          fontFamily: "NotoSerifJPRegular",
          fontSize: 16,
          marginTop: 0,
          marginBottom: 40,
          includeFontPadding: false,
        }}
      >
        Make sure to get some sun!
      </Text>
      <View style={globalStyles.deviceContainer}>
        <Text
          style={{
            fontFamily: "NotoSerifJPRegular",
            fontSize: 16,
            marginTop: 0,
            marginBottom: 20,
          }}
        >
          Devices
        </Text>
        <View style={style.single}>
          <Device
            icon="head-outline"
            customStyle={{ flexGrow: 1 }}
            title={"Temperature"}
            data={
              userData.split("^")[1] == null
                ? "Refresh data"
                : userData.split("^")[1]
            }
            onPress={() => {}}
          />
        </View>
        <View style={style.single}>
          <Device
            icon="heart-outline"
            customStyle={{ flexGrow: 1 }}
            title={"BPM"}
            data={userData.split("^")[0]}
            onPress={() => {}}
          />
        </View>
        <View style={style.single}>
          <Device
            icon="lungs"
            customStyle={{ flexGrow: 1 }}
            title={"Sp02"}
            data={
              userData.split("^")[2] == null
                ? "Refresh data"
                : userData.split("^")[2]
            }
            onPress={() => {}}
          />
        </View>
        <Pressable
          onPress={() => {
            {
              console.log("Pressed");
            }
          }}
        >
          <Text style={style.addText}>Add a device</Text>
        </Pressable>
      </View>
      <View style={style.refresh}>
        <RefreshButton
          icon="refresh"
          onPress={() => {
            getDeviceData(setData);
          }}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  greeting: {
    flex: 1,
    backgroundColor: "white",
    padding: 32,
  },
  single: {
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
  },
  addText: {
    fontFamily: "NotoSerifJPRegular",
    color: "#888888",
    marginTop: 0,
  },
  refresh: {
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});

export default Home;
