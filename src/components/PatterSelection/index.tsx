import React, { ReactElement, useContext } from 'react'
import { Text, View } from 'react-native';

import { DarkTheme } from '../../../App';
import { PatternDemo } from '../PatternDemo';

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
                Defina seu padrão
            </Text>

            <PatternDemo />

            <Text>Número de caracteres / ilimitado</Text>
            <Text>Bloco Ano</Text>
            <Text>Nome atual</Text>
            <Text>numeração ordenada crescente</Text>
        </View>
    )
}
