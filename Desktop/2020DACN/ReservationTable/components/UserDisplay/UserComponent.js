import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
    

export default class UserComponent extends React.Component {
  
  render() {
    const {navigate} = this.props.navigation

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          hidden
        />
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 128,
    width: 250,
    marginVertical: 10,
    alignSelf: 'center',
    marginBottom: 60, 
  },
});
