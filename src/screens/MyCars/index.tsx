import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { AntDesign } from '@expo/vector-icons';
import { Loading } from '../../components/Loading';

type CarProps = {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
};

export function MyCars() {
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarProps[]>([]);

  const { goBack, navigate } = useNavigation();

  const theme = useTheme();

  function handleGoBack() {
    goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');

        setCars(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <BackButton
          color={theme.colors.background_secondary}
          onPress={handleGoBack}
        />

        <Title>Seus agendamentos, {'\n'}estão aqui.</Title>
        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>

      {isLoading ? (
        <Loading />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.text_detail}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
