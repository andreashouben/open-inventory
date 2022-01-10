import {Button, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import {BarCodeScanningResult, Camera} from "expo-camera";
import {AutoFocus} from "expo-camera/build/Camera.types";


// noinspection JSUnusedGlobalSymbols
export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({type, data}:BarCodeScanningResult) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
      <View style={styles.container}>
        <Camera
            autoFocus={AutoFocus.on}
            focusDepth={1}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.camera}
                />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,



    justifyContent: 'center',
  },
  camera: {
    flex: 0.2
  }
});
