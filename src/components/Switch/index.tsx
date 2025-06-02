import React, {ReactElement} from "react";
import { View } from "react-native";
import { styles } from "./styles";

const Swith = (): ReactElement => {
    return (
        <View style={styles.container}>
            <View style={styles.toggle} />
        </View>
    );
};

export default Swith;
