import React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { Input, Icon, Overlay } from "react-native-elements"
import Button from "../auth-v2/components/Button"
import PropTypes from 'prop-types'

const Comentario = props => {
  const { isVisible, onPressSalvar, onPressCancelar, value, errorMessage, onChangeText, width, height, buttonStyle, textButtonStyle, inputStyle } = props;

  return (
    <Overlay isVisible={isVisible} width={width} height={height}>
      <View
        // style={styles.centralize}
      >
        <Input
          label="Escreva o seu comentário abaixo"
          placeholder="Ex: O prestador foi muito atencioso com o paciente e recomendo o serviço dele"
          errorMessage={errorMessage}
          value={value}
          numberOfLines={5}
          multiline={true}
          onChangeText={onChangeText}
          style={inputStyle}
        />

        <TouchableOpacity
          style={buttonStyle}
          onPress={onPressSalvar}
        >
          <Text style={textButtonStyle}>
            Salvar
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={buttonStyle}
          onPress={onPressCancelar}
        >
          <Text style={textButtonStyle}>
            Cancelar
          </Text>
        </TouchableOpacity>

      </View>
    </Overlay>
  )
}

Comentario.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPressSalvar: PropTypes.func.isRequired,
  onPressCancelar: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  buttonStyle: PropTypes.object,
  textButtonStyle: PropTypes.object,
  inputStyle: PropTypes.object
}

export default Comentario
