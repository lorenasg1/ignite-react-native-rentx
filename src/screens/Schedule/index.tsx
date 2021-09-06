import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import ArrowSvg from '../../assets/arrow.svg';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Calendar,
  DateProps,
  MarkedDateProps,
} from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';
import {
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Header,
  RentalPeriod,
  Title,
} from './styles';

type RentalPeriod = {
  formattedStart: string;
  formattedEnd: string;
};

type Params = {
  car: CarDTO;
};

export function Schedule() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DateProps>(
    {} as DateProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const { goBack, navigate } = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleGoBack() {
    goBack();
  }

  function handleConfirmSchedule() {
    navigate('ScheduleDetails', { car, dates: Object.keys(markedDates) });
  }

  function handleChangeDate(date: DateProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      formattedStart: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      formattedEnd: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <Header>
        <BackButton
          color={theme.colors.background_secondary}
          onPress={handleGoBack}
        />

        <Title>
          Escolha uma {'\n'}data de início e {'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.formattedStart}>
              {rentalPeriod.formattedStart}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.formattedEnd}>
              {rentalPeriod.formattedEnd}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button
          enabled={!!rentalPeriod.formattedEnd}
          title="Confirmar"
          onPress={handleConfirmSchedule}
        />
      </Footer>
    </Container>
  );
}
