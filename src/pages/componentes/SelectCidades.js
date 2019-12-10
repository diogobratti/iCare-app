import React from 'react';
import { View, Picker, StyleSheet } from 'react-native';


export default props => (
    <View  >
        {
            props.data ?
                <Picker
                    style={props.style}
                    itemStyle={props.itemStyle}
                    selectedValue={props.selectedValue}
                    onValueChange={props.onValueChange}
                >
                    {
                        props.data.cidades.map(cidade => <Picker.Item key={cidade} label={cidade["Município"]} value={cidade} />)
                    }
                </Picker>
                :
                <Picker
                    style={props.style}
                    itemStyle={props.itemStyle}
                    selectedValue={props.selectedValue}
                    onValueChange={props.onValueChange}
                >
                    <Picker.Item  label={' '} />
                </Picker>
        }
    </View>
)