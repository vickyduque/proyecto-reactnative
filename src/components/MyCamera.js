import {Camera} from "expo-camera";
import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native"
import { storage } from "../firebase/config";


export default class MyCamera extends React.Component {
    constructor(props) {
        super(props);
        this.camera;
        this.state = {
           photo: "",  //Al principio es vacios
           permission: false
        }
    }

//Permiso de la camara 
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(response => {
            this.setState({
                permission: response.granted
            })
        })
    }

 // Metodo para sacar la foto
    takePicture(){
        if(!this.camera) return ;
        this.camera.takePictureAsync()
        .then(photo => {
            console.log(photo)
            this.setState({
                photo: photo.uri //Es una uri interna temporal de la foto. Tiene todo el contenido de la foto.
            })
        })
    }

// Metodo para subir la foto
    uploadImage(){
        fetch(this.state.photo) //tomamos le contenido interno de la foto.
        .then(response => response.blob())
        .then(image => {
            const direction = storage.ref(`camera/${Date.now()}.jpg` )
            direction.put(image)
            .then(()=> {
                direction.getDownloadURL()   //Obtenemos la url publica
                .then (url => {
                    this.setState({
                        photo:"", 
                    })
                    this.props.savePhoto(url);
                })
            })
        })
    }


// Metodo para rechazar la foto
    onReject(){
        this.setState({
            photo:"",
        })
    }

    render(){
        return(
            <View style={styles.container}> 
            {
            this.state.photo ? 
                <> 
            <Image style={styles.preview}
               source={ {uri:this.state.photo} } />

            <View style={styles.container} >
              <TouchableOpacity 
                 style={styles.reject} 
                 onPress={() => this.onReject() }> 
                    <Text style={styles.text} > Cancelar </Text>
              </TouchableOpacity>

             <TouchableOpacity 
                 style={styles.accept} 
                 onPress={()=> this.uploadImage() }> 
                 <Text style={styles.text} > Subir </Text>
             </TouchableOpacity>
            </View>
                </> 
            :
            <>
            <Camera
            style={styles.camera}
            type= {Camera.Constants.Type.front || Camera.Constants.Type.back} // || significa or
            ref= {referencia => this.camera = referencia}
            />

         
                <TouchableOpacity
                style={styles.button}
                onPress={() => this.takePicture()}>
                    <Text style = {styles.text1}> Sacar foto </Text>
                </TouchableOpacity>
            
             </>
           
            }
            </View>
            
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: "100%"
    },
    camera: {
        flex: 1,
        width: "100%",
    },
    preview: {
        width: '100%',
        height: 450
    },
    text1: {
        color: '#2b74c8',
        fontSize: 24,
        textAlign: 'center',
        fontFamily: "sans-serif",
        fontWeight:'bold',
        backgroundColor: "#d4e5e7",
        borderRadius: 10,
        width: 150,
        marginTop: 10,
    }, 
    text: {
        color: '#2b74c8',
        fontSize: 24,
        textAlign: 'center',
        fontFamily: "sans-serif",
        fontWeight:'bold',
        backgroundColor: "#d4e5e7",
        borderRadius: 10,
        width: 150,
        marginTop: 10,
    }, 
})