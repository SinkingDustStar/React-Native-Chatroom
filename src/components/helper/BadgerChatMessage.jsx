import { Button, Text } from "react-native";
import BadgerCard from "./BadgerCard"
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

function BadgerChatMessage(props) {
    const [name, setName] = useState("")
    const dt = new Date(props.created);
    useEffect(() => {
        SecureStore.getItemAsync("name")
            .then(result => setName(result));
        // console.log(props.poster, name)
    }, [])  
    async function del(){
        let token = await SecureStore.getItemAsync("token");
        fetch(`https://cs571.org/api/f23/hw9/messages?id=${props.id}`,{
            method :"DELETE",
            headers:{
                "X-CS571-ID":"bid_559df600ea130b903026eab0bed1afb72f8bc4d6f009b0ec199db14b5069f582",
                "Authorization": "Bearer "+token
            }
        }).then(res=>{
            if(res.status === 200){
                alert("Successfully deleted!")
                props.setPage(1)
                props.setFresh(f => !f)
            }
        })
    }
    return <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
        <Text style={{fontSize: 28, fontWeight: 600}}>{props.title}</Text>
        <Text style={{fontSize: 12}}>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
        <Text></Text>
        <Text>{props.content}</Text> 
        {name === props.poster?  
        <Button title="Delete" onPress={()=>del()}>Delete</Button>
        :
        null
        }
    </BadgerCard>
}

export default BadgerChatMessage;