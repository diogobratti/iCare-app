import { StyleSheet } from "react-native";

import StyleBase, { navigationOptions, definicoesBase } from "./StyleBase";

const StyleAnuncio = StyleSheet.create({
    //entre cabecalho e rodape
    container: {
        flexDirection: 'column',
        backgroundColor: definicoesBase.backgroundGeral,
    },
    list: {
        padding: 10
    },
    pesquisaContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    pesquisaBarraContainer:{
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    pesquisaFiltroContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
    },
    pesquisaFiltroTexto:{
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },
    //cada anuncio
    anuncioContainer: {
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
    anuncioColunaEsquerdaContainer: {
        //flex: 1,
        borderRightWidth: 1,
        borderRightColor: definicoesBase.corBordaAnuncio,
        borderRadius: 0,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    anuncioColunaDireitaContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRightWidth: 1,
        borderRightColor: definicoesBase.corBordaAnuncio,
        borderRadius: 0,
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        fontFamily: definicoesBase.fontFamilyTextoComum,
    },
    anuncioColunaDireitaLinha: {
        flex: 1,
        flexDirection: "row",
    },
    

    anuncioNome: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum,
    },

    anuncioDistancia: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },
    anuncioAvaliacao: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoAvaliacao,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },

    anuncioSeparador: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },

    anuncioPerfil: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },

    anuncioPreco: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },

    anuncioPrecoObservacao: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: 12,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },
    anuncioImagemUsuario: {
        width: 90, 
        height: 60
    },
});

export const anuncioIconeAvaliacao = {
    size: 18, 
    color: definicoesBase.corFonteTextoAvaliacao
};

export const searchBarContainerStyle= {
    backgroundColor: definicoesBase.backgroundAnuncio,
    borderWidth: 0, //no effect
    shadowColor: definicoesBase.backgroundAnuncio, //no effect
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    padding: 0,
};
export const searchBarInputStyle = {
    fontFamily: definicoesBase.fontFamilyTextoComum,
    fontSize: 14,
    backgroundColor: definicoesBase.backgroundAnuncio,//definicoesBase.corBordaAnuncio,
    color: definicoesBase.corFonteTextoComum,
};
export const searchBarInputContainerStyle = {
    backgroundColor: definicoesBase.backgroundAnuncio,//definicoesBase.corBordaAnuncio,
    padding: 0,
};
export const searchBarleftIconContainerStyle = {
    backgroundColor: definicoesBase.backgroundAnuncio,//definicoesBase.corBordaAnuncio,
    padding: 0,
};
export const searchBarPlaceholderTextColor = "#86939e";

export const searchBarSearchIcon = {
    color: definicoesBase.corFonteTextoComum,
};

export const iconeFiltro =  definicoesBase.corFonteTextoComum;

export default StyleAnuncio;