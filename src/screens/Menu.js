import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Finder from './Finder';
import Home from './Home';
import { auth } from '../firebase/config';
import CreatePost from './CreatePost';

export default class Menu extends Component{ //Cuando se monta el componente...
    constructor(props){ //Seteamos un estado.
        super(props);
        this.state = { //El estado tiene dos propiedades.
            loggedIn: false,
            error: null,
        }
    }

     //Metodo para que recuerde al usuario cada vez que se recarga la pagina
     componentDidMount(){ //El componentDidMount se ejecuta en el momento en el que se renderiza menu. 
        auth.onAuthStateChanged ( user => { //auth sirve para autenticar.
            if (user) {
                this.setState ({  //Si hay un usuario logueado, queremos que sea true. 
                    loggedIn: true
                })
            }
        })
    }

    //Funcion de Login. Es una promesa, necesita tener un then y catch
    handleLogin(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then( response => { //Si sale todo bien...
            console.log(response);
            alert("Usuario loggeado!");
            this.setState({
                loggedIn: true
            })
        })
        .catch( response => { //Si algo sale mal...
            console.log(response);
            alert("Error en el loggueo");
            this.setState({
                error: "Error en loggueo"
            })
        })
    }
    
    //Funcion de Registro
    handleRegister(email, password, username) {
        auth.createUserWithEmailAndPassword(email, password) //Creamos el usuario con email y password, los dos requisitos.
        .then( response => { //Una vez que se registró y salió todo bien...
            console.log(response);
            alert("Usuario registrado!"); // Se registra correctamente el usuario.
              response.user.updateProfile({    // Agarrar el username y meterselo al usuario, que se actualice.  
                 //Con el updateProfile lo que hacemos es agregarle el nombre de usuario al displayName (propiedad propia del user).
                displayName: username      //username que recibe por parametro desde el componente register.
              })  
            this.setState({
                loggedIn: true      //creamos el usuario, queda la sesion iniciada
            })
        })
        .catch( error => {
            console.log(error);
            this.setState({
                error: error
            })
        })
    }

    //Meotodo para cerrar sesion
    handleLogout(){
        auth.signOut()
        .then(()=> {
            this.setState({
                loggedIn: false
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        const Drawer = createDrawerNavigator();
    
        return(
            <NavigationContainer>
                    <Drawer.Navigator>
                       {this.state.loggedIn === true ? 

                        <React.Fragment>
                        <Drawer.Screen name = "Inicio">
                            {props => <Home {...props} />}
                        </Drawer.Screen>

                        <Drawer.Screen name= "Crear Posteo"> 
                        {props => <CreatePost {...props} /> }

                        </Drawer.Screen>

                        <Drawer.Screen name= "Tu Perfil"> 
                        {props => <Profile {...props} handleLogout={()=>this.handleLogout()}/> }

                        </Drawer.Screen>

                        <Drawer.Screen name= "Buscador"> 
                        {props => <Finder {...props} /> }

                        </Drawer.Screen>
                        
                        </React.Fragment>
                        : 
                        <React.Fragment>

                            <Drawer.Screen name="Iniciar sesión">
                                {props => <Login {...props} handleLogin={(email, password)=>this.handleLogin(email, password)}/>}
                            </Drawer.Screen>  

                            <Drawer.Screen name = "Registrarse">
                                {props => <Register {...props} handleRegister={(email, password, username)=>this.handleRegister(email, password, username) } error= {this.state.error} />}
                            </Drawer.Screen>

                        </React.Fragment>
                    }  
                    
                    </Drawer.Navigator>
                </NavigationContainer>
            )
        }
}