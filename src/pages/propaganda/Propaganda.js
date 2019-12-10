import React from 'react';

import { View, Text, TouchableOpacity, Platform } from "react-native";
import StylePropaganda from "../../styles/StylePropaganda";

import firebase from 'react-native-firebase';

//https://github.com/sbugert/react-native-admob
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded,
// } from 'react-native-admob';

export default class Propaganda extends React.PureComponent {

  render() {
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();


    const unitId =
      Platform.OS === 'ios'
        ? ''
        : '';
    return (
      <View style={StylePropaganda.propagandaContainer}>
        <TouchableOpacity
          //style={styles.productButton} 
          onPress={() => {
            this.props.navigation.navigate("VisualizarAnuncio");
          }}
        >
          <Text style={StylePropaganda.propagandaText}>Aqui vai uma propaganda!</Text>
        </TouchableOpacity>

        <Banner
          unitId={unitId}
          size={'SMART_BANNER'}
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
        />
        {/* <AdMobBanner
          adSize="banner"
          adUnitID="your-admob-unit-id"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        /> */}
      </View>
    );
  }
}