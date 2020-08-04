import 'react-native-gesture-handler';
import React from 'react';
import {Dimensions, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomePortrait from './portrait/HomePortrait';
import HomeLandscape from './landscape/HomeLandscape';

const HomeStack = createStackNavigator();
export default function HomeScreen({route, navigation}) {
  const [orientation, setOrientation] = React.useState('portrait');

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  Dimensions.addEventListener('change', () => {
    setOrientation(isPortrait() ? 'portrait' : 'landscape');
  });

  if (orientation === 'portrait') {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="HomePortrait"
          options={{
            title: 'Navegación',
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
          component={HomePortrait}
          initialParams={{estado: route.params.estado}}
        />
      </HomeStack.Navigator>
    );
  } else {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="HomeLandscape"
          component={HomeLandscape}
          options={{headerShown: false}}
          initialParams={{estado: route.params.estado}}
        />
      </HomeStack.Navigator>
    );
  }
}
