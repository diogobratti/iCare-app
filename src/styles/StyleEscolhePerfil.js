import { StyleSheet } from "react-native";

import StyleBase, { definicoesBase } from "./StyleBase";

const StyleEscolhePerfil = StyleSheet.create({
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
    espacoSuperiorContainer:{
        flex: 1,
        justifyContent:"center",
        padding: 10,
    },
    espacoInferiorContainer:{
        flex: 2,
        justifyContent:"center",
        padding: 10,
    },
    corpoContainer:{
        flex: 2,
        justifyContent:"center",
        padding: 10,
    },
    conteudoContainer:{
        flex: 3,
        justifyContent:"center",
    },
    tituloContainer:{
        //flex: 6,
        flexDirection: 'column',
        marginBottom: 50,
        //justifyContent: 'space-around',
        justifyContent: 'center',
        alignItems: 'center',

    },
    tituloTexto: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        fontWeight: "bold",
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum,
        alignSelf: "center",
    },
    botaoContainer:{
        flex: 2.5,
        justifyContent:"center",
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
export default StyleEscolhePerfil;