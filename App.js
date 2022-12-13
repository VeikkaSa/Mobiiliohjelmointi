import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorites from './Favorites';
import Search from './Search'
import DescriptionScreen from './Description';
import Home from './Home';
import LoginScreen from './LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="DescriptionScreen" component={DescriptionScreen} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Search" component={SearchStack} options={({route})=>({tabBarStyle: {display: getTabBarVisibility(route),
        backgroundColor:'#fff'}})}/>
    </Stack.Navigator>
  );
}

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  if (routeName == "DescriptionScreen") {
    return "none"
  } else {
  return "flex"
  }
}