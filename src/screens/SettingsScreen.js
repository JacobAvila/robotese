import 'react-native-gesture-handler';
import React from 'react';
import {Dimensions, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsPortrait from './portrait/SettingsPortrait';

const SessingsStack = createStackNavigator();
export default function SettingsScreen({route, navigation}) {
  const [orientation, setOrientation] = React.useState('portrait');

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };
  Dimensions.addEventListener('change', () => {
    setOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  return (
    <SessingsStack.Navigator>
      <SessingsStack.Screen
        name="SettingsPortrait"
        component={SettingsPortrait}
        options={{
          title: 'Ajustes',
          headerStyle: {
            backgroundColor: '#227EB6',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <Image
              source={require('../images/robot.png')}
              style={{marginRight: 10}}
            />
          ),
        }}
        initialParams={{name: route.params.name}}
      />
    </SessingsStack.Navigator>
  );
}
