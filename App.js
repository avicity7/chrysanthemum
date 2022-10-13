import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./src/screens/Home"
import Services from "./src/screens/Services"
import Articles from "./src/screens/Articles"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator()

export default function App() {

  const [loaded] = useFonts({
    NotoSerifJPRegular: require('./assets/NotoSerifJP-Regular.otf'),
    NotoSerifJPSemiBold: require('./assets/NotoSerifJP-SemiBold.otf'),
    NotoSerifJPBold: require('./assets/NotoSerifJP-Bold.otf')
  });

  if (!loaded) {
    return null;
  }

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

          return <MaterialCommunityIcons name={iconName} size={30} color={color}  style = {{height:30}}/>
        },
        headerTitleAlign: "center",
        tabBarActiveTintColor:"#C383F4",
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontFamily: "NotoSerifJPRegular",
          fontSize:12
        },
        headerTitleStyle: {
          fontFamily: "NotoSerifJPBold",
        },
        
      })
      
      
      }

      
      >
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
