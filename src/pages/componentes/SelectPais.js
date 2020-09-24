import React, { Component } from 'react'
import {View, Picker } from 'react-native'

export default  props => (
    <View >
        {
            props.data ?
                <Picker
                    style={props.style}
                    itemStyle={props.itemStyle}
                    selectedValue={props.selectedValue}
                    onValueChange={props.onValueChange}
                >
                    {
                        props.data.map(pais =>
                            <Picker.Item key={pais} label={pais.nome} value={pais} />)
                    }
                </Picker>
                :
                null
        }
    </View>
)
