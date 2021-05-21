/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, {ElementType, useEffect, useRef, useState} from 'react';
import {Picker, PickerProps} from '@react-native-picker/picker';
import {useField} from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import {IconProps} from 'react-native-vector-icons/Icon';
import {pickerStyles} from './styles';
import {colors} from '../../styles/colors';
import {Container, ErrorMessage, iconStyles} from '../Input/styles';

export interface PickerPropsFix extends PickerProps {
  onFocus: () => null;
  onBlue: () => null;
}

interface Props extends PickerProps {
  name: string;
  containerStyle?: Record<string, unknown>;
  icon: ElementType;
  iconProps: IconProps;
  placeholder: string;
  items: ItemProps[];
}

interface ItemProps {
  label: string;
  value: string;
  key: string | number;
}

interface InputValueReference {
  value: string;
}

const PickerSelect: React.FC<Props> = ({
  name,
  icon,
  iconProps,
  containerStyle = {},
  placeholder,
  items,
}) => {
  const {fieldName, registerField, defaultValue = '', error} = useField(name);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});

  const IconComponent = icon || Icon;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      getValue: () => inputValueRef.current.value,
      clearValue: () => {
        setSelectedValue('');
      },
      setValue: (_, value: string) => setSelectedValue(`${value}`),
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    inputValueRef.current.value = selectedValue;
  }, [selectedValue]);

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
          color={isFocused || selectedValue ? colors.primary : colors.secondary}
        />

        <Picker
          // ref={pickerRef}
          style={pickerStyles.picker}
          selectedValue={selectedValue}
          onValueChange={itemValue => {
            setSelectedValue(itemValue);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}>
          <Picker.Item
            label={placeholder}
            style={
              selectedValue
                ? pickerStyles.placeholder
                : pickerStyles.placeholderSelected
            }
          />
          {items.map((item: ItemProps) => (
            <Picker.Item
              label={item.label}
              value={item.value}
              key={item.key}
              style={
                selectedValue === item.value
                  ? pickerStyles.optionSelected
                  : pickerStyles.option
              }
            />
          ))}
        </Picker>
      </Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default PickerSelect;
