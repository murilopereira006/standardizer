import React, { useContext } from 'react'
import { Text, View } from 'react-native'

import { DarkTheme } from '../../../App';
import { styles } from "./styles"

const {
    inputBox,
    inputBoxDark, 
    inputBoxLigth
} = styles

type PropsInputField = {
    value: string;
}

export const InputField = ({ value}: PropsInputField) => {
    const isDarkMode = useContext(DarkTheme);
  
    return (
    <View style={[inputBox, isDarkMode ? inputBoxDark : inputBoxLigth]} >
        <Text >{value}</Text>
    </View>
  )
}
