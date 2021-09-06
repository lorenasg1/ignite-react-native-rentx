import React from 'react';

import { Container } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

type BackButtonProps = BorderlessButtonProps & {
  color?: string;
};

export function BackButton({ color, ...props }: BackButtonProps) {
  const theme = useTheme();

  return (
    <Container {...props}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}
