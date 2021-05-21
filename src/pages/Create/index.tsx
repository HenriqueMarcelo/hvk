import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import React, {useCallback, useRef} from 'react';
import {Button, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Container from '../../components/Container';
import Input from '../../components/Input';
import PickerSelect from '../../components/PickerSelect';
import {SubmitButton, SubmitButtonText} from './styles';

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

const Create: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const odometerInputRef = useRef<TextInput>(null);
  const quantityInputRef = useRef<TextInput>(null);
  const costInputRef = useRef<TextInput>(null);
  const priceInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(data => {
    console.log(data);
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
