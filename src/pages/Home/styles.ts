import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

export const Container = styled.ScrollView`
  background-color: ${colors.light};
  padding-top: 18px;
  flex: 1;
`;

export const Box = styled.View`
  background-color: ${colors.white};
  border-color: ${colors.secondary};
  border-width: 1px;
  border-radius: 3px;
  padding-top: 18px;
  margin: 0 18px 18px;
  padding: 18px;
  flex: 1;
  flex-direction: row;
`;

export const BoxButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  border-radius: 5px;
  padding: 16px 18px;
`;

export const BoxText = styled.Text`
  font-family: 'ShareTechMono-Regular';
  line-height: 20px;
  color: ${colors.dark};
  font-size: 16px;
  flex: 1;
  margin-right: 18px;
  align-self: center;
`;

export const BoxTextSmall = styled.Text`
  font-family: 'ShareTechMono-Regular';
  font-size: 12px;
  color: ${colors.dark};
`;

export const BoxBoard = styled.Text`
  font-family: 'ShareTechMono-Regular';
  background-color: ${colors.secondary};
  border-color: ${colors.secondary};
  color: ${colors.dark}
  border-width: 1px;
  border-radius: 5px;
  padding: 18px 36px;
  text-align: center;
`;

export const FloatButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  elevation: 5;
  border-radius: 999px;
  align-self: flex-start;
  width: 70px;
  height: 70px;
  position: absolute;
  bottom: 18px;
  right: 18px;
  justify-content: center;
  align-items: center;
`;

export const FloatButtonText = styled.Text`
  color: ${colors.white};
  font-size: 24px;
`;

interface TableLineProps {
  last?: boolean;
}
interface CellProps {
  size?: 's' | 'm' | 'l';
}

export const TableLine = styled.View<TableLineProps>`
  flex-direction: row;
  border-bottom-color: ${colors.secondary};
  border-bottom-width: ${props => (props.last ? '0px' : '1px')};
  margin-bottom: ${props => (props.last ? '100px' : '0px')};
`;

export const Th = styled.Text<CellProps>`
  font-family: 'ShareTechMono-Regular';
  width: ${props => {
    switch (props.size) {
      case 's':
        return '80px';
      case 'l':
        return '165px';
      default:
        return '110px';
    }
  }};
  flex: 1;
  font-weight: bold;
  padding: 16px 18px;
`;

export const Td = styled.Text<CellProps>`
  font-family: 'ShareTechMono-Regular';
  flex-direction: row;
  align-self: center;
  width: ${props => {
    switch (props.size) {
      case 's':
        return '85px';
      case 'l':
        return '170px';
      default:
        return '115px';
    }
  }};
  padding: 16px 18px;
`;

export const TdBtn = styled.View<CellProps>`
  flex-direction: row;
  padding: 16px 2px 16px 18px;
  width: 124px;
`;

interface SmallButtonProps {
  color: string;
}

export const SmallButton = styled.TouchableOpacity<SmallButtonProps>`
  background-color: ${props => props.color};
  border-radius: 3px;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;
