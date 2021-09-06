import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

type ConfirmationButtonProps = RectButtonProps & {
  title: string;
};

export function ConfirmationButton({
  title,
  ...props
}: ConfirmationButtonProps) {
  return (
    <Container {...props}>
      <Title>{title}</Title>
    </Container>
  );
}
