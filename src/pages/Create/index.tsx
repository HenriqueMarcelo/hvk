import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import React, {useCallback, useRef, useState} from 'react';
import {Switch, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Yup from 'yup';
import Container from '../../components/Container';
import Input from '../../components/Input';
import PickerSelect from '../../components/PickerSelect';
import {realmRegister} from '../../services/RealmService';
import {colors} from '../../styles/colors';
import {SubmitButton, SubmitButtonText, SwitchText, SwitchView} from './styles';

export const fuels = [
  {label: 'Gasolina Comum', value: '1', key: 1},
  {label: 'Gasolina Adtivada', value: '2', key: 2},
  {label: 'Gasolina Premium', value: '3', key: 3},
  {label: 'Etanol', value: '4', key: 4},
  {label: 'Etanol + Gasolina', value: '5', key: 5},
  {label: 'GNV', value: '6', key: 6},
  {label: 'Disel', value: '7', key: 7},
];
const brands = [
  {label: 'Shell', value: '1', key: 1},
  {label: 'Petrobras', value: '2', key: 2},
  {label: 'Ipiranga', value: '3', key: 3},
  {label: 'Ale', value: '4', key: 4},
  {label: 'Outro', value: '5', key: 5},
];

interface Errors {
  [key: string]: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}
export interface ObjectAny {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const getValidationErrors = (err: Yup.ValidationError): Errors => {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });

  return validationErrors;
};

const Create: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const odometerInputRef = useRef<TextInput>(null);
  const quantityInputRef = useRef<TextInput>(null);
  const costInputRef = useRef<TextInput>(null);
  const priceInputRef = useRef<TextInput>(null);

  const [fullTank, setFullTank] = useState(false);

  const handleSubmit = useCallback(
    async data => {
      try {
        const shape: ObjectAny = {
          fuel: Yup.string().required('Informe o combustível'),
          odometer: Yup.string().required('Informe o valor do hodômetro'),
        };
        if (
          !(
            (data.quantity && data.cost) ||
            (data.quantity && data.price) ||
            (data.cost && data.price)
          )
        ) {
          if (!data.quantity) {
            shape.quantity = Yup.string().required(
              'Informe a quantidade abastecida',
            );
          } else {
            shape.quantity = Yup.number().typeError(
              'O valor informado não é um número',
            );
          }
          if (!data.cost) {
            shape.cost = Yup.string().required('Informe o valor total');
          } else {
            shape.cost = Yup.number().typeError(
              'O valor informado não é um número',
            );
          }
          if (!data.price) {
            shape.price = Yup.string().required('Informe o preço por litro');
          } else {
            shape.price = Yup.number().typeError(
              'O valor informado não é um número',
            );
          }
        }
        const schema = Yup.object().shape(shape);
        await schema.validate(data, {
          abortEarly: false,
        });
        const realm = await realmRegister;
        let task1: ObjectAny;
        const calculateQuantity = data.quantity
          ? data.quantity
          : data.cost / data.price;
        const calculatePrice = data.price
          ? data.price
          : data.cost / data.quantity;
        const calculateCost = data.cost
          ? data.cost
          : data.price * data.quantity;
        try {
          realm.write(async () => {
            const uniqueId = +new Date();
            task1 = realm.create('Register', {
              _id: uniqueId,
              full_tank: fullTank,
              fuel: Number(data.fuel),
              brand: Number(data.brand),
              name: data.name,
              odometer: data.odometer,
              quantity: `${calculateQuantity}`,
              cost: `${calculateCost}`,
              price: `${calculatePrice}`,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
            // eslint-disable-next-line no-console
            console.log(`created obj`, task1);
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('Erro aqui', e);
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
        }
      }
    },
    [fullTank],
  );

  const handleClick = useCallback(() => {
    formRef?.current?.submitForm();
  }, []);
  return (
    <Container>
      <Form
        initialData={{}}
        ref={formRef}
        onSubmit={data => handleSubmit(data)}
        style={{paddingLeft: 18, paddingRight: 18}}>
        <PickerSelect
          placeholder="Combustível"
          name="fuel"
          items={fuels}
          icon={FontAwesome5}
          iconProps={{
            name: 'gas-pump',
          }}
        />

        <PickerSelect
          placeholder="Bandeira"
          name="brand"
          items={brands}
          icon={FontAwesome5}
          iconProps={{
            name: 'flag',
          }}
        />
        <Input
          placeholder="Nome do Posto"
          name="name"
          containerStyle={{marginTop: 0}}
          icon={Icon}
          iconProps={{
            name: 'tag',
          }}
          returnKeyType="next"
          onSubmitEditing={() => {
            odometerInputRef.current?.focus();
          }}
        />
        <SwitchView>
          <SwitchText>Tanque cheio:</SwitchText>
          <Switch
            style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
            trackColor={{false: colors.secondary, true: colors.secondary}}
            thumbColor={fullTank ? colors.primary : colors.white}
            ios_backgroundColor={colors.primary}
            onValueChange={() => {
              setFullTank(!fullTank);
            }}
            value={fullTank}
          />
        </SwitchView>
        <Input
          placeholder="Hodômetro Total"
          name="odometer"
          containerStyle={{marginTop: 0}}
          icon={FontAwesome5}
          iconProps={{
            name: 'tachometer-alt',
          }}
          keyboardType="decimal-pad"
          returnKeyType="next"
          onSubmitEditing={() => {
            quantityInputRef.current?.focus();
          }}
          ref={odometerInputRef}
          sufix="Kilômetros"
        />
        <Input
          placeholder="Quantidade"
          name="quantity"
          containerStyle={{marginTop: 0}}
          icon={FontAwesome5}
          iconProps={{
            name: 'tint',
          }}
          keyboardType="decimal-pad"
          returnKeyType="next"
          ref={quantityInputRef}
          onSubmitEditing={() => {
            costInputRef.current?.focus();
          }}
          sufix="Litros"
        />
        <Input
          placeholder="Valor Total"
          name="cost"
          containerStyle={{marginTop: 0}}
          icon={FontAwesome5}
          iconProps={{
            name: 'file-invoice-dollar',
          }}
          keyboardType="decimal-pad"
          returnKeyType="next"
          ref={costInputRef}
          onSubmitEditing={() => {
            priceInputRef.current?.focus();
          }}
        />
        <Input
          placeholder="Preço por litro"
          name="price"
          containerStyle={{marginTop: 0}}
          icon={FontAwesome5}
          iconProps={{
            name: 'dollar-sign',
          }}
          keyboardType="decimal-pad"
          returnKeyType="done"
          ref={priceInputRef}
          onSubmitEditing={handleClick}
        />

        <SubmitButton onPress={handleClick}>
          <SubmitButtonText>Salvar</SubmitButtonText>
        </SubmitButton>
      </Form>
    </Container>
  );
};
export default Create;
