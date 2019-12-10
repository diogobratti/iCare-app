import React from "react";
import { Input, Icon } from "react-native-elements";
import PropTypes from 'prop-types'

const InputAnuncio = props => {
  const { onChangeText, label, placeholder, value } = props;

  return (
    <Input
      // label="Descreva o seu anúncio"
      // placeholder="ex: Experiência com acamados e procedimentos cirúrgicos"
      label={label}
      placeholder={placeholder}
      leftIcon={<Icon name="user" type="antdesign" size={24} color="#007aff" />}
      // errorMessage="O seu anúncio deve conter apenas texto"
      onChangeText={onChangeText}
      multiline={true}
      numberOfLines={5}
      inputStyle={{
        height: null
      }}
      // errorMessage={erro}
      value={value}
    />
  );
};

InputAnuncio.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default InputAnuncio;
