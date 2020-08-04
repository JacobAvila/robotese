import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Lamparas(props) {
  const [lamp, setLamp] = React.useState(false);

  const toggleLamparas = () => {
    if (props.estatus) {
      setLamp(!lamp);
      props.ws.send('Lamparas');
    }
  };
  return (
    <View style={lamp ? styles.lampara_on : styles.lampara}>
      <TouchableOpacity onPress={() => toggleLamparas()}>
        <MaterialCommunityIcons
          name={lamp ? 'lightbulb-on' : 'lightbulb-outline'}
          size={lamp ? 41 : 40}
          color={lamp ? '#EEB33E' : 'white'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  lampara: {
    position: 'absolute',
    bottom: 175,
    right: 8,
  },
  lampara_on: {
    position: 'absolute',
    bottom: 179,
    right: 8,
  },
});
