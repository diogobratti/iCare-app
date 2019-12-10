// Main.js
import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import { Button } from 'react-native-elements';

export default class Main extends React.Component {
  state = { currentUser: null };

  handleSignOut = () => {

    firebase
      .auth()
      .signOut()
      .then(() => {
        // AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading')});
  };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <Button title="Sing Out" onPress={this.handleSignOut} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
