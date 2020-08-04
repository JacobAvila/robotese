import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Adelante(props) {
  const adelante = () => {
    if (props.estatus) {
      props.ws.send('1');
    }
  };
  return (
    <View style={styles.adelante}>
      <TouchableOpacity onPress={() => adelante()}>
        <Ionicons name="ios-arrow-dropup-circle" size={40} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  adelante: {
    position: 'absolute',
    bottom: 110,
    left: 7,
    color: '#ffffff',
  },
});
