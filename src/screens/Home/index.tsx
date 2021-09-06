import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import LogoSvg from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { CarLoading } from '../../components/CarLoading';
import { Loading } from '../../components/Loading';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import {
  AvailableCars,
  CarList,
  Container,
  Header,
  HeaderContent,
} from './styles';

type Car = CarDTO;

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);
export function Home() {
  const theme = useTheme();
  const { navigate } = useNavigation();

  const [cars, setCars] = useState<Car[]>();
  const [loading, setLoading] = useState(true);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  function handleCarDetails(car: CarDTO) {
    navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');

        setCars(response.data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  });

  return (
    <Container>
      <Header>
        <HeaderContent>
          <LogoSvg width={RFValue(108)} height={RFValue(12)} />
          {!loading && (
            <AvailableCars>{cars?.length} carros disponíveis</AvailableCars>
          )}
        </HeaderContent>
      </Header>

      {loading ? (
        <CarLoading />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={myCarsButtonStyle}>
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.main,
              },
            ]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.background_secondary}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 13,
    right: 22,
  },
});
