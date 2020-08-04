import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Izquierda(props) {
  const izquierda = () => {
    if (props.estatus) {
      props.ws.send('6');
    }
  };
  return (
    <View style={styles.izquierda}>
      <TouchableOpacity onPress={() => izquierda()}>
        <Ionicons name="ios-arrow-back" size={80} color={'#000000'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  izquierda: {
    alignSelf: 'flex-start',
  },
});
