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
        <Ionicons name="ios-square-outline" size={80} color={'#000000'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  detener: {
    alignSelf: 'center',
  },
});
