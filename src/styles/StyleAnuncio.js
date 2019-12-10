import { StyleSheet } from "react-native";

const tamanhoFonteTextoComum = 16;
const alturaLinhaTextoComum = 22;
export const fontFamilyTextoComum = 'Arciform';
const corFonteTextoComum = "#212121";
const corFonteTextoAvaliacao = "#e7a74e";
const backgroundGeral = "#fff";
const backgroundAnuncio = "#FFF";
const corBordaAnuncio = "#bdbdbd";

const StyleAnuncio = StyleSheet.create({
    //entre cabecalho e rodape
    container: {
        flex: 1,
        backgroundColor: backgroundGeral,
    },
    list: {
        padding: 10
    },
    //cada anuncio
    anuncioContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: backgroundAnuncio,
        borderWidth: 1,
        borderColor: corBordaAnuncio,
        borderRadius: 5, //deixa a borda redonda
        padding: 0,
        marginBottom: 10
    },
    anuncioColunaEsquerdaContainer: {
        //flex: 1,
        borderRightWidth: 1,
        borderRightColor: corBordaAnuncio,
        borderRadius: 0,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    anuncioColunaDireitaContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRightWidth: 1,
        borderRightColor: corBordaAnuncio,
        borderRadius: 0,
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        fontFamily: fontFamilyTextoComum,
    },
    anuncioColunaDireitaLinha: {
        flex: 1,
        flexDirection: "row",
    },
    

    anuncioNome: {
        fontFamily: fontFamilyTextoComum,
        fontSize: tamanhoFonteTextoComum,
        color: corFonteTextoComum,
        lineHeight: alturaLinhaTextoComum,
    },

    anuncioDistancia: {
        fontFamily: fontFamilyTextoComum,
        fontSize: tamanhoFonteTextoComum,
        color: corFonteTextoComum,
        lineHeight: alturaLinhaTextoComum
    },
    anuncioAvaliacao: {
        fontFamily: fontFamilyTextoComum,
        fontSize: tamanhoFonteTextoComum,
        color: corFonteTextoAvaliacao,
        lineHeight: alturaLinhaTextoComum
    },

    anuncioSeparador: {
        fontFamily: fontFamilyTextoComum,
        fontSize: tamanhoFonteTextoComum,
        color: corFonteTextoComum,
        lineHeight: alturaLinhaTextoComum
    },

    anuncioPerfil: {
        fontFamily: fontFamilyTextoComum,
        fontSize: tamanhoFonteTextoComum,
        color: corFonteTextoComum,
        lineHeight: alturaLinhaTextoComum
    },

    anuncioPreco: {
        fontFamily: fontFamilyTextoComum,
        fontSize: tamanhoFonteTextoComum,
        color: corFonteTextoComum,
        lineHeight: alturaLinhaTextoComum
    },
    anuncioImagemUsuario: {
        width: 60, 
        height: 45
    }
});

export const anuncioIconeAvaliacao = {
    size: 18, 
    color: corFonteTextoAvaliacao
};

export default StyleAnuncio;