import { StyleSheet } from "react-native";
import colors from "../../../colors.global";

export const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 20,
    borderRadius: 100,
    padding: 2
},
  containerActive: {
    backgroundColor: colors.light.backgroundTertiary,
  },
  containerInactive: {
    backgroundColor: colors.dark.backgroundTertiary,
  },
  toggle: {
    width: 16,
    height: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderRadius: 100
  },
  toogleLigth: {
    backgroundColor: colors.light.backgroundSecondary,
  },
  toogleDark: {
    backgroundColor: colors.dark.divider,
  }
});
  