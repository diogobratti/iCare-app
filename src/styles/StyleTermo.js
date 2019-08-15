import { StyleSheet } from "react-native";

import StyleBase, { definicoesBase } from "./StyleBase";

const StyleTermo = StyleSheet.create({
    container: {
        flex:6,
        flexDirection: 'column',
        backgroundColor: definicoesBase.backgroundGeral,
        justifyContent:"flex-start",
    },
    cabecalhoContainer:{
        flex: 1,
        backgroundColor: definicoesBase.backgroundCabecalho,
        flexDirection: 'column',
        justifyContent:"flex-start",
    },
    corpoContainer:{
        flex: 5,
        justifyContent:"flex-start",
        padding: 10,
    },
    tituloContainer:{
        flex: 6,
        flexDirection: 'column',
        //justifyContent: 'space-around',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginBottom: 50,

    },
    descricaoContainer: {
        flexDirection: 'column',

    },
    tituloTexto: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        fontWeight: "bold",
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum,
        alignSelf: "center",
    },
    descricaoTexto: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum,
        flexWrap: 'wrap',
        flexShrink: 1,
        alignSelf: "center",
    },
    erroContainer: {

    },
    erroTexto: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        fontWeight: "bold",
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum,
        alignSelf: "center",
        color:"#f00",
    },
    botaoContainer:{
        flex: 1,
        justifyContent:"flex-start",
    },
    botaoButton: {
        borderRadius: 10,
        borderWidth: 3,
        borderColor: definicoesBase.corFonteTextoCabecalho,
        backgroundColor: definicoesBase.backgroundCabecalho,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    botaoText: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        fontWeight: definicoesBase.fontWeightCabecalho,
        color: definicoesBase.corFonteTextoCabecalho,
        lineHeight: definicoesBase.alturaLinhaTextoComum,
        padding: 5,
    },
});
export default StyleTermo;