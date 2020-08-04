import * as React from 'react';
import {WebView} from 'react-native-webview';
import {Alert} from 'react-native';

export default function MJPEGViewer(props) {
  //style={{width:'100%', height: '90%'}}
  return (
    <WebView
      automaticallyAdjustContentInsets={true}
      scalesPageToFit={true}
      startInLoadingState={false}
      contentInset={{top: 0, right: 0, left: 0, bottom: 0}}
      scrollEnabled={false}
      allowsFullscreenVideo={true}
      allowsInlineMediaPlayback={true}
      overScrollMode={'never'}
      contentInsetAdjustmentBehavior={'always'}
      allowsBackForwardNavigationGestures={true}
      source={{uri: props.url}}
      onError={() => {
        props.salida(false);
        Alert.alert(
          'Conexión de Video',
          'Error en la conexión de Video: ' + props.url,
        );
      }}
      onHttpError={() => {
        props.salida(false);
        Alert.alert(
          'Conexión de Video',
          'Error en la conexión http de Video: ' + props.url,
        );
      }}
    />
  );
}
