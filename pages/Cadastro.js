import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro (props) {

    const [boxIsChecked, setBoxIsChecked] = useState(false);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [date, setDate] = useState("");
    const [cellphoneNumber, setCellPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function print(){
      console.log(name)
      console.log(cpf)
      console.log(date)
      console.log(cellphoneNumber)
      console.log(email)
      console.log(password)
      console.log(confirmPassword)
      
    }

    async function saveData(){
      const novoId = await geraId()
      const usuario = {
        id: novoId.toString(),
        name: name,
        email: email,
        cpf: cpf,
        cellphoneNumber: cellphoneNumber
      }
      try{
        const jsonValue = JSON.stringify(usuario)
        await AsyncStorage.setItem(usuario.id, jsonValue)
        getData()
      }catch (e){
        console.log(e)
      }
    }

    async function getData(){
      try{
        const value = await AsyncStorage.getItem('1')
        if(value !== null){
          console.log(value)
        }
      } catch (e){
        console.log(e)
      }
    }

    async function geraId(){
      const todasChaves = await AsyncStorage.getAllKeys()
      if(todasChaves <= 0){
        return 1
      }
      return todasChaves.length + 1
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Cadastro</Text>
          <View style={{flexDirection: 'row', alignItems: 'baseline', marginLeft: 15}}>
            <Text style={styles.subtitle}>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
              <Text style={[styles.link, styles.a]}>Clique aqui para entrar</Text>
            </TouchableOpacity>
          </View>

          <View>
              <TextInput placeholder="Nome *" style={styles.input} onChangeText={setName} keyboardType='ascii-capable'/>
              <TextInput placeholder="CPF *" style={styles.input} onChangeText={setCpf} keyboardType='numeric'/>
              <TextInput placeholder="Data de nascimento (DD/ MM/AAAA) *" style={styles.input} onChangeText={setDate} keyboardType='number-pad'/>
              <TextInput placeholder="Telefone *" style={styles.input} onChangeText={setCellPhoneNumber} keyboardType='phone-pad'/>
              <TextInput placeholder="E-mail *" style={styles.input} onChangeText={setEmail}  keyboardType='email-address'/>
              <TextInput placeholder="Senha *" style={styles.input} onChangeText={setPassword} secureTextEntry={true}/>
              <TextInput placeholder="Confirmar senha *" style={styles.input} onChangeText={setConfirmPassword} secureTextEntry={true}/>
              <View style={styles.checkboxContainer}>
                  <Text style={styles.textCheckbox}>Aceito os </Text>
                  <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setBoxIsChecked(!boxIsChecked)}>
                    <Text style={styles.a}>termos de condições</Text>
                    <CheckBox
                    style={styles.checkbox}
                    value={boxIsChecked}
                    onValueChange={setBoxIsChecked}
                    color={boxIsChecked ? '#6A5ACD' : undefined}
                  />
                  </TouchableOpacity>
                  
              </View>
              <TouchableOpacity style={[styles.button, {backgroundColor: boxIsChecked ? '#6914FF' : '#A9A9A9'}]} disabled={!boxIsChecked} onPress={getData}>
                  <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 25,
    backgroundColor: '#FCFCFC',
    flexGrow: 1,
  },
  title: {
    fontSize: 23,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  a: {
    color: '#6A5ACD'
  },

  input: {
      backgroundColor: '#fff',
      marginVertical: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 15,

      shadowColor: "#000",
      shadowOffset: {
	    width: 0,
	    height: 5,
      },
      shadowOpacity: 0.04,
      shadowRadius: 10,
      elevation: 50
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  checkbox: {
    marginLeft: 12,
    marginRight: 10,
    borderColor: '#FCFCFC',
    width: 25,
    height: 25,
    backgroundColor: '#fff',
    shadowColor: "#000",
      shadowOffset: {
	    width: 0,
	    height: 5,
      },
      shadowOpacity: 0.04,
      shadowRadius: 10,
      elevation: 50
  },
  textCheckbox: {

  },
  button: {
      backgroundColor: '#6914FF',
      padding: 10,
      borderRadius: 15,
      marginTop: 15,
  },
  buttonText: {
      textAlign: 'center',
      color: '#fff'
  },
  link:{
    marginLeft: 5
  }
});
