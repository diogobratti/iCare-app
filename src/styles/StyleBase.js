import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";



export const definicoesBase = {
    tamanhoFonteTextoComum : 16,
    alturaLinhaTextoComum : 22,
    fontFamilyTextoComum : 'Arciform',
    corFonteTextoCabecalho : "#fff",
    tamanhoFonteTextoCabelho: 20,
    corFonteTextoComum : "#212121",
    corFonteTextoAvaliacao : "#e7a74e",
    fontWeightCabecalho:"bold",
    backgroundGeral : "#fff",
    backgroundAnuncio : "#FFF",
    corBordaAnuncio : "#bdbdbd",
    corBarraSlider : "#bdbdbd",
    corBotaoSlider : "#0288d1",
    backgroundCabecalho : "#0288d1",
};


class LogoTitle extends React.Component {
    render() {
      return (
        <Image
            resizeMode="cover"
            source={require('./../assets/logo/icone250x250.png')}
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
    //headerLeft: <View />,
    headerTitle: <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center', 
                        justifyContent: 'center',
                        alignSelf: "center", 
                    }}
                >
                    <LogoTitle />
                    <Text 
                        style={{
                            fontFamily: definicoesBase.fontFamilyTextoComum,
                            fontWeight:definicoesBase.fontWeightCabecalho,
                            color:definicoesBase.corFonteTextoCabecalho,
                            fontSize:definicoesBase.tamanhoFonteTextoCabelho,
                        }}
                    >
                        iCare
                    </Text>
                </View>,
    //headerRight: <View />,
    headerStyle: {
      backgroundColor: '#0288d1',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
    titleStyle: {
        textAlign: 'center',
    },
    tabBarOptions:  {
        activeTintColor: '#0288d1',
        inactiveTintColor: '#b3e5fc',
    }
};
export default StyleBase;