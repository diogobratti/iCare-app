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
        fontSize: 12,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },
    anuncioDescricao:{
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
    anuncioTelefone: {
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
        width: 60, 
        height: 80
    },
    orderByContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 15,
        padding: 10,
    },
    orderByCabecalhoContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom:10,
    },
    orderByItemContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
    },
    orderByTexto: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        fontWeight: "bold",
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },
    orderByItemTexto: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },
    filtroContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
    },
    filtroItemContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 15,
    },
    filtroItemTexto: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        fontWeight: "bold",
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },
    filtroItemSliderTexto: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum
    },
    aplicarFiltroButton: {
        borderRadius: 10,
        borderWidth: 3,
        borderColor: definicoesBase.corFonteTextoCabecalho,
        backgroundColor: definicoesBase.backgroundCabecalho,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    aplicarFiltroText: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        fontWeight: definicoesBase.fontWeightCabecalho,
        color: definicoesBase.corFonteTextoCabecalho,
        lineHeight: definicoesBase.alturaLinhaTextoComum,
        padding: 5,
    },
    FiltrarContainer:{
        flex: 6,
        flexDirection: 'column',
        backgroundColor: definicoesBase.backgroundGeral,
        justifyContent:"flex-start",
    },
    scrollViewFiltrarContainer:{
        flex: 5,
        justifyContent:"flex-start",
    },
    aplicarFiltroContainer:{
        flex: 1,
        justifyContent:"flex-start",
    },
    visualizarAnuncioContainer:{
        flex: 6,
        flexDirection: 'column',
        backgroundColor: definicoesBase.backgroundGeral,
        padding: 10,
    },
    visualizarAnuncioFotoContainer: {
        flex: 1.5,
        backgroundColor: definicoesBase.backgroundAnuncio,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
    },
    visualizarAnuncioNomeContainer:{
        backgroundColor: definicoesBase.backgroundAnuncio,
        padding: 10,

    },
    visualizarAnuncioTextosContainer:{
        //flex: 3.5,
        backgroundColor: definicoesBase.backgroundAnuncio,
        borderWidth: 1,
        borderColor: definicoesBase.corBordaAnuncio,
        borderRadius: 5, //deixa a borda redonda
        padding: 10,
        marginBottom: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    visualizarAnuncioLinha:{
        flexDirection: "row",
    },
    visualizarAnuncioLinhaEditavel:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    visualizarAnuncioLinhaIcones:{
        flexDirection: "row",
        //alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        //alignContent: 'space-between',
    },
    visualizarAnuncioDescricaoText:{
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        lineHeight: definicoesBase.alturaLinhaTextoComum,
    },
    visualizarAnuncioAtributoText:{
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.corFonteTextoComum,
        fontWeight: "bold",
        flexWrap: 'wrap',
        flexShrink: 1,
        lineHeight: definicoesBase.alturaLinhaTextoComum,
    },
    visualizarAnuncioAtributoEditarText:{
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        color: definicoesBase.backgroundCabecalho,
        fontWeight: "bold",
        flexWrap: 'wrap',
        flexShrink: 1,
        lineHeight: definicoesBase.alturaLinhaTextoComum,
    },
    visualizarAnuncioImagemUsuario: {
        width: 120, 
        height: 120,
        borderRadius: 100, //deixa a borda redonda
    },
    visualizarAnuncioBotaoContainer:{
        flex: 1,
        justifyContent:"flex-start",
    },
    visualizarAnuncioBotaoButton: {
        borderRadius: 10,
        borderWidth: 3,
        borderColor: definicoesBase.corFonteTextoCabecalho,
        backgroundColor: definicoesBase.backgroundCabecalho,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },
    visualizarAnuncioBotaoText: {
        fontFamily: definicoesBase.fontFamilyTextoComum,
        fontSize: definicoesBase.tamanhoFonteTextoComum,
        fontWeight: definicoesBase.fontWeightCabecalho,
        color: definicoesBase.corFonteTextoCabecalho,
        lineHeight: definicoesBase.alturaLinhaTextoComum,
        padding: 5,
    },
});

export const anuncioIconeAvaliacao = {
    size: 18, 
    color: definicoesBase.corFonteTextoAvaliacao
};

export const anuncioIconeTelefone = {
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