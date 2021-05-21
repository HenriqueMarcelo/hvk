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
