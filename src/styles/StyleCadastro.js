import { StyleSheet } from "react-native";
import colors from "./colors";
import fonts from "./fonts";
import { Platform } from "react-native";

const StyleCadastro = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10
  },

  textStyle: {
    fontSize: 16,
    color: colors.grey3,
    ...Platform.select({
      android: {
        ...fonts.android.bold
      },
      default: {
        fontWeight: "bold"
      }
    })
  },

  inputStyle: {
    // alignSelf: "center",
    color: "black",
    fontSize: 18,
    flex: 1,
    minHeight: 40
  },

  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    borderColor: colors.grey3
  },

  erroText: {
    margin: 5,
    fontSize: 16,
    color: colors.error
  }
});

export default StyleCadastro;
