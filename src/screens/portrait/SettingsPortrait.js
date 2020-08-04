import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  Linking,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function SettingsPortrait({route, navigation}) {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const [camara, setCamara] = React.useState('');
  const [robot, setRobot] = React.useState('');
  const [lamparas, setLamparas] = React.useState('');
  const [audio, setAudio] = React.useState('');
  const [mensaje, setMensaje] = React.useState('No Conectado');
  const [ws, setWs] = React.useState();

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width ? 'portrait' : 'landscape';
  };
  const conectar = () => {
    const state = {
      camara: camara,
      audio: audio,
      robot: robot,
      lamparas: lamparas,
      estado: false,
    };
    AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
    if (isPortrait() === 'portrait') {
      navigation.navigate('HomePortrait', {estado: JSON.stringify(state)});
    } else {
      navigation.navigate('HomeLandscape', {estado: JSON.stringify(state)});
    }
  };
  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
            setCamara(state.camara);
            setAudio(state.audio);
            setRobot(state.robot);
            setLamparas(state.lamparas);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Parámetros de conexión</Text>
        <View style={styles.sectionContainer}>
          <Text>Cámara </Text>
          <TextInput
            style={styles.campo}
            value={camara}
            onChangeText={setCamara}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text>Audio </Text>
          <TextInput
            style={styles.campo}
            value={audio}
            onChangeText={setAudio}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text>Robot</Text>
          <TextInput
            style={styles.campo}
            value={robot}
            onChangeText={setRobot}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text>Lamparas (min)</Text>
          <TextInput
            style={styles.campo}
            value={lamparas}
            onChangeText={setLamparas}
          />
        </View>
        <View style={styles.sectionButton}>
          <Button title="Guardar" onPress={conectar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 32,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    flex: 0,
    flexDirection: 'row',

    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  campo: {
    width: '85%',
    height: 35,
    padding: 10,
    backgroundColor: 'white',
    marginLeft: 5,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  sectionButton: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 32,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
