import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Atras(props) {
  const atras = () => {
    if (props.estatus) {
      props.ws.send('4');
    }
  };
  return (
    <View style={styles.atras}>
      <TouchableOpacity onPress={() => atras()}>
        <Ionicons
          name="ios-arrow-dropdown-circle"
          size={40}
          color={'#ffffff'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  atras: {
    position: 'absolute',
    bottom: 10,
    left: 7,
    color: '#ffffff',
  },
});
