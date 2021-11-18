import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Modal} from "react-native"
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import Comments from "../components/Comments";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            likes: 0,
            liked: false, //Valor inicial
            showModal: false  //al principio no se ve.           
        }
    }

//ACA VA UN COMPONENTDIDMOUNT, QUE PREGUNTA SI ESTA LIKEADO. Si el length es distinto de 0...
componentDidMount(){
    if (this.props.item){
        if (this.props.item.data.likes.length !== 0)
        this.setState ({
            likes: this.props.item.data.likes.length
         })
         //si hago log out, y luego logIn el posteo que likee va a aparecer para dislikear. 
         if (this.props.item.data.likes.includes(auth.currentUser.email)){
             this.setState({
                 liked: true
             })
         }
    }
}

//Metodo para likear un posteo
functionLike(){
    const likePost = db.collection("posts").doc(this.props.item.id);
    // Atomically add a new region to the "regions" array field.
    likePost.update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then (() => {
        this.setState({
            liked: true,
            likes: this.state.likes + 1 
        })
    })
}

//Metodo para deslikear un posteo
onDislike(){
    const likePost = db.collection("posts").doc(this.props.item.id);
    // Atomically add a new region to the "regions" array field.
    likePost.update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then (() => {
        this.setState({
            liked: false,
            likes: this.state.likes - 1 
        })
    })
}

//Muestra el modal: Al hacer clic en ver comentarios, hay que setear la propiedad en true
showModal(){
    this.setState({
        showModal: true
    })
}

//Cierra el modal
closeModal(){
    this.setState({
        showModal: false
    })
}

render (){
    console.log(this.props.item)
    //Usamos un if ternario. Si no esta likeado (!), podes likear. Si esta likeado, podes sacar el like. 
    return (
        <View style={styles.container}> 
             {/*Renderiza el posteo: */}  
             <Image style={styles.image} 
              source = {{uri: this.props.item.data.photo }}
             />      
             <Text style = {styles.textbold}> {this.props.item.data.owner}  </Text>
             <Text style = {styles.texto}> {this.props.item.data.description} </Text>
              <Text style = {styles.texto}>  {this.props.item.data.createdAt}  </Text>
              <Text style = {styles.texto}> Likes: {this.state.likes} </Text>

            {
               ! this.state.liked ?
            
             <TouchableOpacity style = {styles.button} onPress={() => this.functionLike()}>
                 <FontAwesome name='thumbs-up' size={30} color='#fff' />
                 <Text style = {styles.text1}> Like </Text>
             </TouchableOpacity>
            :
            <TouchableOpacity style = {styles.button} onPress={() => this.onDislike()}>
                 <FontAwesome name='ban' size={30} color='#fff' />
                 <Text style = {styles.text1}> Quitar Like </Text>
             </TouchableOpacity>
            }
            {this.state.showModal?(
                <>
                <TouchableOpacity style = {styles.button} onPress={()=>{this.closeModal()}}>
                <FontAwesome name='eye-slash' size={30} color='#fff' />
                    <Text style = {styles.text1}>Ocultar comentarios</Text>
                </TouchableOpacity>
            <Comments idPost = {this.props.item.id} comments = {this.props.item.data.comments}
            show = {()=>this.showModal()}
            /> </>):(
                <TouchableOpacity style = {styles.button} onPress={()=>{this.showModal()}}>
                    <FontAwesome name='comment' size={30} color='#fff' />
                    <Text style = {styles.text1}>Mostrar comentarios</Text>
                </TouchableOpacity>
            )}
        </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    button: {
        width: '30%',
        backgroundColor: "#d4e5e7",
        borderRadius: 10,
        width: 130,
        marginTop: 10,
        textAlign: "center",
        marginBottom: 12
        
    },
    text: {
        color: '#FFA400',
        fontSize: 20
    },
    text1: {
        color: '#2b74c8',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "sans-serif",
        fontWeight:'bold',
    }, 
    closeModal: {
        color: '#FFA400',
        fontSize: 20,
        textAlign: "center",
        alignItems: 'center'
    },
    modalView: {
        alignItems: 'center' 
    }, 
    image: {
        height: 200,
        width: 200
    },
    texto:{
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: "sans-serif",
    },
    texto1: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: "sans-serif",
        fontWeight: "bold"
    },
    textbold:{
        color: '#203edc',
        fontSize: 20,
        fontFamily: "sans-serif",
        fontWeight:'bold',
        textTransform: 'capitalize'
      },
})