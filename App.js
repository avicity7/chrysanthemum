import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./src/Home"
import Services from "./src/Services"
import Articles from "./src/Articles"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home"
          } else if (route.name === "Services") {
            iconName = "pill"
          } else if (route.name === "Articles") {
            iconName = "post"
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />
        }
      })}>
        <Tab.Screen name="Home" component={Home}></Tab.Screen>
        <Tab.Screen name="Services" component={Services}></Tab.Screen>
        <Tab.Screen name="Articles" component={Articles}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
