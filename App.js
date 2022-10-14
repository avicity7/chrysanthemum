import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import Articles from "./src/screens/Articles";
import Home from "./src/screens/Home";
import Services from "./src/screens/Services";

const Tab = createBottomTabNavigator();

export default function App() {
  const [loaded] = useFonts({
    NotoSerifJPRegular: require("./assets/NotoSerifJP-Regular.otf"),
    NotoSerifJPSemiBold: require("./assets/NotoSerifJP-SemiBold.otf"),
    NotoSerifJPBold: require("./assets/NotoSerifJP-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Services") {
              iconName = "pill";
            } else if (route.name === "Articles") {
              iconName = "post";
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={30}
                color={color}
                style={{ height: 30 }}
              />
            );
          },
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#C383F4",
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarLabelStyle: {
            fontFamily: "NotoSerifJPRegular",
            fontSize: 12,
          },
          headerTitleStyle: {
            fontFamily: "NotoSerifJPBold",
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={Home}></Tab.Screen>
        <Tab.Screen name="Services" component={Services}></Tab.Screen>
        <Tab.Screen name="Articles" component={Articles}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
