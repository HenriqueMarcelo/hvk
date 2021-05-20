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

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${colors.primary};
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;
