import * as React from 'react';
import {StyleSheet, Alert} from 'react-native';
import {WebView} from 'react-native-webview';

export default function AudioViewer(props) {
  return (
    <WebView
      style={[styles.videoContainer]}
      automaticallyAdjustContentInsets={true}
      scalesPageToFit={true}
      startInLoadingState={false}
      contentInset={{top: 0, right: 0, left: 0, bottom: 0}}
      scrollEnabled={false}
      source={{uri: props.url}}
      onError={() => {
        props.salida(false);
        Alert.alert(
          'Conexión de Audio',
          'Error en la conexión de Audio: ' + props.url,
        );
      }}
      onHttpError={() => {
        props.salida(false);
        Alert.alert(
          'Conexión de Audio',
          'Error en la conexión http de Audio: ' + props.url,
        );
      }}
      
    />
  );
}

var styles = StyleSheet.create({
  videoContainer: {
    width: '1%',
    height: '1%',
  },
});
