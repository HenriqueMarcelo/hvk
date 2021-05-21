import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  border-radius: 10px;
  padding: 16px 16px;
  align-items: center;
  margin-top: 2px;
`;

export const SubmitButtonText = styled.Text`
  font-size: 18px;
  color: ${colors.white};
  font-family: 'ShareTechMono-Regular';
`;

export const SwitchView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const SwitchText = styled.Text`
  font-size: 18px;
  color: ${colors.dark};
  font-family: 'ShareTechMono-Regular';
`;
