import { useEffect, useState } from "react";
import { StyleSheet, Text, View , ScrollView, Button, Pressable, Modal, TextInput, KeyboardAvoidingView } from "react-native";
import BadgerChatMessage from "../helper/BadgerChatMessage";
import * as SecureStore from 'expo-secure-store';

function BadgerChatroomScreen(props) {
    const [posts, setPost] = useState([])
    const [page, setPage] = useState(1)
    const [showmodal, setShowmodal] = useState(false)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [fresh, setFresh] = useState(true)
    async function makePost() {
        let token = await SecureStore.getItemAsync("token");
        console.log(token)
        fetch(`https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}`,{
            method: "POST",
            headers:{
                "X-CS571-ID":"bid_559df600ea130b903026eab0bed1afb72f8bc4d6f009b0ec199db14b5069f582",
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "title" : title,
                "content" : body
            })
        }).then(res =>{
            if(res.status != 200){
                alert("You must be logged in to do that!")
            }else{
                alert("Successfully posted!")
                setPage(1)
                setShowmodal(false)
                setFresh(f => !f)
                setTitle("")
                setBody("")
            }
        })
    }       
    
    useEffect(()=>{
        fetch(`https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}&page=${page}`,{
            headers:{
                "X-CS571-ID":"bid_559df600ea130b903026eab0bed1afb72f8bc4d6f009b0ec199db14b5069f582"
            }
        }).then(res =>res.json())
        .then(data =>{
            setPost(data.messages)
            // console.log(data.messages[0])
        })
    },[page, fresh])

    return <View style={{ flex: 1 }}>
        {posts.length?
            <ScrollView >
                {posts.map(post =>    
                    <BadgerChatMessage  key={post.id} {...post} setPage={setPage} setFresh={setFresh}/>   
                )}
            </ScrollView>
        :
        <Text>There's nothing here!</Text>
        }
        <View  style={styles.button}> 
            <Text>you are on page {page} of 4</Text>
        </View>
        <View  style={styles.button}> 
            <Button title="previous" disabled={page === 1} onPress={()=>setPage(page => page-1)}></Button>
            <Button title="next" disabled={page === 4} onPress={()=>setPage(page => page+1)}></Button>
        </View>
        {props.isguest?null:
        <View  style={styles.button}> 
            <Button title="add post" color="red" onPress={()=>{setShowmodal(true)}}></Button>
        </View>}
        <Modal 
          animationType="slide"
        //   transparent={true}
          visible={showmodal}
          presentationStyle={"pageSheet"}
          onDismiss={()=>{setShowmodal(false)}}
          onRequestClose={()=>{setShowmodal(false)}}
          >  
          <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
            <Text style={{fontWeight: 'bold',fontSize: 18}}>Create a Post</Text>
            <Text>Title</Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={text => setTitle(text)}
                value={title}
            />
            <Text>Body</Text>
            <TextInput 
                style={styles.textBody}
                onChangeText={text => setBody(text)}
                value={body}
                multiline
            />
            <View  style={styles.button}>          
                <Button title="create post" onPress={()=>makePost()}/>
                <Button title="cancel" onPress={()=>{setShowmodal(false)}}/>
            </View>
        </KeyboardAvoidingView>
        </Modal>
    </View>
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
    textInput: {
        height: 35,
        width: 200,
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 4,
    },
    textBody: {
        height: 200,
        width: 200,
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 4,
        textAlign: 'left',
        textAlignVertical: 'top',
    }
});

export default BadgerChatroomScreen;