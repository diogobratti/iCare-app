import React from 'react'
import firebase from 'react-native-firebase'

export default class apiDb extends React.Component {

    constructor(collection) {
        super();
        this.ref = firebase.firestore().collection(collection);
        //TODO adicionar tratamento caso a collection não exista
        //TODO como adicionar credenciais para "escrever" na base?
    }

    add(data) {
        this.ref.doc(data.id).set (data).
            // add(data).
            catch(error => this.setState({
                errorMessage: error
            }));
            
    }

    onSnapshot(action) {
        this.ref.onSnapshot(action);
            
    }




}
