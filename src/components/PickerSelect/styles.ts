import {StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

export const pickerStyles = StyleSheet.create({
  picker: {
    height: 100,
    width: '100%',
    marginLeft: -12,
  },
  placeholder: {
    fontSize: 18,
    color: colors.secondary,
    backgroundColor: colors.light,
  },
  placeholderSelected: {
    fontSize: 18,
    color: colors.secondary,
    backgroundColor: 'white',
  },
  option: {
    fontSize: 18,
    color: colors.dark,
    backgroundColor: colors.light,
  },
  optionSelected: {
    fontSize: 18,
    color: colors.primary,
    backgroundColor: 'white',
  },
});
