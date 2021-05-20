/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, {ElementType, useEffect, useRef, useState} from 'react';
import Picker, {PickerSelectProps} from 'react-native-picker-select';
import {useField} from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import {IconProps} from 'react-native-vector-icons/Icon';

import {Container, pickerStyles} from './styles';
import {colors} from '../../styles/colors';

interface Props extends Omit<PickerSelectProps, 'onValueChange'> {
  name: string;
  containerStyle: Record<string, unknown>;
  icon: ElementType;
  iconProps: IconProps;
  placeholder: string;
}

const PickerSelect: ElementType = ({
  name,
  icon,
  iconProps,
  containerStyle = {},
  placeholder,
  items,
}: Props) => {
  const pickerRef = useRef(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const IconComponent = icon || Icon;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      getValue: ref => ref.props.value || '',
      clearValue: ref => {
        ref.props.onValueChange(ref.props.placeholder.value);
      },
      setValue: (_, value: string) => {
        setSelectedValue(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <IconComponent
        {...iconProps}
        style={{marginRight: 16}}
        size={20}
        color={isFocused || selectedValue ? colors.primary : colors.secondary}
      />

      <Picker
        onOpen={() => setIsFocused(true)}
        onClose={() => setIsFocused(false)}
        useNativeAndroidPickerStyle={false}
        ref={pickerRef}
        value={selectedValue}
        onValueChange={setSelectedValue}
        items={items}
        style={pickerStyles}
        placeholder={{
          label: placeholder,
          color: colors.secondary,
        }}
      />
    </Container>
  );
};

export default PickerSelect;
