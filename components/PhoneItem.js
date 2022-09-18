import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function PhoneItem(props) {
    return (
        <View style={{flexDirection: 'row', marginHorizontal: 20, marginVertical: 10,}}>
            <Text>{props.ddd} {props.number}</Text>
            <TouchableOpacity onPress={props.onDeletar} style={{marginHorizontal: 15}}>
                <Text style={{color:'red'}}>Deletar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onEditar}>
                <Text>Editar</Text>
            </TouchableOpacity>
        </View>
    )
}