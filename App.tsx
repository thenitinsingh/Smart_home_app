import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';

import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import Loginpage from './src/loginPage';
import Dashboard from './src/Dashboard';
import { NativeBaseProvider } from 'native-base';
import SignUp from './src/signupPage';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Stack } from '@react-navigation/stack'

import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './config';

// import { registerRootComponent } from 'expo';

// import { firebase } from './config';


const Stack = createStackNavigator();


function App() {
  const [initializing,setInitializing] = useState(true);
  const [user,setUser] = useState();

  function onAuthStateChanged(auth, user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user){
    return (
      <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen name="Login" component={Loginpage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Dashboard" component={Dashboard} /> 
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} /> 
    </Stack.Navigator>
  );

//   return (
// <NativeBaseProvider>
//     <NavigationContainer>
//     <Stack.Navigator screenOptions={{headerShown: false }}>
//       <Stack.Screen name="Login" component={Loginpage} />
//       <Stack.Screen name="SignUp" component={SignUp} />
//       <Stack.Screen name="Dashboard" component={Dashboard} /> 
//     </Stack.Navigator>
//     </NavigationContainer>
//     </NativeBaseProvider>
  // );

}

// export default App;

export default () => {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <App/>
    </NavigationContainer>
    </NativeBaseProvider>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     padding:8,
//     flex: 1,
//     backgroundColor: '#fff',

   
    
//   },
// });


/* <NativeBaseProvider> */
/* <View style={styles.container}>
      
      
      <Loginpage/>
      {<Signup/>}
      <ScrollView style = {styles.container}>
       
      
       <Dashboard/>
      </ScrollView>
      
     
      <StatusBar style="auto" />
    </View> */
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{headerShown: false }}>
//         <Stack.Screen name="Login" component={Loginpage} />
//         <Stack.Screen name="SignUp" component={Signup} />
//       </Stack.Navigator>
//     </NavigationContainer>
// </NativeBaseProvider>