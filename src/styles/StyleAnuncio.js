import { StyleSheet } from "react-native";

const StyleAnuncio = StyleSheet.create({
    //entre cabecalho e rodape
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    list: {
        padding: 10
    },
    //cada anuncio
    anuncioContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5, //deixa a borda redonda
        padding: 0,
        marginBottom: 10
    },
    anuncioColunaEsquerdaContainer: {
        //flex: 1,
        borderRightWidth: 1,
        borderRightColor: "#DDD",
        borderRadius: 0,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    anuncioColunaDireitaContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRightWidth: 1,
        borderRightColor: "#DDD",
        borderRadius: 0,
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    anuncioColunaDireitaLinha: {
        flex: 1,
        flexDirection: "row",
    },
    

    anuncioNome: {
        fontSize: 16,
        color: "#999",
        lineHeight: 24,
        fontFamily: "Verdana"
    },

    anuncioDistancia: {
        fontSize: 16,
        color: "#999",
        lineHeight: 24
    },
    anuncioAvaliacao: {
        fontSize: 16,
        color: "#e7a74e",
        lineHeight: 24
    },

    anuncioSeparador: {
        fontSize: 16,
        color: "#999",
        lineHeight: 24
    },

    anuncioPerfil: {
        fontSize: 16,
        color: "#999",
        lineHeight: 24
    },

    anuncioPreco: {
        fontSize: 16,
        color: "#999",
        lineHeight: 24
    },
    anuncioImagemUsuario: {
        width: 60, 
        height: 45
    }
});

export const anuncioIconeAvaliacao = {
    size: 18, 
    color: "#e7a74e"
};

export default StyleAnuncio;