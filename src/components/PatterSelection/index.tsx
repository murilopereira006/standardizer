import React, { ReactElement, useContext } from 'react'
import { Text, View } from 'react-native';

import { DarkTheme } from '../../../App';
import { styles } from './styles';

const {
    container,
    containerBgDark,
    containerBgLigth,
    titleDark,
    titleLigth
} = styles;

export const PatterSelection = ():ReactElement => {
    const isDarkMode = useContext(DarkTheme);
    
    return (
        <View style={[container, isDarkMode ? containerBgDark : containerBgLigth]} >
            <Text style={
            isDarkMode ? titleDark : titleLigth
            }>
                PatterSelection
            </Text>
        </View>
    )
}
