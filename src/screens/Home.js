import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { db } from '../firebase/config';
import Post from '../components/Post';


export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [], //Valor inicial
        }
    }

    //Aca van los posteos. Va a mostrar todos los posteos actualizados de mi coleccion de post. Seteamos al estado de post, todos los documentos existentes ahi. 
    componentDidMount(){
        db.collection("posts").orderBy("createdAt", "desc").onSnapshot(  //Obtenemos la coleccion de posteo. OnSnapshot detecta todos los cambios del posteo: tiempo real. 
         docs => {      //Devulve una coleccion de docs, que los vamos a pushear a un array auxiliar. 
             let postsAux = [ ]   //Variable auxiliar.
              docs.forEach (doc => {
                  postsAux.push({
                      id: doc.id,  //cada posteo tiene un id determinado. 
                      data: doc.data()   //toda la data de ese documento: cuando se creo, autor, contenido. Extrae todos los datos de ese documento.
                  })
                  this.setState({
                      posts: postsAux  //seteamos el estado con la variable auxiliar para que renderice. 
                  })
              })
             }
        )
     }

    render(){
        console.log(this.state.posts)
        return(
            <React.Fragment>
                
                <FlatList 
                data = {this.state.posts}
                keyExtractor = {post => post.id.toString()}  
                renderItem = { ({item}) => {
                    return <Post item = {item}> </Post> }
                    }
                 />

            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:"#f3f3f3"
    },
    button: {
        width: '30%',
        backgroundColor: "#d4e5e7",
        borderRadius: 10,
        width: 120,
        textAlign: "center",
        marginTop: 10,
        borderBottomColor: '2b74c8',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft: 377,
        marginTop: 50
    },
    text: {
        color: '#FFA400',
        fontSize: 20
    },
    text1:{
        color: '#2b74c8',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: "sans-serif",
        fontWeight:'bold',
    },
    
})