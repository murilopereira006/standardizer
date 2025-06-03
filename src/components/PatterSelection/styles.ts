import { StyleSheet } from "react-native";
import colors from "../../../colors.global";

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 8
    },
    containerBgDark: {
        backgroundColor: colors.dark.backgroundSecondary
    },
    containerBgLigth: {
        backgroundColor: colors.light.backgroundSecondary
    },
    titleDark: {
        color: colors.dark.textPrimary
    },
    titleLigth: {
        color: colors.light.textPrimary
    }
});
  