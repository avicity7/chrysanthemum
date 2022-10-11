import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { send, retrieve } from './utils/safePublish';
import {useState} from 'react';

function App() {
  const [userDataRetrieved, setUserData] = useState("");
  let userData = retrieve("0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8");

  userData.then(function(result) {
      setUserData(result);
  })

  return (
    <View style = {styles.container}>
      <Text>{userDataRetrieved}</Text>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

