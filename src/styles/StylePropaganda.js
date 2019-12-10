import { StyleSheet } from "react-native";

import StyleBase, { navigationOptions, definicoesBase } from "./StyleBase";

const StylePropaganda = StyleSheet.create({
    //entre cabecalho e rodape
    container: {
        flexDirection: 'column',
        backgroundColor: definicoesBase.backgroundGeral,
    },
    //cada propaganda
    propagandaContainer: {
        flexDirection: 'row',
        backgroundColor: definicoesBase.backgroundAnuncio,
        borderWidth: 1,
        borderColor: definicoesBase.corBordaAnuncio,
        borderRadius: 5, //deixa a borda redonda
        padding: 0,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    propagandaText: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },
});
export default StylePropaganda;