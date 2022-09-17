import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";
import base64 from "react-native-base64";

const key = "zUXqR6NBTi_o4T67gHjZDa9v1m5gtr1Di8PJfsV5jJfC";
const encodedKey = base64.encode(`apikey:${key}`);

const assistantInstance =
  "https://api.eu-de.assistant.watson.cloud.ibm.com/instances/<This is your own>/v1";

export default function Chatbot() {
  const [chatbot, setChatbot] = useState({});
  const [userchat, setUserchat] = useState([]);
  const [booleano, setBooleano] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  useEffect(() => {
    axios
      .post(
        `https://api.us-south.assistant.watson.cloud.ibm.com/instances/41d486a5-09a3-4609-9629-4de348993850/v1/workspaces/5a21c745-ec95-4e46-a1e2-41f23737b1e0/message?version=2018-09-20`,
        {
          input: { text: message }
        },
        {
          headers: {
            Authorization: `Basic ${encodedKey}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setChatMessage(res.data.output.text[0])
        setChatbot(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const sendMessage = () => {
    axios
      .post(
        `https://api.us-south.assistant.watson.cloud.ibm.com/instances/41d486a5-09a3-4609-9629-4de348993850/v1/workspaces/5a21c745-ec95-4e46-a1e2-41f23737b1e0/message?version=2018-09-20`,
        {
          input: { text: message }
        },
        {
          headers: {
            Authorization: `Basic ${encodedKey}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setChatMessage(res.data.output.text[0])
        console.log(`${res.data.output.text[0]}`)
        setChatbot(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.title}>{chatMessage}</Text>
      <TextInput placeholder="Mensagem pro Bot" style={styles.input} onChangeText={setMessage} value={message}/>
      <TouchableOpacity style={styles.button} onPress={() => {
        sendMessage()
        setMessage("")
        }}>
        <Text style={styles.buttonText}>Mandar Mensagem</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#FCFCFC",
  },
  title: {
    color: "#000",
    fontSize: 23,
    alignSelf: "center",
    marginTop: 50,
  },
  input: {
    backgroundColor: '#fff',
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginTop: 30,

    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 5,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 50
  },
  buttonText: {
    textAlign: 'center',
    marginTop: 30
}
});
