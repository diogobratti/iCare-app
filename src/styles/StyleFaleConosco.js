import { StyleSheet } from "react-native";

import StyleBase, { definicoesBase } from "./StyleBase";

const StyleFaleConosco = StyleSheet.create({
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
    },
    corpoText:{
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
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
export default StyleFaleConosco;