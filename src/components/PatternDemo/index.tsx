import React from 'react'
import { View } from 'react-native'
import { InputField } from './inputField'

import {styles} from "./styles"
const {container} = styles

export const PatternDemo = () => {
  return (
    <View style={container} >
      <InputField />
      <InputField />
      <InputField />

    </View>
  )
}
