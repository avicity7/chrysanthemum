import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Card from "../components/Card";
import Device from "../components/Device";
import RefreshButton from "../components/RefreshButton";
import globalStyles from "../styles/global";

const getTransactions = async (
  wallet,
  setData,
  setModalVisible,
  modalVisible
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
      // console.log(data.transactions);
      const articles = data.transactions.map((article) => {
        const [discipline, id, topic, name, credentials, body] =
          article.split("^");
        return {
          discipline: discipline,
          id: id,
          topic: topic,
          name: name,
          credentials: credentials,
          body: body,
        };
      });
      setData(articles);
    });
};

const ArticleDetailView = ({ route }) => {
  const { article } = route.params;
  const [body, setBody] = useState(article.body);

  const [loaded] = useFonts({
    NotoSerifJPRegular: require("../../assets/NotoSerifJP-Regular.otf"),
    NotoSerifJPSemiBold: require("../../assets/NotoSerifJP-SemiBold.otf"),
    NotoSerifJPBold: require("../../assets/NotoSerifJP-Bold.otf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View style={[globalStyles.container, { justifyContent: "flex-start" }]}>
      <ScrollView>
        <Text style={{ fontFamily: "NotoSerifJPRegular", fontSize: 16 }}>
          {body}
        </Text>
      </ScrollView>
    </View>
  );
};

const ArticlesView = ({ navigation }) => {
  const [userData, setData] = useState("Refresh Data");

  const [loaded] = useFonts({
    NotoSerifJPRegular: require("../../assets/NotoSerifJP-Regular.otf"),
    NotoSerifJPSemiBold: require("../../assets/NotoSerifJP-SemiBold.otf"),
    NotoSerifJPBold: require("../../assets/NotoSerifJP-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

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
        Articles
      </Text>
      <View style={globalStyles.container}>
        {Array.isArray(userData) ? (
          <FlatList
            style={{ width: "100%" }}
            data={userData}
            keyExtractor={(item) => item.id + item.discipline}
            renderItem={({ item }) => (
              <Pressable
                style={style.item}
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
                  <Text style={{ fontFamily: "NotoSerifJPRegular" }}>
                    {item.id}
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
            getTransactions(
              "0xB69d024d1DCc50d3019Fd939746b565873009AEC",
              setData
            );
          }}
        />
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const Articles = () => {
  const [loaded] = useFonts({
    NotoSerifJPRegular: require("../../assets/NotoSerifJP-Regular.otf"),
    NotoSerifJPSemiBold: require("../../assets/NotoSerifJP-SemiBold.otf"),
    NotoSerifJPBold: require("../../assets/NotoSerifJP-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="ServicesScreen">
        <Stack.Screen
          name="Articles"
          component={ArticlesView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Article"
          component={ArticleDetailView}
          options={{ headerBackTitle: "", headerTintColor: "#C383F4" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const style = StyleSheet.create({
  header: {
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
  item: {
    padding: 16,
    backgroundColor: "#F9F9F9",
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default Articles;
