import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Derecha(props) {
  const derecha = () => {
    if (props.estatus) {
      props.ws.send('5');
    }
  };
  return (
    <View style={styles.derecha}>
      <TouchableOpacity onPress={() => derecha()}>
        <Ionicons name="ios-arrow-forward" size={80} color={'#000000'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  derecha: {
    alignSelf: 'flex-end',
  },
});
