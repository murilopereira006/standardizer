import React, { ReactElement, useEffect, useRef } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./styles";

type SwitchProps = {
    isActive: boolean;
    setIsActive: (value: boolean) => void;
};

const Switch = ({ isActive, setIsActive }: SwitchProps): ReactElement => {
    
    const toggleAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

    useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

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
            onPress={() => setIsActive(!isActive)}
        >
            <View
                style={[
                    styles.container, 
                    isActive ? styles.containerInactive : styles.containerActive
                ]}
            >
                <Animated.View style={[styles.toggle, toggleStyle]} />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Switch;