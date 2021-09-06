import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

type ButtonProps = RectButtonProps & {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
};

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  ...props
}: ButtonProps) {
  const theme = useTheme();

  return (
    <Container
      enabled={enabled}
      color={color}
      {...props}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
