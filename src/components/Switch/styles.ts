import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 20,
    borderRadius: 100,
    padding: 2
},
  containerActive: {
    backgroundColor: '#4CD964',
  },
  containerInactive: {
    backgroundColor: '#E9E9EA',
  },
  toggle: {
    width: 16,
    height: 16,
    backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderRadius: 100
  }
});
  