import React, { ReactElement, useEffect, useRef } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./styles";

type DarkModeSwitchProps = {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
};

const {
    container,
    containerInactive,
    containerActive,
    toggle,
    toogleDark,
    toogleLigth
} = styles;


const DarkModeSwitch = ({ isDarkMode, setIsDarkMode }: DarkModeSwitchProps): ReactElement => {
    const toggleAnim = useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(toggleAnim, {
            toValue: isDarkMode ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isDarkMode]);

  const toggleStyle = {
    transform: [{
        translateX: toggleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
            })
        }]
    };
  
    return (
        <TouchableWithoutFeedback
            onPress={() => setIsDarkMode(!isDarkMode)}
        >
            <View
                style={[
                    container, 
                    isDarkMode ? containerInactive : containerActive
                ]}
            >
                <Animated.View style={[toggle, toggleStyle, isDarkMode? toogleDark: toogleLigth]} />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default DarkModeSwitch;