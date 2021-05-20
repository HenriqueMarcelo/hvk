import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Container from '../../components/Container';
import {colors} from '../../styles/colors';
import {
  Box,
  BoxBoard,
  BoxButton,
  BoxText,
  BoxTextSmall,
  FloatButton,
  FloatButtonText,
  SmallButton,
  TableLine,
  Td,
  TdBtn,
  Th,
} from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <Container>
        <Box>
          <BoxText>Hodômetro (Quilometragem): 39547.5</BoxText>
          <BoxButton>
            <FontAwesome5 name="edit" size={14} color={colors.white} />
          </BoxButton>
        </Box>
        <Box>
          <BoxText>Combustível atual: Gasolina Adtivada</BoxText>
          <BoxButton>
            <FontAwesome5 name="edit" size={14} color={colors.white} />
          </BoxButton>
        </Box>
        <Box>
          <BoxText>
            Média de consumo: {'\n'}
            <BoxTextSmall>(02/11 até 02/01)</BoxTextSmall>
          </BoxText>
          <BoxBoard>
            41.22 {'\n'}
            km/l
          </BoxBoard>
        </Box>
        <ScrollView horizontal>
          <View>
            <TableLine>
              <Th>Data</Th>
              <Th size="s">Litros</Th>
              <Th size="s">Valor</Th>
              <Th size="l">Combustível</Th>
              <TdBtn />
            </TableLine>
            <TableLine>
              <Td>05/01/2021</Td>
              <Td size="s">35.77</Td>
              <Td size="s">30,12</Td>
              <Td size="l">Gasolina adtivada</Td>
              <TdBtn>
                <SmallButton color={colors.warning}>
                  <FontAwesome5 name="pen" size={10} color={colors.dark} />
                </SmallButton>
                <SmallButton color={colors.danger}>
                  <FontAwesome5 name="trash" size={10} color={colors.white} />
                </SmallButton>
              </TdBtn>
            </TableLine>
            <TableLine>
              <Td>05/01/2021</Td>
              <Td size="s">5.77</Td>
              <Td size="s">100,12</Td>
              <Td size="l">Disel</Td>
              <TdBtn>
                <SmallButton color={colors.warning}>
                  <FontAwesome5 name="pen" size={10} color={colors.dark} />
                </SmallButton>
                <SmallButton color={colors.danger}>
                  <FontAwesome5 name="trash" size={10} color={colors.white} />
                </SmallButton>
              </TdBtn>
            </TableLine>
            <TableLine>
              <Td>05/01/2021</Td>
              <Td size="s">5.77</Td>
              <Td size="s">30,12</Td>
              <Td size="l">Etanol</Td>
              <TdBtn>
                <SmallButton color={colors.warning}>
                  <FontAwesome5 name="pen" size={10} color={colors.dark} />
                </SmallButton>
                <SmallButton color={colors.danger}>
                  <FontAwesome5 name="trash" size={10} color={colors.white} />
                </SmallButton>
              </TdBtn>
            </TableLine>
            <TableLine>
              <Td>05/01/2021</Td>
              <Td size="s">5.77</Td>
              <Td size="s">30,12</Td>
              <Td size="l">Gasolina comum</Td>
              <TdBtn>
                <SmallButton color={colors.warning}>
                  <FontAwesome5 name="pen" size={10} color={colors.dark} />
                </SmallButton>
                <SmallButton color={colors.danger}>
                  <FontAwesome5 name="trash" size={10} color={colors.white} />
                </SmallButton>
              </TdBtn>
            </TableLine>
            <TableLine>
              <Td>05/01/2021</Td>
              <Td size="s">5.77</Td>
              <Td size="s">30,12</Td>
              <Td size="l">GNV</Td>
              <TdBtn>
                <SmallButton color={colors.warning}>
                  <FontAwesome5 name="pen" size={10} color={colors.dark} />
                </SmallButton>
                <SmallButton color={colors.danger}>
                  <FontAwesome5 name="trash" size={10} color={colors.white} />
                </SmallButton>
              </TdBtn>
            </TableLine>
            <TableLine last>
              <Td>05/01/2021</Td>
              <Td size="s">5.77</Td>
              <Td size="s">30,12</Td>
              <Td size="l">Etanol + Gasolina</Td>
              <TdBtn>
                <SmallButton color={colors.warning}>
                  <FontAwesome5 name="pen" size={10} color={colors.dark} />
                </SmallButton>
                <SmallButton color={colors.danger}>
                  <FontAwesome5 name="trash" size={10} color={colors.white} />
                </SmallButton>
              </TdBtn>
            </TableLine>
          </View>
        </ScrollView>
      </Container>
      <FloatButton
        onPress={() => {
          navigation.navigate('Create');
        }}>
        <FloatButtonText>
          <FontAwesome5 name="gas-pump" size={20} color={colors.white} />
        </FloatButtonText>
      </FloatButton>
    </>
  );
};

export default Home;
