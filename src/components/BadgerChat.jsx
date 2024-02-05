import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen'
import BadgerConversionScreen from './screens/BadgerConversionScreen';
const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isguest, setIsguest] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [signupstate, setSignup] = useState(true);
  useEffect(() => {
    // hmm... maybe I should load the chatroom names here
    // setChatrooms(["Hello", "World"]) // for example purposes only!
    fetch("https://cs571.org/api/f23/hw9/chatrooms",{
      headers :{
        "X-CS571-ID" :"bid_559df600ea130b903026eab0bed1afb72f8bc4d6f009b0ec199db14b5069f582"
      }
    }).then(
      res => res.json()
    ).then(
      data => setChatrooms(data)
    )
  }, [isLoggedIn]);

  function handleLogin(username, password) {
    // hmm... maybe this is helpful!
    // setIsLoggedIn(true); // I should really do a fetch to login first!
    fetch("https://cs571.org/api/f23/hw9/login", {
      method: "POST",
      credentials : "include",
      headers:{
          "X-CS571-ID": "bid_559df600ea130b903026eab0bed1afb72f8bc4d6f009b0ec199db14b5069f582",
          "Content-Type": "application/json"
      },
      body : JSON.stringify({
          "username" : username,
          "password" : password
      })
    }).then(res => {
      if(res.status === 200){
        setIsLoggedIn(true);
        return res.json()
      }else{
        alert("The username or password is wrong, please try again!")
        return false
      }
    }).then(
      data =>{
        if(data){
          // console.log(username)
          // console.log(data.token)
          SecureStore.setItemAsync("token", data.token)
          SecureStore.setItemAsync("name", username)
        }
      }
    )
  }

  function handleSignup(username, password) {
    // hmm... maybe this is helpful!
    // setIsLoggedIn(true); // I should really do a fetch to register first!
    fetch("https://cs571.org/api/f23/hw9/register", {
      method: "POST",
      credentials : "include",
      headers:{
          "X-CS571-ID": "bid_559df600ea130b903026eab0bed1afb72f8bc4d6f009b0ec199db14b5069f582",
          "Content-Type": "application/json"
      },
      body : JSON.stringify({
          "username" : username,
          "password" : password
      })
    }).then(res => {
      if(res.status === 409){
        alert("The username already exists!")
        return false
      }else {
        alert("Sign up successfully!")
        setIsLoggedIn(true)
        return res.json()
      }
    }).then(
      data =>{
        if(data){
          SecureStore.setItemAsync("token", data.token)
          SecureStore.setItemAsync("name", username)
        }
      }
    )
  }

  if (isLoggedIn || isguest) {// if login or be guest, show the draw
  // if(true){
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} isguest={isguest}/>}
              </ChatDrawer.Screen>
            })
          }{
            isguest?
            <ChatDrawer.Screen key={"signup"} name={"signup"}>
            {(props) =><BadgerConversionScreen {...props} setIsLoggedIn={setIsLoggedIn} setIsguest={setIsguest} setIsRegistering={setIsRegistering}/>}
            </ChatDrawer.Screen>
            :
            <ChatDrawer.Screen key={"logout"} name={"logout"}>
            {(props) =><BadgerLogoutScreen {...props} setIsLoggedIn={setIsLoggedIn} setIsRegistering={setIsRegistering} setIsguest={setIsguest}/>}
            </ChatDrawer.Screen>
          }
          
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} signupstate={signupstate} setSignup={setSignup} setIsRegistering={setIsRegistering}isRegistering={isRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin}  setIsRegistering={setIsRegistering} setIsguest={setIsguest} />
  }
}