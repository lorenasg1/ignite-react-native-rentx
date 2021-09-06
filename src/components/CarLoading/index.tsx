import React from 'react';
import LottieView from 'lottie-react-native';

import { Container } from './styles';

export function CarLoading() {
  return (
    <Container>
      <LottieView
        source={require('../../assets/car_loading.json')}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
