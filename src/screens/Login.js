import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }


    render() {
        console.log(this.state.loggedIn);
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Iniciar Sesión </Text>
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='number-pad'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                <TouchableOpacity style = {styles.button} onPress={() => this.props.handleLogin(this.state.email, this.state.password)}>
                    <Text style = {styles.text1}> Entrar </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:"#f3f3f3"
    },
    field: {
        width: '80%',
        backgroundColor: "#d0dfed",
        color: 'black',
        padding: 10,
        marginVertical: 10,
        borderRadius: 15
    },
    button: {
        width: '30%',
        backgroundColor: "#d4e5e7",
        borderRadius: 10,
        width: 120,
        marginTop: 10,
        borderBottomColor: '2b74c8',
        borderBottomWidth: StyleSheet.hairlineWidth,
  
    },
    text: {
        color: '#2b74c8',
        fontSize: 26,
        fontFamily: "sans-serif",
        fontWeight:'bold',
        marginBottom: 15,
        marginTop: 60

    },
    text1:{
        color: '#2b74c8',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "sans-serif",
        fontWeight:'bold',
    }
})