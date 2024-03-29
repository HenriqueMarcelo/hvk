/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import {IconProps} from 'react-native-vector-icons/Icon';
import {ElementType} from 'react';
import {
  Container,
  ErrorMessage,
  iconStyles,
  Sufix,
  SufixText,
  TextInput,
} from './styles';
import {colors} from '../../styles/colors';

interface InputProps extends TextInputProps {
  name: string;
  containerStyle?: Record<string, unknown>;
  icon: ElementType;
  iconProps: IconProps;
  sufix?: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {name, icon, iconProps, containerStyle = {}, sufix, ...rest},
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const {registerField, defaultValue = '', fieldName, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const IconComponent = icon || Icon;

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useEffect(() => {
    inputValueRef.current.value = defaultValue;
  }, [defaultValue]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(reference: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({text: value});
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container
        style={containerStyle}
        isFocused={isFocused}
        isErrored={!!error}>
        <IconComponent
          {...iconProps}
          style={iconStyles.icon}
          size={20}
          color={
            isFocused || isFilled
              ? colors.primary
              : error
              ? colors.danger
              : colors.secondary
          }
        />

        <TextInput
          ref={inputElementRef}
          placeholderTextColor={colors.secondary}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />

        {sufix && (
          <Sufix>
            <SufixText>{sufix}</SufixText>
          </Sufix>
        )}
      </Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default forwardRef(Input);
