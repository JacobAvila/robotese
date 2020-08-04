import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import MJPEGViewer from '../../../components/MJPEGViewer';
import AsyncStorage from '@react-native-community/async-storage';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function Video(props) {
  const [conectado, setConectado] = React.useState(false);
  const [url, setUrl] = React.useState('');

  const toggleVideo = async () => {
    if (!conectado) {
      const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
      const state = savedStateString ? JSON.parse(savedStateString) : undefined;
      if (state !== undefined) {
        setUrl(state.camara);
        setConectado(true);
      }
    } else {
      setConectado(false);
    }
  };
  return (
    <View style={styles.video}>
      {conectado ? (
        <MJPEGViewer url={'http://' + url} salida={setConectado} />
      ) : (
        <TouchableOpacity onPress={() => toggleVideo()}>
          <Image
            source={require('../../../images/play_video.png')}
            style={styles.imageContainer}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 270,
  },
  imageContainer: {
    width: '100%',
    height: 270,
  },
});
