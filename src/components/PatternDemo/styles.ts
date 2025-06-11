import { StyleSheet } from "react-native";
import colors from "../../../colors.global";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        gap: 5
    },
    inputBox: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 2,
    },
    inputBoxDark: {
        backgroundColor: colors.dark.backgroundPrimary
    },
    inputBoxLigth: {
        backgroundColor: colors.light.backgroundPrimary
    },
    mainText: {
        display: "flex"
    },
    textDark: {},
    textLigth: {},
});
  