import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";


class LogoTitle extends React.Component {
    render() {
      return (
        <Image
            resizeMode="cover"
            source={require('./../assets/logo/logo_temp.jpeg')}
            style={{ 
                width: 30, 
                height: 30,
                resizeMode: 'contain',
                alignSelf: 'center',
            }}
        />
      );
    }
  }

const StyleBase = StyleSheet.create({
    headerStyle: {
        backgroundColor: "#0288d1"
    },
});

export const navigationOptions = {
    //title: "iCare",
    headerLeft: <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center', 
                        justifyContent: 'center', 
                    }}
                >
                    <LogoTitle />
                    <Text 
                        style={{
                            fontFamily: "Arciform",
                            fontWeight:"bold",
                            color:"#fff",
                            fontSize:20
                        }}
                    >
                        Care
                    </Text>
                </View>,
    headerRight: <View />,
    headerStyle: {
      backgroundColor: '#0288d1',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
    tabBarOptions:  {
        activeTintColor: '#0288d1',
        inactiveTintColor: '#b3e5fc',
    }
};

export default StyleBase;