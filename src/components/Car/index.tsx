import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import {
  About,
  Brand,
  Container,
  Details,
  Name,
  Period,
  Price,
  Rent,
  Thumbnail,
  Type,
} from './styles';

type CarProps = RectButtonProps & {
  data: CarDTO;
};

export function Car({ data, ...props }: CarProps) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...props}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <Thumbnail resizeMode="contain" source={{ uri: data.thumbnail }} />
    </Container>
  );
}
