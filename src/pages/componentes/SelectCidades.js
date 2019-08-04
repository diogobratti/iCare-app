import React from 'react';
import { View, Picker, StyleSheet } from 'react-native';


export default props => (
    <View  >
        {
            props.data ?
                <Picker
                    selectedValue={props.selectedValue}
                    onValueChange={props.onValueChange}
                >
                    <Picker.Item  label={'--- Escolha ---'} />
                    {
                        props.data.cidades.map(cidade => <Picker.Item key={cidade} label={cidade} value={cidade} />)
                    }
                </Picker>
                :
                <Picker
                    selectedValue={props.selectedValue}
                    onValueChange={props.onValueChange}
                >
                    <Picker.Item  label={'--- Escolha o estado ---'} />
                </Picker>
        }
    </View>
)