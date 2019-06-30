import { StyleSheet } from "react-native";

import StyleBase, { navigationOptions, definicoesBase } from "./StyleBase";

const StyleAnuncio = StyleSheet.create({
    //entre cabecalho e rodape
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: definicoesBase.backgroundGeral,
    },
    list: {
        padding: 10
    },
    //cada anuncio
    anuncioContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: definicoesBase.backgroundAnuncio,
        borderWidth: 1,
        borderColor: definicoesBase.corBordaAnuncio,
        borderRadius: 5, //deixa a borda redonda
        padding: 0,
        marginBottom: 10
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
    anuncioImagemUsuario: {
        width: 60, 
        height: 45
    },
});

export const anuncioIconeAvaliacao = {
    size: 18, 
    color: definicoesBase.corFonteTextoAvaliacao
};

export const searchBarContainerStyle= {
    backgroundColor: definicoesBase.backgroundAnuncio
};
export const searchBarInputStyle = {
    fontFamily: definicoesBase.fontFamilyTextoComum,
    fontSize: 16,
    backgroundColor: definicoesBase.corBordaAnuncio,
    color: definicoesBase.corFonteTextoComum,
};
export const searchBarInputContainerStyle = {
    backgroundColor: definicoesBase.corBordaAnuncio
};
export const searchBarleftIconContainerStyle = {
    backgroundColor: definicoesBase.corBordaAnuncio
};
export const searchBarPlaceholderTextColor = "#86939e";

export const searchBarSearchIcon = {
    color: definicoesBase.corFonteTextoComum,
};

export const iconeFiltro =  definicoesBase.corFonteTextoComum;

export default StyleAnuncio;