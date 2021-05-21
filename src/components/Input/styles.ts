import {StyleSheet} from 'react-native';
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
  margin-bottom: 16px;
  border-width: 2px;
  border-color: ${colors.white};
  flex-direction: row;
  align-items: center;
  border-color: ${colors.secondary};
  overflow: hidden;
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

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${colors.primary};
  font-size: 18px;
  font-family: 'ShareTechMono-Regular';
`;

export const Sufix = styled.View`
  background: ${colors.secondary};
  height: 100%;
  justify-content: center;
  padding: 0 16px;
  right: 0;
  position: absolute;
`;

export const SufixText = styled.Text`
  font-size: 16px;
  color: ${colors.dark};
  font-family: 'ShareTechMono-Regular';
`;

export const ErrorMessage = styled.Text`
  font-size: 14px;
  margin-bottom: 16px;
  margin-top: -10px;
  color: ${colors.danger};
  font-family: 'ShareTechMono-Regular';
  opacity: 0.9;
`;

export const iconStyles = StyleSheet.create({
  icon: {marginRight: 16, width: 22},
});
