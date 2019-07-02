// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'

export default class SignUp extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    handleSignUp = () => {
        console.log('handleSignUp')

        // firebase.auth()
        // .createUserWithEmailAndPassword(this.state.email, this.state.password)
        // .then(() => this.props.navigation.navigate('Main'))
        // .catch(error => this.setState({ errorMessage: error.message }))

        firebase.auth().
            createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                //adiciona atributos "adicionais"

            })
            .catch(error => this.setState({
                errorMessage: this.translateSignUpErrors(error)
            }));

    }

    translateSignUpErrors(error) {

        switch (error.code) {
            case 'auth/email-already-in-use	':
                message = "Endereço de email já cadastrado";
                break;
            case 'auth/invalid-email':
                message = "Endereço de email inválido";
                break;
            case 'auth/operation-not-allowed':
                message = "Erro Interno";
                break;
            case 'auth/weak-password':
                message = "A senha digitada é muito fraca";
                break;
            default:
                message: "Erro desconhecido" + error.code;
                break;
        }

        return message;
    }

    render() {
        return (
            <View style={styles.container}>

                <Text>Cadastre-se</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}

                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />

                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />

                <Button title="Cadastre-se" onPress={this.handleSignUp} />

                <Button
                    title="Já tem uma conta? Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})