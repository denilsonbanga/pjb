import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = ({ navigation }) => {

  state = {
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality['288p'],
    }
  };

  return (
    <RNCamera
      ref={ref => {
        camera = ref;
      }}
      style={{
        flex: 1,
        width: '100%',
      }}
      type={'back'}
      flashMode={'off'}
      autoFocus={'on'}
      zoom={0}
      whiteBalance={'auto'}
      ratio={'16:9'}
      focusDepth={0}
      trackingEnabled
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}

      onTextRecognized={({ textBlocks }) => { console.log(textBlocks) }}
    ></RNCamera>
  );
};

const styles = StyleSheet.create({});

export default CameraScreen;