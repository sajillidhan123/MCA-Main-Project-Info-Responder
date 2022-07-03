// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
 
// Import React
import React from 'react';
 
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
 
// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import Chatbot from '/Users/hp/Desktop/features/fid1/feature/Chatbot';
import voicetest from '/Users/hp/Desktop/features/fid1/feature/voicetest'



 
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
 
const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Chatbot">
      <Stack.Screen
        name="Chatbot"
        component={Chatbot}
        options={{
          title: 'Chatbot', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
 



 


const SettingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};
 
const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator

      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: '#d8d8d8'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{drawerLabel: 'Chatbot'}}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="SettingScreenStack"
        options={{drawerLabel: 'Settings'}}
        component={SettingScreenStack}
      />

        <Drawer.Screen
        name="voicetest"
        options={{drawerLabel: 'voicetest'}}
        component={voicetest}
      />

    </Drawer.Navigator>
  );
};
 
export default DrawerNavigatorRoutes;
