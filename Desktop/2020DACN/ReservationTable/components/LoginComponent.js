import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';

const style = StyleSheet.create({
  loadingView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#512DA8',
  },
});

export const Loading = () => {
  return (
    <View style={style.loadingView}>
      <ActivityIndicator size="large" color="#512DA8" />
      <Text style={style.loadingText}>Loading...</Text>
    </View>
  );
};
