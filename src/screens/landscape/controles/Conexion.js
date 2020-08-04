import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Conexion(props) {

  return (
    <View style={styles.adelante}>
      <TouchableOpacity onPress={() => props.callback()}>
        <MaterialCommunityIcons
          name={props.estatus ? 'lan-connect' : 'lan-disconnect'}
          size={27}
          color={props.estatus ? 'green' : 'red'}
          style={styles.iconEstado}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  adelante: {
    position: 'absolute',
    bottom: 190,
    left: 7,
    color: '#ffffff',
  },
});
