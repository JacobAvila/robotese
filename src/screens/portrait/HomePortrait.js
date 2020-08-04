import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import Ajustes from './controles/Ajustes';
import Video from './controles/Video';
import Audio from './controles/Audio';
import Lamparas from './controles/Lamparas';
import Adelante from './controles/Adelante';
import Izquierda from './controles/Izquierda';
import Detener from './controles/Detener';
import Derecha from './controles/Derecha';
import Atras from './controles/Atras';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function HomePortrait({route, navigation}) {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const [conectado, setConectado] = React.useState(false);
  const [camara, setCamara] = React.useState('localhost');
  const [robot, setRobot] = React.useState('localhost');
  const [lamparas, setLamparas] = React.useState(0);
  const [audio, setAudio] = React.useState('');
  const [mensaje, setMensaje] = React.useState('No Conectado');
  const [ws, setWs] = React.useState();
  const [estado, setEstado] = React.useState(false);

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
      setEstado(state.estado);

      var wsLocal = new WebSocket('http://' + state.robot);
      wsLocal.onopen = () => {
        setConectado(true);
        setEstado(true);
        setMensaje('Conectado');
        actualizarState();
      };
      wsLocal.onclose = e => {
        setConectado(false);
        setEstado(false);
      };
      wsLocal.onerror = e => {
        console.log('error ' + e.data + ' ' + e.message);
        setConectado(false);
        setEstado(false);
        Alert.alert(
          'Enlace al Robot',
          'Error en el enlace con el Robot, verifique la dirección: ' + robot,
        );
        setMensaje('No Conectado');
      };
      /*
      wsLocal.onmessage = e => {
        console.log(e.data);
        switch (e.data) {
          case '0':
            toggleLamparas();
            break;
          case '1':
            toggleLamparas();
            break;
        }
      };
      */
      setWs(wsLocal);
      //setConectado(true);
      //setMensaje('Conectado');
    }
  };
  const iniciarConexion = async () => {
    if (ws !== undefined) {
      ws.close();
      setConectado(false);
      setEstado(false);
      setMensaje('No Conectado');
      setWs(undefined);
    } else if (!conectado) {
      await obtenerDatos();
    }
  };
  const actualizarState = async () => {
    const state = {
      camara: camara,
      audio: audio,
      robot: robot,
      lamparas: lamparas,
      estado: true,
    };
    setEstado(true);
    AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
    setMensaje(estado ? 'estado con' : 'estado no con');
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
            setEstado(state.estado);
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
        <View style={styles.videoContainer}>
          <Video url={camara} />
        </View>
        <View>
          <View style={styles.controlesAjustes}>
            <Ajustes ajustes={() => verAjustes()} />
            <Audio url={audio} />
            <Lamparas ws={ws} estatus={conectado} />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Adelante ws={ws} estatus={conectado} />
        </View>
        <View style={styles.sectionContainer2}>
          <Izquierda ws={ws} estatus={conectado} />
          <Detener ws={ws} estatus={conectado} />
          <Derecha ws={ws} estatus={conectado} />
        </View>
        <View style={styles.sectionContainer}>
          <Atras ws={ws} estatus={conectado} />
        </View>
        <View style={styles.sectionEstado}>
          <TouchableOpacity onPress={() => iniciarConexion()}>
            <Text>
              <MaterialCommunityIcons
                name={conectado ? 'lan-connect' : 'lan-disconnect'}
                size={27}
                color={conectado ? 'green' : 'red'}
                style={styles.iconEstado}
              />
              <Text> </Text>
              Estado: {mensaje}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
  videoContainer: {
    flex: 0,
    width: undefined,
  },
  controlesAjustes: {
    flexDirection: 'column',
    backgroundColor: '#2393DF',
    width: '100%',
    height: 35,
    alignContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 15,
    paddingHorizontal: 24,
  },
  sectionContainer2: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 28,
    width: '100%',
    justifyContent: 'space-between',
  },
  sectionEstado: {
    marginTop: 12,
    flexDirection: 'column',
    paddingHorizontal: 24,
    width: '100%',
    height: 35,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  iconEstado: {
    alignSelf: 'stretch',
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
