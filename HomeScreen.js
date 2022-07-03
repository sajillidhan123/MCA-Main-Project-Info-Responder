// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
 
// Import React and Component
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
 
const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              color:'black',
              textAlign: 'center',
              marginBottom: 16,
            }}>
           Welcome to Chatbot
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
 
export default HomeScreen;
