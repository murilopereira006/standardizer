import React, { useContext } from 'react'
import { Text, View } from 'react-native'

import { DarkTheme } from '../../../App';
import { styles } from "./styles"

const {
    inputBoxDark, 
    inputBoxLigth
} = styles

export const InputField = () => {
    const isDarkMode = useContext(DarkTheme);
    const inputBox = isDarkMode ? inputBoxDark : inputBoxLigth
  return (
    <View style={inputBox} >
        <Text >0</Text>
    </View>
  )
}
