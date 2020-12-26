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

const BackgroundLogin = '../../shared/img/BackgroundLogin2.jpg';
const LogoLogin = '../../shared/img/Logo.png';

export default class FirstComponent extends React.Component {
  
  render() {
    const {navigate} = this.props.navigation

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          hidden
        />
        <ImageBackground
          source={require(BackgroundLogin)}
          style={{flex: 1, width: '100%'}}>
          <View
            style={{
              position: 'absolute',
              top: 80,
              flex: 1,
              width: '100%',
            }}>
            <Image style={styles.logo} source={require(LogoLogin)} />
            <TouchableOpacity
              style={{
                backgroundColor: '#02e3d8',
                width: '80%',
                alignSelf: 'center',
                borderRadius: 20,
                marginBottom: 15,
              }}
              onPress={()=> navigate("Login")}
              >
              <Text
                style={{
                  marginVertical: 20,
                  fontSize: 30,
                  color: 'white',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  alignSelf: 'center',
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#37299e',
                width: '80%',
                alignSelf: 'center',
                borderRadius: 20,
              }}
              onPress={()=>navigate("Register")}
              >
              <Text
                style={{
                  marginVertical: 20,
                  fontSize: 30,
                  color: 'white',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  alignSelf: 'center',
                }}
                >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
