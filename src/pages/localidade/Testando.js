/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

type Props = {};
type State = {
  storedNumber: string,
  needRestart: boolean,
};
export default class GetSet extends Component<Props, State> {
  state = {
    storedNumber: '',
    needRestart: false,
  };

  async componentDidMount() {
    const storedNumber = await AsyncStorage.getItem('estado');
    if (storedNumber) {
      this.setState({
        storedNumber,
      });
    }
  }

  increaseByTen = async () => {
    const {storedNumber} = this.state;

    const newNumber = 21321;

    await AsyncStorage.setItem('estado', `${newNumber}`);
  };

  clearItem = async () => {
    await AsyncStorage.removeItem('estado');

    this.setState({needRestart: true});
  };

  render() {
    const {storedNumber, needRestart} = this.state;
    return (
      <View>
        <Text style={styles.text}>Currently stored: </Text>
        <Text testID="storedNumber_text" style={styles.text}>
          {storedNumber}
        </Text>

        <Button
          testID="increaseByTen_button"
          title="Increase by 10"
          onPress={this.increaseByTen}
        />

        <Button
          testID="clear_button"
          title="Clear item"
          onPress={this.clearItem}
        />

        {needRestart ? <Text>Hit restart to see effect</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export const STORAGE_KEY = 'estado';