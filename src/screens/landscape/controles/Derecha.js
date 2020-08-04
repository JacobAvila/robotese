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
      <TouchableOpacity
        onPress={() => derecha()}>
        <Ionicons
          name="ios-arrow-dropright-circle"
          size={40}
          color={'#ffffff'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  derecha: {
    position: 'absolute',
    bottom: 70,
    right: 8,
    color: '#ffffff',
  },
});
