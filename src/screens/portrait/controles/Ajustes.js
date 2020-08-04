import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Ajustes(props) {
  return (
    <View style={styles.ajustes}>
      <TouchableOpacity onPress={() => props.ajustes()}>
        <Ionicons name="md-settings" size={30} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ajustes: {
    position: 'absolute',
    top: 2,
    right: 15,
    color: '#000000',
  },
});
