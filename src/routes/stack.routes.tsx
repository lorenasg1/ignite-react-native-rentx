import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CarDetails } from '../screens/CarDetails';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Schedule } from '../screens/Schedule';
import { ScheduleCompleted } from '../screens/ScheduleCompleted';
import { ScheduleDetails } from '../screens/ScheduleDetails';
import { Splash } from '../screens/Splash';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Splash" component={Splash} />
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Schedule" component={Schedule} />
      <Screen name="ScheduleDetails" component={ScheduleDetails} />
      <Screen name="ScheduleCompleted" component={ScheduleCompleted} />
    </Navigator>
  );
}
