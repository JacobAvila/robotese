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
        <Ionicons name="ios-arrow-down" size={80} color={'#000000'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  atras: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
});
