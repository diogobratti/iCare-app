import React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { Input, Icon, Overlay } from "react-native-elements"
import Button from "../auth-v2/components/Button"
import PropTypes from 'prop-types'

const Comentario = props => {
  const { isVisible, onPress, value, errorMessage, onChangeText, width, height, buttonStyle } = props;

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
        />

      <Button
        onPress={onPress}
        style={buttonStyle}
        >Salvar</Button>

      <Button
        onPress={onPress}
        style={buttonStyle}
        >Cancelar</Button>

        {/* <TouchableOpacity
          onPress={onPress}
        >
          <Text
            style={buttonStyle}
          >
            Salvar
          </Text>
        </TouchableOpacity> */}
      </View>
    </Overlay>
  )
}

Comentario.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  buttonStyle: PropTypes.array
}

export default Comentario
