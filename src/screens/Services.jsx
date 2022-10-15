import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Storage from "react-native-storage";
import Button from "../components/Button";
import RefreshButton from "../components/RefreshButton";
import globalStyles from "../styles/global";

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,

  enableCache: true,
  sync: {
    // we'll talk about the details later.
  },
});

const decryptData = async (data, secretKey, setDecrypted) => {
  const apiURL = "http://13.212.100.69:5000";
  await fetch(apiURL + "/safePublish/decryptData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: data,
      secretKey: secretKey,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      let decryptedData = data.decrypted.split('BREAK');
      decryptedData.pop();
      const mappedDecryptedData = decryptedData.map((dt) => {
        const [temp,bpm,sp02] =
          dt.split("^");
        return {
          temp:temp,
          bpm:bpm,
          sp02:sp02
        };
      });
      console.log(mappedDecryptedData);
      setDecrypted(mappedDecryptedData);
    });
};

const getTransactions = async (
  wallet,
  setData,
  setDecrypted,
  userData,
  setModalVisible,
  modalVisible,
) => {
  const apiURL = "http://13.212.100.69:5000";
  await fetch(apiURL + "/safePublish/getTransactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userAddress: wallet,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      setData(data.transactions);
      storage
            .load({
              key: 'secretKey'
            })
            .then(ret => {  
              decryptData(data.transactions, ret, setDecrypted);
            })
            .catch(err => {
              // any exception including data not found
              // goes to catch()
              console.warn(err.message);
              switch (err.name) {
                case 'NotFoundError':
                  // TODO;
                  break;
                case 'ExpiredError':
                  // TODO
                  break;
              }
            });
    });
};

const sendTriage = async (wallet, setData, setModalVisible, modalVisible) => {
  setModalVisible(!modalVisible);
  const apiURL = "http://13.212.100.69:5000";
  await fetch(apiURL + "/safePublish/sendTriage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userAddress: wallet,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      setData(data.key);
      setModalVisible(!modalVisible);
      storage
            .load({
              key: 'secretKey'
            })
            .then(ret => {
              // found data goes to then()
              ret.push(data.key)
              storage.save({
                key: 'secretKey',
                data: ret,
                expires: null
              })
             console.log(ret)
            })
            .catch(err => {
              // any exception including data not found
              // goes to catch()
              console.warn(err.message);
              switch (err.name) {
                case 'NotFoundError':
                  storage.save({
                    key: 'secretKey',
                    data: [data.key],
                    expires: null
                  })
                  break;
                case 'ExpiredError':
                  // TODO
                  break;
              }
            });
    });
};

const HealthRecords = () => {
  var records = [];
  const [userData, setData] = useState("Health Records");
  const [decrypted, setDecrypted] = useState();
  return (
    <View style={style.container}>
      <View style={globalStyles.container}>
        {Array.isArray(decrypted) ? (
          <FlatList
            style={{ width: "100%" }}
            data={userData}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  pressed
                    ? globalStyles.containerPressed
                    : globalStyles.containerUnpressed,
                  ,
                  style.item,
                ]}
                onPress={() =>
                  navigation.navigate("Article", { article: item })
                }
              >
                <Text
                  style={{ fontSize: 18, fontFamily: "NotoSerifJPSemiBold" }}
                >
                  {item.topic}
                </Text>
                <View
                  style={{
                    marginTop: 8,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{ flexGrow: 1, fontFamily: "NotoSerifJPRegular" }}
                  >
                    {item.name}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        ) : (
          <Text
            style={{
              fontFamily: "NotoSerifJPRegular",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Select the refresh button below to fetch the latest articles.
          </Text>
        )}
      </View>
      <View style={style.refresh}>
        <RefreshButton
          icon="refresh"
          onPress={() => {
            //Load data
            storage
            .load({
              key: 'secretKey'
            })
            .then(ret => {
              getTransactions(
                "0x9e942960941140aeF9F08308227e5EB8969766F4",
                setData,setDecrypted,userData);
            })
            .catch(err => {
              // any exception including data not found
              // goes to catch()
              console.log(err.message);
              switch (err.name) {
                case 'NotFoundError':
                  // TODO;
                  break;
                case 'ExpiredError':
                  // TODO
                  break;
              }
            });
          }}
        />
      </View>
    </View>
  );
};

const ServicesScreen = ({ navigation }) => {
  const [userData, setData] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [triageModalVisible, setTriageModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [keys, addKey] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loaded] = useFonts({
    NotoSerifJPRegular: require("../../assets/NotoSerifJP-Regular.otf"),
    NotoSerifJPSemiBold: require("../../assets/NotoSerifJP-SemiBold.otf"),
    NotoSerifJPBold: require("../../assets/NotoSerifJP-Bold.otf"),
  });

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    if (hasPermission === null && updateModalVisible) {
      getBarCodeScannerPermissions();
    }
  }, []);

  if (!loaded) {
    return null;
  }

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    console.log(data);
    // TODO: Handle scanned data

    setUpdateModalVisible(!updateModalVisible);
  };

  return (
    <View style={style.header}>
      <Text
        style={{
          fontFamily: "NotoSerifJPSemiBold",
          fontSize: 32,
          marginTop: 50,
          marginBottom: 0,
        }}
      >
        Services
      </Text>
      <View style={globalStyles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={triageModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setTriageModalVisible(!triageModalVisible);
          }}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={{ fontFamily: "NotoSerifJPRegular" }}>
                {userData == "" ? (
                  "Loading..."
                ) : (
                  <QRCode value={userData} size={200} />
                )}
              </Text>
              <Pressable
                style={[style.button, style.buttonClose]}
                onPress={() => setTriageModalVisible(!triageModalVisible)}
              >
                <Text
                  style={{ fontFamily: "NotoSerifJPBold", color: "#FFFFFF" }}
                >
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={updateModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setUpdateModalVisible(!updateModalVisible);
          }}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={{ fontFamily: "NotoSerifJPRegular" }}>
                {hasPermission === false ? (
                  <Text>
                    You have denied access to the camera. To use this feature,
                    open Settings and enable Camera access for this app.
                  </Text>
                ) : (
                  <View style={style.barcodeView}>
                    <BarCodeScanner
                      onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                      }
                      style={StyleSheet.absoluteFillObject}
                    />
                  </View>
                )}
              </Text>
              <Pressable
                style={[style.button, style.buttonClose]}
                onPress={() => setUpdateModalVisible(!updateModalVisible)}
              >
                <Text
                  style={{ fontFamily: "NotoSerifJPBold", color: "#FFFFFF" }}
                >
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={style.single}>
          <Button
            icon="sort"
            style={{ flexGrow: 1 }}
            title={"Triage"}
            onPress={() => {
              setData("");
              sendTriage(
                "0x9e942960941140aeF9F08308227e5EB8969766F4",
                setData,
                setTriageModalVisible,
                triageModalVisible,
                setModalVisible,
                modalVisible
              );
            }}
          />
        </View>
        <View style={style.split}>
          <Button
            icon="archive-edit"
            style={[style.occupy, { marginRight: 8 }]}
            title={"Update Records"}
            onPress={() => {
              setUpdateModalVisible(!updateModalVisible);
            }}
          />
          <Button
            icon="archive-search"
            style={[style.occupy, { marginLeft: 8 }]}
            title={"View Records"}
            onPress={() => {
              navigation.navigate("Health Records");
            }}
          />
        </View>
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const Services = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="ServicesScreen">
        <Stack.Screen
          name="ServicesScreen"
          component={ServicesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Health Records"
          component={HealthRecords}
          options={{
            headerTitleStyle: {
              fontFamily: "NotoSerifJPSemiBold",
              color: "black",
            },
            headerBackTitle: "",
            headerTintColor: "#C383F4",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 32,
  },
  split: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 16,
  },
  occupy: {
    flexGrow: 1,
  },
  single: {
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
  },
  header: {
    flex: 1,
    backgroundColor: "white",
    padding: 32,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: "#E79090",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  refresh: {
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  barcodeView: {
    width: 200,
    height: 200,
  },
  item: {
    padding: 16,
    backgroundColor: "#F9F9F9",
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default Services;
