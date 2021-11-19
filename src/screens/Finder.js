import React, { Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, FlatList, Text, Image } from "react-native";
import {db} from '../firebase/config';
import Post from '../components/Post';


export default class Finder extends Component{
    constructor(props){
        super(props)
        this.state = {
            buscador: '',
            posts: [],
        }
    }

    buscar(text){
        this.setState({
            buscador: text,
            posts: []
        })
        db.collection('posts').orderBy("createdAt", "desc")
        .where('email','==',text)
        .onSnapshot(
            docs => {
                let posts = []
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                // console.log(posts);
                this.setState({
                    posts: posts,
                })
            }
        )
    }

    render(){
        return(
            <React.Fragment>
                <TextInput 
                style={styles.field}
                placeholder="Ingrese un Mail para buscar"
                onChangeText={text => this.buscar(text)}
                />
              {this.state.buscador === "" && null}
               {this.state.posts.length == 0 && this.state.buscador !== "" ?
               <Text style = {styles.texto4}> El usuario no existe o no tiene ninguna publicación</Text> :
               <FlatList 
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()}  
                renderItem = { ({item}) => {
                    return <Post item = {item}> </Post> }
                    }
                 />
            
            }
               
               </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    field: {
        backgroundColor: "#d0dfed",
        borderRadius: 10,
        height: 20,
        width: 220,
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20
    },

    imagen:{
        height: 200,
        width: 200,
        marginBottom: 10,
    },
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor:"#f3f3f3",
            padding: 10,
            justifyContent: "center",
        },
        button: {
          backgroundColor: "#d4e5e7",
          borderRadius: 10,
          width: 130,
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto"
          
      },
        button1: {
          height: 33,
          backgroundColor: "#d4e5e7",
          borderRadius: 10,
          width: 70,
          marginBottom: 10,
          marginTop: 10,
          textAlign: "center",
        },
        button2: {
          backgroundColor: "#d4e5e7",
          borderRadius: 10,
          width: 130,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 40,
          textAlign: "center",
        },
        texto: {
          color: '#2b74c8',
            fontSize: 14,
            fontFamily: "sans-serif",
            marginBottom: 5,
            fontWeight:'bold',
            textAlign: "center",
    
        },
        text: {
            color: '#2b74c8',
            fontSize: 21,
            fontFamily: "sans-serif",
            fontWeight:'bold',
        },
        text1:{
            color: 'black',
            fontSize: 15,
            textAlign: 'center',
            fontFamily: "sans-serif",
        },
        text2: {
          color: '#2b74c8',
          fontSize: 15,
          fontFamily: "sans-serif",
          fontWeight:'bold',
      },
      text3: {
        color: '#2b74c8',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "sans-serif",
        fontWeight:'bold',
    }, 
    texto4: {
        fontSize: 14,
        fontFamily: "sans-serif",
        marginTop: 10,
        marginBottom: 5,
        textAlign: "center",

    },
        textbold:{
          color: '#203edc',
          fontSize: 20,
          fontFamily: "sans-serif",
          fontWeight:'bold',
          textTransform: 'capitalize'
        },
        titulo: {
          color: '#2b74c8',
          fontSize: 26,
          fontFamily: "sans-serif",
          fontWeight:'bold',
          marginBottom: 15,
          marginTop: 40
        }
    })
