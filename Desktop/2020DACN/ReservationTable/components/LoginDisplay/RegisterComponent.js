import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ToastAndroid,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {RegisterUrl} from '../../shared/baseUrl';

const BackgroundLogin = '../../shared/img/BackgroundLogin.png';
const LogoLogin = '../../shared/img/Logo.png';

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warningUserName: false,
      warningEmail: false,
      warningPassword: {
        checkDuplicate: false,
        checkEmpty: false,
      },
      warningConfirmPassword: {
        checkDuplicate: false,
        checkEmpty: false,
      },
    };

    this.userName = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.confirmPassword = React.createRef();
  }

  onChangeTextInput(text, type) {
    switch (type) {
      case 1: {
        this.userName.current = text;
        break;
      }
      case 2: {
        this.email.current = text;
        break;
      }
      case 3: {
        this.password.current = text;
        break;
      }
      case 4: {
        this.confirmPassword.current = text;
        break;
      }
    }
    console.log(this.userName.current);
    console.log(this.email.current);
    console.log(this.password.current);
    console.log(this.confirmPassword.current);
  }

  async onPressRegister() {
    console.log('do it');
    const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errMess = [];
    let checkRegisterSafe;
    let toastAndroidErrorMessage;
    if (reEmail.test(String(this.email.current) === false)) {
      this.setState({
        warningEmail: true,
      });
      errMess.push('1');
      ToastAndroid.showWithGravity(
        'Email invalid!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
    if (this.password.current !== this.confirmPassword.current) {
      this.errMess.push('2');
      ToastAndroid.showWithGravity(
        'Confirm Password not incorrect!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
    let bodyRegister = {
      email: this.email.current,
      name: this.userName.current,
      password: this.password.current,
    };
    if (errMess.length === 0) {
      let fetchDataRegister = fetch(RegisterUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyRegister),
      });

      await fetchDataRegister
        .then(
          (response) => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error(
                'Error : ' + response.status + response.statusText,
              );
              error.response = response;
              throw error;
            }
          },
          (error) => {
            var errorMess = error.message;
            throw errorMess;
          },
        )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          checkRegisterSafe = json.success;
        })
        .catch((error) => {
          toastAndroidErrorMessage = error;
        });

      if (checkRegisterSafe === '1') {
        Alert.alert(
          'Bạn đã tạo tài khoản thành công',
          '',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
            },
          ],
          {cancelable: false},
        );
        setTimeout(() => {
          Alert.alert('Bạn có muốn chuyển sang trang đăng nhập không?', '', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('Login');
              },
            },
          ]);
        }, 2000);
      } else {
        console.log('chưa được');
        if (toastAndroidErrorMessage) {
          ToastAndroid.showWithGravity(
            toastAndroidErrorMessage,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        }
      }
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#d9d9d9'}}>
          {/* <ScrollView> */}
          <Image
            source={require(BackgroundLogin)}
            style={{
              height: 280,
              resizeMode: 'cover',
              width: '100%',
            }}
          />
          {/* <Image
            style={{
              height: 128,
              width: 250,
              alignSelf: 'center',
              marginVertical: 10,
              position: 'absolute',
              top: 40,
            }}
            source={require(LogoLogin)}
          /> */}
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              alignSelf: 'center',
              borderRadius: 30,
              padding: 25,
              position: 'absolute',
              top: 120,
            }}>
            <View style={{marginBottom: 15}}>
              <Text style={{fontSize: 18}}>User Name</Text>
              <TextInput
                ref={(ref) => (this.userName = ref)}
                value={this.userName.current}
                onChangeText={(text) => {
                  this.onChangeTextInput(text, 1);
                }}
                onSubmitEditing={() => {
                  if (this.userName.current) {
                    this.email.focus();
                    this.setState({
                      warningUserName: false,
                    });
                  } else {
                    this.setState({
                      warningUserName: true,
                    });
                  }
                }}
                placeholder={
                  this.state.warningUserName
                    ? 'User Name not empty'
                    : 'Type your name'
                }
                placeholderTextColor={
                  this.state.warningUserName ? 'red' : '#aaa'
                }
                underlineColorAndroid={
                  this.state.warningUserName ? 'red' : '#8157de'
                }
                style={{height: 60, fontSize: 16}}
              />
            </View>
            <View style={{marginBottom: 15}}>
              <Text style={{fontSize: 18}}>Email/ID</Text>
              <TextInput
                ref={(ref) => (this.email = ref)}
                value={this.email.current}
                onChangeText={(text) => {
                  this.onChangeTextInput(text, 2);
                }}
                onSubmitEditing={() => {
                  if (this.email.current) {
                    this.password.focus();
                    this.setState({
                      warningEmail: false,
                    });
                  } else {
                    this.setState({
                      warningEmail: true,
                    });
                  }
                }}
                placeholder={
                  this.state.warningEmail
                    ? 'Your E-mail Not Empty'
                    : 'Type your name'
                }
                placeholderTextColor={this.state.warningEmail ? 'red' : '#aaa'}
                underlineColorAndroid={
                  this.state.warningEmail ? 'red' : '#8157de'
                }
                style={{height: 60, fontSize: 16}}
              />
            </View>
            <View style={{marginBottom: 15}}>
              <Text style={{fontSize: 18}}>Password</Text>
              <TextInput
                ref={(ref) => (this.password = ref)}
                secureTextEntry={true}
                value={this.password.current}
                onChangeText={(text) => {
                  this.onChangeTextInput(text, 3);
                }}
                onSubmitEditing={() => {
                  if (this.password.current) {
                    this.confirmPassword.focus();
                    this.setState({
                      warningPassword: {
                        checkDuplicate: false,
                        checkEmpty: false,
                      },
                    });
                  } else {
                    this.setState({
                      warningPassword: {
                        checkDuplicate: false,
                        checkEmpty: true,
                      },
                    });
                  }
                }}
                placeholder={
                  this.state.warningPassword.checkEmpty
                    ? 'Your Password Not Empty'
                    : this.state.warningPassword.checkDuplicate
                    ? 'Type Password Again'
                    : 'Type Your Password'
                }
                placeholderTextColor={
                  this.state.warningPassword.checkDuplicate ||
                  this.state.warningPassword.checkEmpty
                    ? 'red'
                    : '#aaa'
                }
                underlineColorAndroid={
                  this.state.warningPassword.checkDuplicate ||
                  this.state.warningPassword.checkEmpty
                    ? 'red'
                    : '#8157de'
                }
                style={{height: 60, fontSize: 16}}
              />
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 18}}>Confirm Your Password</Text>
              <TextInput
                ref={(ref) => (this.confirmPassword = ref)}
                secureTextEntry={true}
                value={this.confirmPassword.current}
                onChangeText={(text) => {
                  this.onChangeTextInput(text, 4);
                }}
                onSubmitEditing={() => {
                  if (this.confirmPassword.current && this.password.current && this.email.current && this.userName.current) {
                    console.log('finish');
                  } else {
                    this.password.current = null;
                    this.confirmPassword.current = null;
                    this.email.current = null;
                    this.userName.current = null;
                    this.setState({
                      warningConfirmPassword: {
                        checkDuplicate: false,
                        checkEmpty: true,
                      },
                    });
                  }
                }}
                placeholder={
                  this.state.warningConfirmPassword.checkDuplicate
                    ? 'Confirm Password Not Correct'
                    : this.state.warningConfirmPassword.checkEmpty
                    ? 'Confirm Password Not Empty'
                    : 'Type your Confirm Password'
                }
                placeholderTextColor={
                  this.state.warningConfirmPassword.checkDuplicate ||
                  this.state.warningConfirmPassword.checkEmpty
                    ? 'red'
                    : '#aaa'
                }
                underlineColorAndroid={
                  this.state.warningConfirmPassword.checkDuplicate ||
                  this.state.warningConfirmPassword.checkEmpty
                    ? 'red'
                    : '#8157de'
                }
                style={{height: 60, fontSize: 16}}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#37299e',
              position: 'absolute',
              bottom: 103,
              height: 50,
              alignSelf: 'center',
              width: '90%',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.onPressRegister();
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>
              REGISTER
            </Text>
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 70,
              backgroundColor: 'white',
              width: '100%',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text>Already have an Account? </Text>
            <Text style={{color: '#02e3d8'}} onPress={() => navigate('Login')}>
              Login
            </Text>
          </View>
          {/* </ScrollView> */}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default RegisterComponent;
