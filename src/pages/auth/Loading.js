// Loading.js
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

import firebase from 'react-native-firebase';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem('userToken');
    const currentUser = firebase.auth().currentUser;

    if (currentUser == null) {
      this.props.navigation.navigate("Login");
    } else {
      await firebase
        .firestore()
        .collection("anuncios")
        .where("uid", "==", currentUser.uid)
        .get()
        .then(data => {
          this.setState({ cadastroCompleto: !data.empty });
          // console.log(!data.empty);
        });

      this.props.navigation.navigate(
        this.state.cadastroCompleto ? "App" : "NewUser"
      );

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
      // this.props.navigation.navigate(currentUser ? 'App' : 'Auth');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
        <ActivityIndicator size="large" />
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
