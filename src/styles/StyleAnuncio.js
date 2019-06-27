import { StyleSheet } from "react-native";

const StyleAnuncio = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    list: {
        padding: 20
    },
    anuncioContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    anuncioColunaEsquerdaContainer: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    anuncioColunaDireitaContainer: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    anuncioColunaDireitaLinha: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    

    anuncioNome: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },

    anuncioDistancia: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },
    anuncioAvaliacao: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },

    anuncioSeparador: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },

    anuncioPerfil: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },

    anuncioPreco: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },
});

export default StyleAnuncio;