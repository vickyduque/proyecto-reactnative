import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: ""
        }
    }


    //Validacion: preguntamos que no venga vacio, si no esta vacio ejecutamos la funcion que viene del padre (menu)
    onRegister(){
        if (this.state.email !== "" && this.state.password !== "" && this.state.username !== ""){
            this.props.handleRegister(this.state.email, this.state.password, this.state.username)
        }
        else {
            console.log("Completar los campos!")
        }
    }

    render() {
        console.log(this.props.error);
        return (
            <View style={styles.container}>
                <Text style={styles.text}>¡Registrate!</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                />

                <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="username"
                    onChangeText={text => this.setState({ username: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />

                {this.props.error ? <Text> {this.props.error.message} </Text>
                :
                null
                }
         
                <TouchableOpacity style = {styles.button} onPress={() => this.onRegister()}>
                    <Text style = {styles.text1}> Registrarse </Text>
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
        width: 130,
        marginTop: 10,
        textAlign: "center",
        borderBottomColor: '2b74c8',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text: {
        color: '#2b74c8',
        fontSize: 26,
        fontFamily: "sans-serif",
        fontWeight:'bold',
        marginBottom: 15,
        marginTop: 60,
        textAlign: "center"
    },
    text1:{
        color: '#2b74c8',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "sans-serif",
        fontWeight:'bold',
    
    }

})