import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import React, {useCallback, useRef, useState} from 'react';
import {Switch, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Yup from 'yup';
import Container from '../../components/Container';
import Input from '../../components/Input';
import InputSwitch from '../../components/InputSwitch';
import PickerSelect from '../../components/PickerSelect';
import {colors} from '../../styles/colors';
import {SubmitButton, SubmitButtonText, SwitchText, SwitchView} from './styles';

const fuels = [
  {label: 'Gasolina Comum', value: 'common_gasoline', key: 1},
  {label: 'Gasolina Adtivada', value: 'additive_gasoline', key: 2},
  {label: 'Gasolina Premium', value: 'premium_gasoline', key: 3},
  {label: 'Etanol', value: 'ethanol', key: 4},
  {label: 'Etanol + Gasolina', value: 'ethanol_gasoline', key: 5},
  {label: 'GNV', value: 'cng', key: 6},
  {label: 'Disel', value: 'disel', key: 7},
];
const brands = [
  {label: 'Shell', value: 'shell', key: 1},
  {label: 'Petrobras', value: 'petrobras', key: 2},
  {label: 'Ipiranga', value: 'ipiranga', key: 3},
  {label: 'Ale', value: 'ale', key: 4},
  {label: 'Outro', value: 'other', key: 5},
];

interface Errors {
  [key: string]: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
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

const checkboxOptions: CheckboxOption[] = [
  {id: 'is_active', value: 'is_active', label: 'Ativo'},
];

const Create: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const odometerInputRef = useRef<TextInput>(null);
  const quantityInputRef = useRef<TextInput>(null);
  const costInputRef = useRef<TextInput>(null);
  const priceInputRef = useRef<TextInput>(null);

  const [fullTank, setFullTank] = useState(false);

  const handleSubmit = useCallback(async data => {
    try {
      const shape: any = {
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
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        formRef.current?.setErrors(getValidationErrors(err));
      }
    }
  }, []);

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
          <SwitchText>Tanque cheio: </SwitchText>
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
