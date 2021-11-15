import React, { Component } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image} from "react-native";
import { auth, db } from "../firebase/config";
import MyCamera from '../components/MyCamera';


export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",   //Al principio la descripcion esta vacia. 
            showCamera: true,
            photo: "",
        }
    }

//Colecciones 
handlePost(){
    db.collection("posts").add({
        owner: auth.currentUser.displayName, //DisplayName es para el username
        description: this.state.comment,
        email: auth.currentUser.email,
        createdAt: new Date().toLocaleString(),
        likes: [],      //array de likes vacio
        comments: [],
        photo: this.state.photo //Esto me guarda la url de la foto.
    })
    .then(response => {
        console.log(response);
        alert("Posteo hecho con exito");
        this.setState({
            comment: ""   //Para que la descripcion vuelva a estar vacia una vez hecho el posteo. 
        }) 
        console.log(this.props);
        this.props.navigation.navigate("Home");  //Queremos navegar a Home automaticamente. 
    })
    .catch(error => {
        console.log(error)
        alert("Hubo un error");
    })
}

// Metodo para guardar la foto y mostrarla.
guardarFoto(url){
    this.setState({
        photo: url, //Url que me permite acceder a la foto
        showCamera: false
    })
}

render() {
    return (
        <>
          {this.state.showCamera ?
          <MyCamera savePhoto = {(url) => this.guardarFoto(url)}/>
          :
          <>
        
        <View style={styles.container}>
            
        <Image
           source= { {uri: this.state.photo} }
           style = {styles.imagen}
        />
          
            <TextInput
                    style={styles.field}
                    keyboardType= "default"
                    placeholder="What are you thinking?"
                    multiline={true}
                    numberOfLines = {4}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}  //para que se vaya actualizando el valor del comment. 

                />
                <TouchableOpacity style = {styles.button} onPress={() => this.handlePost()}>
                    <Text style = {styles.text1}>  Post  </Text>
                </TouchableOpacity>
            </View>
            </>
             }
             </>
     )
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    field: {
        width: '80%',
        backgroundColor: "#d0dfed",
        color: 'black',
        padding: 10,
        marginVertical: 10,
        marginTop: 50,
        borderRadius: 8
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
        color: '#FFA400',
        fontSize: 20
    },
     text1:{
        color: '#2b74c8',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "sans-serif",
        fontWeight:'bold',
    },
    imagen: {
        height: 300,
        width: "90%"

    }
})