import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, Linking, Platform, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Ajustes from './controles/Ajustes';
import Video from './controles/Video';
import Audio from './controles/Audio';
import Lamparas from './controles/Lamparas';
import Conexion from './controles/Conexion';
import Adelante from './controles/Adelante';
import Detener from './controles/Detener';
import Atras from './controles/Atras';
import Derecha from './controles/Derecha';
import Izquierda from './controles/Izquierda';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function HomeLandscape({route, navigation}) {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const [conectado, setConectado] = React.useState(false);
  const [camara, setCamara] = React.useState('');
  const [robot, setRobot] = React.useState('');
  const [audio, setAudio] = React.useState(false);
  const [lamparas, setLamparas] = React.useState(0);
  const [mensaje, setMensaje] = React.useState('No Conectado');
  const [ws, setWs] = React.useState();
  const [estado, setEstado] = React.useState('No Conectado');

  const verAjustes = () => {
    navigation.navigate('Settings', {name: 'Mine'});
  };
  const obtenerDatos = async () => {
    const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
    const state = savedStateString ? JSON.parse(savedStateString) : undefined;
    if (state !== undefined) {
      setCamara(state.camara);
      setRobot(state.robot);
      setLamparas(state.lamparas);
      setAudio(state.audio);

      var wsLocal = new WebSocket('http://' + state.robot);
      wsLocal.onopen = () => {
        setConectado(true);
        setMensaje('Conectado');
      };
      wsLocal.onclose = e => {
        setConectado(false);
      };
      wsLocal.onerror = e => {
        console.log('error ' + e.data + ' ' + e.message);
        setConectado(false);
        Alert.alert(
          'Enlace al Robot',
          'Error en el enlace con el Robot, verifique la dirección: ' + robot,
        );
        setMensaje('No Conectado');
      };
      setWs(wsLocal);
    }
  };
  const iniciarConexion = async () => {
    if (ws !== undefined) {
      ws.close();
      setConectado(false);
      setMensaje('No Conectado');
      setWs(undefined);
    } else if (!conectado) {
      await obtenerDatos();
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
    <View style={styles.videoContainer}>
      <Video url={camara} />
      <Ajustes ajustes={() => verAjustes()} />
      <Audio url={audio} />
      <Lamparas ws={ws} estatus={conectado} />
      <Conexion callback={iniciarConexion} estatus={conectado} />
      <Adelante ws={ws} estatus={conectado} />
      <Detener ws={ws} estatus={conectado} />
      <Atras ws={ws} estatus={conectado} />
      <Derecha ws={ws} estatus={conectado} />
      <Izquierda ws={ws} estatus={conectado} />
    </View>
  );
}
const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  body: {
    backgroundColor: '#000000',
  },
  videoContainer: {
    backgroundColor: '#000000',
    alignContent: 'center',
    width: '100%',
    height: '100%',
  },
  video: {
    alignSelf: 'center',
    width: '85%',
    height: '100%',
  },
  colorW: {
    color: '#ffffff',
  },
});
