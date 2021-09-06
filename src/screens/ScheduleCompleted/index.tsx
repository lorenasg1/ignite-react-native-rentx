import React from 'react';
import { useWindowDimensions } from 'react-native';
import DoneSvg from '../../assets/done.svg';
import LogoSvg from '../../assets/logo_background_gray.svg';
import { ConfirmationButton } from '../../components/ConfirmationButton';
import { Container, Content, Title, Message, Footer } from './styles';
import { useNavigation } from '@react-navigation/native';

type NavigationProps = {
  navigate: (screen: string) => void;
};

export function ScheduleCompleted() {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation<NavigationProps>();

  function handleGoHome() {
    navigate('Home');
  }

  return (
    <Container>
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir {'\n'}
          até a concessonária da RentX {'\n'}
          pegar o seu automóvel.
        </Message>

        <Footer>
          <ConfirmationButton title="OK" onPress={handleGoHome} />
        </Footer>
      </Content>
    </Container>
  );
}
