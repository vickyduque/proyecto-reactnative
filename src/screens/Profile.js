import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  //Posteos
  componentDidMount() {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.displayName)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (docs) => {
          let postsAux = [];
          docs.forEach((doc) => {
            postsAux.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          this.setState({
            posts: postsAux,
          });
        } 
      )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textbold}>{auth.currentUser.displayName} </Text>
        <Text style={styles.text}> Mis datos: </Text>
        <Text style={styles.text2}> E-mail: </Text><Text style={styles.text1}>{auth.currentUser.email}</Text>
        <Text style={styles.text2}> Fecha del último ingreso: </Text><Text style={styles.text1}>{auth.currentUser.metadata.lastSignInTime} </Text>
        <Text style={styles.text2}> Número de publicaciones: </Text><Text style={styles.text1}>{this.state.posts.length}</Text>{" "}
        {/* Mostrar posteos */}
        <FlatList
          data={this.state.posts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item }) => 
          <React.Fragment>
          <Post item={item}></Post>
           {/* Borrar posteos */}



        </React.Fragment>
        }
        />
           {/* Cerrar Sesión */}
        <TouchableOpacity
          style={styles.button2}
          onPress={() => this.props.handleLogout()}
        >
          <Text style={styles.text}> Cerrar sesión </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
        marginBottom: 50,
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
    textbold:{
      color: '#203edc',
      fontSize: 40,
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