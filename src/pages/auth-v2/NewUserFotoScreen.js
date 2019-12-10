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
  SafeAreaView
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import uuid from 'uuid/v4'; // Import UUID to generate UUID
import ImagePickerFoto from "../componentes/ImagePickerFoto";
import Button from "./components/Button";
import { navigationOptions } from "../../styles/StyleBase";
import * as CONSTANTES from '../../data/Constantes';
import LocalStorage from "../../services/LocalStorage";


const options = {
  title: 'Selecione a imagem',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
const ImageRow = ({ imgSource64, windowWidth, popImage }) => (
  <View>
    <Image
      source={{ uri: imgSource64 }}
      style={[styles.img, { width: windowWidth / 2 - 15 }]}
      onError={popImage}
    />
  </View>
);


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
    imgSource64: '',
    imgSource: '',
    uploading: false,
    progress: 0,
    images: []
  };
  componentDidMount() {
    this._bootstrapAsync();
  }
  /**
   * Select image method
   */
  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        //console.log('You cancelled image picker 😟');
      } else if (response.error) {
        alert('Ocorreu um erro: ', response.error);
      } else {
        let source64 =  'data:image/jpeg;base64,'+ [response.data];  //<-- here you can get image with base64string
        const source = { uri: response.uri };
        this.setState({
          imgSource: source,
          imageUri: response.uri,
          imgSource64: source64
        });
      }
    });
  };
  /**
   * Upload image method
   */
  uploadImage = () => {
    const ext = this.state.imageUri.split('.').pop(); // Extract image extension
    this.setState({ uploading: true });
    const imgSource64 = this.state.imgSource64;

    LocalStorage.setItem(CONSTANTES.ASYNC_ITEM_USUARIO_FOTO, this.state.imgSource64);
      this.props.navigation.navigate(CONSTANTES.ROUTES_NEW_USER_CADASTRAR);
  };
  /**
   * Remove image from the state and persistance storage
   */
  removeImage = imageIndex => {
    let images = this.state.images;
    images.pop(imageIndex);
    this.setState({ images });
  };
  render() {
    const { uploading, imgSource, progress, images } = this.state;
    const windowWidth = Dimensions.get('window').width;
    const disabledStyle = uploading ? styles.disabledBtn : {};
    const actionBtnStyles = [styles.btn, disabledStyle];
    // AsyncStorage.clear();
    return (
      <View>
        {/* <ScrollView> */}
          <View style={styles.container}>
            <TouchableOpacity
              style={actionBtnStyles}
              onPress={this.pickImage}
              disabled={uploading}
            >
              <View>
                <Text style={styles.btnTxt}>Escolha uma imagem</Text>
              </View>
            </TouchableOpacity>
            {/** Display selected image */}
            {imgSource !== '' && (
              <View>
                <Image source={imgSource} style={styles.image} />
                {uploading && (
                  <View
                    style={[styles.progressBar, { width: `${progress}%` }]}
                  />
                )}
                <TouchableOpacity
                  style={actionBtnStyles}
                  onPress={this.uploadImage}
                  disabled={uploading}
                >
                  <View>
                    {uploading ? (
                      <Text style={styles.btnTxt}>Carregando ...</Text>
                    ) : (
                      <Text style={styles.btnTxt}>Imagem carregada</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View>
              <Text
                style={{
                  fontWeight: '600',
                  paddingTop: 20,
                  alignSelf: 'center'
                }}
              >
                {images.length > 0
                  ? 'Suas imagens carregadas'
                  : 'Não há imagens carregadas'}
              </Text>
            </View>
            <FlatList
              numColumns={2}
              style={{ marginTop: 20 }}
              data={images}
              renderItem={({ item: image, index }) => (
                <ImageRow
                  windowWidth={windowWidth}
                  imgSource64={image}
                  popImage={() => this.removeImage(index)}
                />
              )}
              keyExtractor={index => index}
            />
          </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 20,
    paddingLeft: 5,
    paddingRight: 5
  },
  btn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgb(3, 154, 229)',
    marginTop: 20,
    alignItems: 'center'
  },
  disabledBtn: {
    backgroundColor: 'rgba(3,155,229,0.5)'
  },
  btnTxt: {
    color: '#fff'
  },
  image: {
    marginTop: 20,
    minWidth: 200,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#ccc',
  },
  img: {
    flex: 1,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#ccc'
  },
  progressBar: {
    backgroundColor: 'rgb(3, 154, 229)',
    height: 3,
    shadowColor: '#000',
  }
});
