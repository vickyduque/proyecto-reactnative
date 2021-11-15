import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

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

// handleRemove(){

//}

  render() {
    return (
      <View style={styles.container}>
        <Text>Usuario: {auth.currentUser.displayName}</Text>
        <Text>E-mail: {auth.currentUser.email}</Text>
        <Text>
          Fecha del ultimo ingreso: {auth.currentUser.metadata.lastSignInTime}
        </Text>
        <Text>Publicaciones: {this.state.posts.length}</Text>{" "}
        {/* Mostrar posteos */}
        <FlatList
          data={this.state.posts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item }) => 
          <React.Fragment>
          <Post item={item}></Post>
          <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.handleRemove()}
        >
          <Text style={styles.text}> Borrar post </Text>
        </TouchableOpacity>
        </React.Fragment>
        }
        />
        <TouchableOpacity
          style={styles.button}
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
        height: 80,
        backgroundColor: "#d4e5e7",
        borderRadius: 10,
        width: 90,
        marginBottom: 50,
        borderBottomColor: '2b74c8',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 20
    },
    text: {
        color: '#2b74c8',
        fontSize: 26,
        fontFamily: "sans-serif",
        fontWeight:'bold',
        marginBottom: 50,
        width: 100

    },
    text1:{
        color: '#2b74c8',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "sans-serif",
        fontWeight:'bold',
    }
})