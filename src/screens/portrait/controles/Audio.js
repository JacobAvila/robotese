import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AudioViewer from '../../../components/AudioViewer';
import AsyncStorage from '@react-native-community/async-storage';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function Audio(props) {
  const [volumen, setVolumen] = React.useState(false);
  const [url, setUrl] = React.useState('');

  const toggleAudio = async () => {
    if (!volumen) {
      const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
      const state = savedStateString ? JSON.parse(savedStateString) : undefined;
      if (state !== undefined) {
        setUrl(state.audio);
        setVolumen(true);
      }
    } else {
      setVolumen(false);
    }
  };
  return (
    <View style={styles.audio}>
      <TouchableOpacity onPress={() => toggleAudio()}>
        <View style={styles.vista}>
          <Ionicons
            name={volumen ? 'md-volume-high' : 'md-volume-mute'}
            size={35}
            color={'#ffffff'}
          />
        </View>
      </TouchableOpacity>
      {volumen ? (
        <AudioViewer url={'http://' + url} salida={setVolumen} />
      ) : (
        <Text />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    width: 43,
    height: 34,
    backgroundColor: '#2393DF',
    marginTop: 0,
  },
  audio: {
    position: 'absolute',
    top: 1,
    left: 12,
  },
});
