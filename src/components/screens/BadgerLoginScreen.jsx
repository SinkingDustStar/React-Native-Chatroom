import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

//refer: https://snack.expo.dev/@ctnelson1997/secure-store
function BadgerLoginScreen(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        {/* <Text>Hmmm... I should add inputs here!</Text> */}
        <Text style={styles.paragraph}>username</Text>
        <TextInput 
            style={styles.textInput}
            // clearTextOnFocus
            onChangeText={text => setUsername(text)}
            value={username}
        />
        <Text style={styles.paragraph}>password</Text>
        <TextInput 
            style={styles.textInput}
            // clearTextOnFocus
            onChangeText={text => setPassword(text)}
            secureTextEntry = {true}
            value={password}
        />
        <Button color="crimson" title="Login" onPress={() => {
            // Alert.alert("Hmmm.. .", "I should check the user's credentials first!");
            props.handleLogin(username, password)
        }} />
        <Text>New here?</Text>
        <View  style={styles.button}>
            <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
            <Button color="grey" title="Continue as guest" onPress={() => props.setIsguest(true)} />
         </View>
    </View>;
}

const styles = StyleSheet.create({
    button:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        marginTop: 10,
        margin: 10,
        fontSize: 18,
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    textInput: {
        height: 35,
        width: 150,
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 4,
    }
});

export default BadgerLoginScreen;