import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  // AsyncStorage,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { navigationOptions, definicoesBase } from "../../styles/StyleBase";
import * as CONSTANTES from '../../data/Constantes';
import LocalStorage from "../../services/LocalStorage";


const options = {
  title: 'Selecione a imagem',
  cancelButtonTitle: 'Cancelar',
  takePhotoButtonTitle: 'Tirar foto…',
  chooseFromLibraryButtonTitle: 'Escolher da galeria…',
  permissionDenied: {
    title: 'Permissão negada',
    text:
      'Para tirar fotos com sua câmera e ter acesso à sua galeria de imagens.',
    reTryTitle: 'Tentar novamente',
    okTitle: "Confirmar",
  },
  quality: 1.0,
  maxWidth: 200,
  maxHeight: 200,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


export default class NewUserFoto extends Component {
  static navigationOptions = {
    ...navigationOptions,
  };

  //   state = {
  //     foto: ""
  //   };

  _bootstrapAsync = async () => {

    this.setState({
      imgSource64: await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_USUARIO_FOTO),
    });

    this.perfil = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_PERFIL);
    this.isCadastro = await LocalStorage.getItem(CONSTANTES.ASYNC_ITEM_CADASTRO_COMPLETO) === null
    //    if (__DEV__) reactotron.log(this.isCadastro);
  };

  state = {
    uploading: false,
    imgSource64: ''
  };
  async componentDidMount() {
    this._bootstrapAsync();
  }
  /**
   * Select image method
   */
  pickImage = () => {
    this.setState({
      uploading: true
    });
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        //console.log('You cancelled image picker 😟');
      } else if (response.error) {
        alert('Ocorreu um erro: ', response.error);
        this.setState({
          uploading: false
        });
      } else {
        let source64 = 'data:image/jpeg;base64,' + [response.data];  //<-- here you can get image with base64string
        this.setState({
          imgSource64: source64
        });
        this.uploadImage();
      }
    });
  };
  /**
   * Upload image method
   */
  uploadImage = () => {
    LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_FOTO, this.state.imgSource64).then( () => {
	    this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR);
	    }
    );
  };
  render() {
    const { uploading, imgSource64 } = this.state;
    // AsyncStorage.clear();
    return (
      <View style={styles.container}>
        <View style={styles.containerImagem}>
          {this.state.imgSource64 !== "" &&
            <Image
              style={styles.image}
              source={{ uri: this.state.imgSource64 }}
            />
          }
        </View>
        <View
          style={styles.btn}>
          <TouchableOpacity
            onPress={this.pickImage}
            disabled={uploading}
          >
            <Text style={styles.btnTxt}>Escolha uma imagem</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  containerImagem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  image: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 100,
    backgroundColor: "#bdbdbd"
  },
  btn: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: definicoesBase.corFonteTextoCabecalho,
    backgroundColor: definicoesBase.backgroundCabecalho,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  disabledBtn: {
    backgroundColor: definicoesBase.corBarraSlider
  },
  btnTxt: {
    fontFamily: definicoesBase.fontFamilyTextoComum,
    fontSize: definicoesBase.tamanhoFonteTextoComum,
    fontWeight: definicoesBase.fontWeightCabecalho,
    color: definicoesBase.corFonteTextoCabecalho,
    lineHeight: definicoesBase.alturaLinhaTextoComum,
    padding: 5,
  }
});
