/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Container from '../../components/Container';
import {realmRegister} from '../../services/RealmService';
import {colors} from '../../styles/colors';
import {fuels} from '../Create';
import {
  Box,
  BoxBoard,
  // BoxButton,
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

type averageProps = {
  firstDate: string;
  secondDate: string;
  value: number;
  fuel: number;
};

export interface Abastecimento {
  _id: string;
  full_tank: boolean;
  odometer: number;
  quantity: number;
  fuel: number;
  price: number;
  cost: number;
  brand: number;
  name: string;
}

const Home: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [registers, setRegisters] = useState<any>([]);
  const [odometer, setOdometer] = useState(0);
  const [average, setAverage] = useState<averageProps | null>(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const aux = async (): Promise<void> => {
        const realm = await realmRegister;
        const tasks = realm.objects('Register');
        setRegisters(tasks);
      };
      aux();
    }, []),
  );

  const deleteRegister = useCallback(async id => {
    const realm = await realmRegister;
    if (realm.objects('Register').filtered(`_id='${id}'`).length > 0) {
      realm.write(() => {
        realm.delete(realm.objects('Register').filtered(`_id ='${id}'`));
        const tasks = realm.objects('Register');
        setRegisters(tasks);
      });
    } else {
      // eslint-disable-next-line no-console
      console.error('Not find register id');
    }
  }, []);

  useEffect(() => {
    const registersArray = [];
    for (const val of registers) {
      registersArray.push(val);
    }
    // eslint-disable-next-line array-callback-return
    const registersSorted = registersArray.sort(
      (a, b) => Number(b._id) - Number(a._id),
    );

    setOdometer(registersSorted[0]?.odometer || 0);

    let current = {} as Abastecimento;
    let previous = {} as Abastecimento;
    for (const val of registersSorted) {
      previous = current;
      current = val;

      if (previous.full_tank && current.full_tank) {
        const diff = Number(previous.odometer) - Number(current.odometer);
        const avgNumber = diff / previous.quantity;
        setAverage({
          firstDate: current._id,
          secondDate: previous._id,
          value: avgNumber,
          fuel: current.fuel,
        });
        break;
      }
    }
  }, [registers]);

  const timeToHuman = useCallback(
    (time: string) =>
      new Date(Number(time)).toLocaleDateString('pt-BR', {timeZone: 'UTC'}),
    [],
  );
  return (
    <>
      <Container>
        <Box>
          <BoxText>Hodômetro (Quilometragem): {odometer}</BoxText>
          {/* <BoxButton>
            <FontAwesome5 name="edit" size={14} color={colors.white} />
          </BoxButton> */}
        </Box>
        <Box>
          <BoxText>Combustível Atual: Gasolina Adtivada</BoxText>
          {/* <BoxButton>
            <FontAwesome5 name="edit" size={14} color={colors.white} />
          </BoxButton> */}
        </Box>
        {average && (
          <Box>
            <BoxText>
              Média de consumo com {fuels[average.fuel - 1].label}: {'\n'}
              <BoxTextSmall>
                ({timeToHuman(average.firstDate)} até{' '}
                {timeToHuman(average.secondDate)})
              </BoxTextSmall>
            </BoxText>
            <BoxBoard>
              {average.value.toFixed(2)} {'\n'}
              km/l
            </BoxBoard>
          </Box>
        )}
        <ScrollView horizontal>
          <View>
            <TableLine>
              <Th>Data</Th>
              <Th size="s">Comp</Th>
              <Th size="l">Odômetro</Th>
              <Th size="s">Litros</Th>
              <Th size="s">Valor</Th>
              <Th size="l">Combustível</Th>
              <TdBtn />
            </TableLine>
            {registers.map((register: Abastecimento, index: number) => (
              <TableLine
                key={register._id}
                last={registers.length - 1 === index}>
                <Td>{timeToHuman(register._id)}</Td>
                <Td size="s">
                  {register.full_tank ? (
                    <FontAwesome5
                      name="gas-pump"
                      size={14}
                      color={colors.primary}
                    />
                  ) : (
                    <FontAwesome5
                      name="gas-pump"
                      size={14}
                      color={colors.secondary}
                    />
                  )}
                </Td>
                <Td size="l">{register.odometer}</Td>
                <Td size="s">{register.fuel}</Td>
                <Td size="s">{Number(register.price).toFixed(2)}</Td>
                <Td size="l">{fuels[register.fuel - 1].label}</Td>
                <TdBtn>
                  {/* <SmallButton color={colors.warning}>
                    <FontAwesome5 name="pen" size={10} color={colors.dark} />
                  </SmallButton> */}
                  <SmallButton
                    color={colors.danger}
                    onPress={() => {
                      deleteRegister(register._id);
                    }}>
                    <FontAwesome5 name="trash" size={10} color={colors.white} />
                  </SmallButton>
                </TdBtn>
              </TableLine>
            ))}
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
