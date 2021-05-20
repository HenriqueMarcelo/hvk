import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import React, {useRef, useState} from 'react';
import {Button, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {Picker} from '@react-native-picker/picker';
import Container from '../../components/Container';
import Input from '../../components/Input';
import PickerSelect from '../../components/PickerSelect';

const Create: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const itemsTest = [
    {label: '1', value: '1', key: 1},
    {label: '2', value: '2', key: 2},
    {label: '3', value: '3', key: 3},
    {label: '4', value: '4', key: 4},
  ];
  return (
    <Container>
      <Form
        initialData={{}}
        ref={formRef}
        onSubmit={a => {
          console.log(a);
        }}
        style={{paddingLeft: 18, paddingRight: 18}}>
        <Button
          onPress={() => formRef?.current?.submitForm()}
          title="console.log"
        />

        <PickerSelect
          placeholder="Escolha o posto"
          name="teste"
          items={itemsTest}
          useNativeAndroidPickerStyle={false}
          icon={Icon}
          iconProps={{
            name: 'star',
          }}
        />
        <Input
          placeholder="Litros"
          name="user"
          containerStyle={{marginTop: 0}}
          icon={Icon}
          iconProps={{
            name: 'sun',
          }}
          returnKeyType="next"
          onSubmitEditing={() => {
            emailInputRef.current?.focus();
          }}
        />
        <Input
          ref={emailInputRef}
          placeholder="Litros"
          name="email"
          containerStyle={{marginTop: 0}}
          icon={Icon}
          iconProps={{
            name: 'flag',
          }}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInputRef.current?.focus();
          }}
        />
        <Input
          ref={passwordInputRef}
          placeholder="LA"
          name="aba"
          containerStyle={{marginTop: 0}}
          icon={FontAwesome5}
          iconProps={{
            name: 'user',
          }}
          returnKeyType="send"
        />
      </Form>
    </Container>
  );
};
export default Create;
