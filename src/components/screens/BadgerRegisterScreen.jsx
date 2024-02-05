import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useEffect, useState } from "react";
function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [r_password, setR_Password] = useState();
    //
    const [correctusername, setCorrectusername] = useState(true)
    const [onlyspace, setOnlyspace] = useState(false)
    const [correctpass, setCorrectpass] = useState(true)
    const [samepass, setSamepass] = useState(true);
    useEffect(() =>{
        setCorrectusername(true);
        setCorrectpass(true);
        setSamepass(true);}
        ,[props.isRegistering])
    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
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
        <Text style={styles.paragraph}>confirm password</Text>
        <TextInput 
            style={styles.textInput}
            // clearTextOnFocus
            onChangeText={text => setR_Password(text)}
            secureTextEntry = {true}
            value={r_password}
        />
        {!correctusername?
            <Text style={{color:"crimson"}}>Please enter a username</Text>
            :
        onlyspace?
            <Text style={{color:"crimson"}}>username cannot only consist of space</Text>
            :
        !correctpass?
            <Text style={{color:"crimson"}}>Please enter a password</Text>
            :
        !samepass?
            <Text style={{color:"crimson"}}>Passwords do not match</Text>
            :
        !props.signupstate?
        <Text style={{color:"crimson"}}>The username has been used.</Text>
        :
        null
        }
        <Button color="crimson" title="Signup" onPress={() => {
            // console.log(username)
            // console.log(1)
            // console.log(password)
            // console.log(r_password !=password)
            if(username === ""){
                setCorrectusername(false)
            }else if(/^\s*$/.test(username)){
                setCorrectusername(true)
                setOnlyspace(true)
            }else if(password == ""){
                setCorrectusername(true)
                setOnlyspace(false)
                setCorrectpass(false)
            }else if(password != r_password){
                setCorrectusername(true)
                setOnlyspace(false)
                setCorrectpass(true)
                setSamepass(false)
            }else{
                setCorrectusername(true)
                setOnlyspace(false)
                setCorrectpass(true)
                setSamepass(true)
                props.handleSignup(username, password)
            }
        }} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
    </View>;
}

const styles = StyleSheet.create({
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

export default BadgerRegisterScreen;