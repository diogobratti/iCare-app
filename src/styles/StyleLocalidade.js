import { StyleSheet } from "react-native";

import StyleBase, { definicoesBase } from "./StyleBase";

const StyleLocalidade = StyleSheet.create({
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
    camposContainer:{
        flex: 6,
        flexDirection: 'column',
        //justifyContent: 'space-around',
        justifyContent: 'center',
        alignItems: 'stretch',

    },
    itemCamposContainer: {
        flexDirection: 'column',

    },
    itemCamposEspacoContainer: {

    },
    itemCamposTexto: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        fontWeight: "bold",
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum,
        alignSelf: "center",
    },
    itemCamposPicker:{ 
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        height: 50,
        textAlign: 'center', 
        alignItems:'center', 
        justifyContent:'center',
    },
    itemCamposPickerItem: {
        textAlign: 'center', 
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        alignSelf: "center",
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
export default StyleLocalidade;