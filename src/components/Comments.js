import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput} from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  } 

  onComment() {
    const posteoActualizar = db.collection("posts").doc(this.props.idPost);

    if(this.state.comment == ""){
        alert('Por favor, escribí un comentario.')
    } else {
        posteoActualizar.update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            id: Date.now(),
            email: auth.currentUser.email,
            owner: auth.currentUser.displayName,
            comment: this.state.comment,
          }),
        })
        .then(() => {
            this.props.show()
          this.setState({
            comment: "",
          });
        });
    }
  } 
  
 

  render() {
    return (
      <View style={styles.modalView}>
        {this.props.comments.length != 0 ? (
          <FlatList
            data={this.props.comments}
            keyExtractor={(comment) => comment.id}
            renderItem={({ item }) => (
              <>
                <Text>
                  {item.owner}: {item.comment}
                </Text>
              </>
            )}
          /> ) : (
          <Text>Aún no hay comentarios. Sé el primero en opinar.</Text>
        )}
        <TextInput style={styles.textinput}
          keyboardType="default"
          placeholder="Dejá un comentario"
          multiline={true}
          numberOfLines={2}
          onChangeText={(text) => this.setState({ comment: text })}
          value={this.state.comment}
        />
        <TouchableOpacity style={styles.btn} onPress={() => this.onComment()}>
          <Text style={styles.text}> Comentar </Text>
        </TouchableOpacity>
      </View>
    );
  } 
} 

const styles = StyleSheet.create({
  image: {
    height: 200,
  },
  container: {
    flex: 1,
    width: "60%",
    justifyContent: "center",
    padding: 10,
    margin: "auto",
    marginTop: 15,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "rgba(0, 0, 0, 0.247)",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  btn: {
    backgroundColor: '#2b74c8',

    padding: 7,
    marginTop: 5,
    borderRadius: 15,
  },
  closeModal: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#dc3545",
    marginTop: 2,
    marginBotom: 10,
    borderRadius: 4,
  },
  modalText: {
    fontWeight: "bold",
    color: "#fff",
  },
  modalView: {
    backgroundColor: "#d4e5e7",
    borderRadius: 10,
  },
  modal: {
    border: "none",
  },
  textinput: {
    marginTop: 6,
    textAlign: "center"
  }
}); 