import {StyleSheet} from 'react-native';
import Picker from 'react-native-picker-select';
import styled, {css} from 'styled-components/native';
import {colors} from '../../styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: ${colors.white};
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: ${colors.white};
  flex-direction: row;
  align-items: center;
  border-color: ${colors.secondary};
  ${props =>
    props.isErrored &&
    css`
      border-color: ${colors.danger};
    `}
  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.primary};
    `}
`;

export const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingHorizontal: 0,
    paddingVertical: 8,
    // borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 0,
    color: colors.primary,
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 1000,
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 0,
    paddingVertical: 8,
    // borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 0,
    color: colors.primary,
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 1000,
  },
  placeholder: {
    color: colors.secondary,
  },
});
