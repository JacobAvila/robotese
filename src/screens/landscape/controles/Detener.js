import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Detener(props) {
  const detener = () => {
    if (props.estatus) {
      props.ws.send('0');
    }
  };
  return (
    <View style={styles.detener}>
      <TouchableOpacity onPress={() => detener()}>
        <Ionicons name="ios-close-circle" size={40} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  detener: {
    position: 'absolute',
    bottom: 60,
    left: 7,
    color: '#ffffff',
  },
});
