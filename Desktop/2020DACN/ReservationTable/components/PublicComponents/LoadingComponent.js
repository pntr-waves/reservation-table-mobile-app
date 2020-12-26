import React from 'react';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';

const COLOR_HEADER = '#e63946';
const COLOR_FONT = '#000000';

const styles = StyleSheet.create({
  loadingView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export const Loading = ({color}) => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" color={color? color : COLOR_HEADER} />
      <Text style={[styles.loadingText, {color: color? color : COLOR_HEADER}]}>Loading ...</Text>
    </View>
  );
};

export const LoadingSearch = () => {
  return(
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" color={COLOR_FONT} />
    </View>
  )
}

