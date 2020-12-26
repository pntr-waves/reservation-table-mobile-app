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
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchUsers,
  loadingUser,
  failedUser,
  addDishes,
  addUser,
} from '../../redux/ActionCreators';
import { StackActions, Navi } from '@react-navigation/native';
import axios from 'axios';

import {Loading} from '../PublicComponents/LoadingComponent';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (email, password) => dispatch(fetchUsers(email, password)),
    failedUser: (errorMess) => dispatch(failedUser(errorMess)),
    loadingUser: () => dispatch(loadingUser()),
    addUser: (user) => dispatch(addUser(user)),
  };
};
const BackgroundLogin = '../../shared/img/BackgroundLogin.png';
const LogoLogin = '../../shared/img/Logo.png';

const ModalNotification = (props) => {
  if (props.isLoading) {
    return (
      <View>
        <Loading />
      </View>
    );
  } else if (props.errorMess) {
    return (
      <View>
        <Text>{props.errorMess}</Text>
      </View>
    );
  } else {
    return <View></View>;
  }
};

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.email = React.createRef();
    this.password = React.createRef();
    this.state = {
      warningEmail: false,
      warningPassword: false,
    };
  }

  onChangeEmailText(text) {
    this.email.current = text;
    console.log(this.email.current);
    // this.setState({
    //   email: text
    // })

    // console.log(this.state.email)
  }

  onChangePasswordText(text) {
    this.password.current = text;
    console.log(this.password.current);
    // this.setState({
    //   email: text
    // })

    // console.log(this.state.email)
  }

  async onPressLogin() {
    const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const rePassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (this.password.current === '' && this.email.current === '') {
      ToastAndroid.showWithGravity(
        'Chưa nhập đầy đủ thông',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    } else {
      if (reEmail.test(String(this.email.current).toLowerCase()) === false) {
        ToastAndroid.showWithGravity(
          'Sai thông tin đầu vào',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      } else {
        //hợp lệ hết
        //fetch đăng nhập
        console.log(
          JSON.stringify({
            email: this.email.current,
            password: this.password.current,
          }),
        );

        this.props.fetchUsers(this.email.current, this.password.current);
        
        console.log("user"+this.props.user.user._id )
        if (this.props.user.user !== {}) {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [this.props.navigation.navigate('TabBar')],
          });
          this.props.navigation.dispatch(resetAction);
        }
      }
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    console.log(this.props.user);
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#d9d9d9'}}>
          <Image
            source={require(BackgroundLogin)}
            style={{
              height: 280,
              resizeMode: 'cover',
              width: '100%',
            }}
          />
          <Image
            style={{
              height: 128,
              width: 250,
              alignSelf: 'center',
              marginVertical: 10,
              position: 'absolute',
              top: 40,
            }}
            source={require(LogoLogin)}
          />
          <View
            style={{
              width: '100%',
              height: 350,
              backgroundColor: 'white',
              alignSelf: 'center',
              borderRadius: 30,
              padding: 25,
              position: 'absolute',
              top: 240,
            }}>
            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 25}}>Email/ID</Text>
              <TextInput
                ref={(ref) => {
                  this.email = ref;
                }}
                onChangeText={(text) => {
                  console.log(this.email);
                  this.onChangeEmailText(text);
                }}
                value={this.email.current}
                style={{height: 60, fontSize: 20}}
                onSubmitEditing={() => {
                  if (this.email.current) {
                    this.setState({
                      warningEmail: false,
                    });
                    this.password.focus();
                  } else {
                    this.setState({
                      warningEmail: true,
                    });
                  }
                }}
                placeholder={
                  this.state.warningEmail
                    ? 'Your Email not empty'
                    : 'Type your E-mail'
                }
                underlineColorAndroid={
                  this.state.warningPassword ? 'red' : '#8157de'
                }
              />
            </View>
            <View>
              <Text style={{fontSize: 25}}>Password</Text>
              <TextInput
                ref={(ref) => {
                  this.password = ref;
                }}
                onChangeText={(text) => {
                  console.log(this.password);
                  this.onChangePasswordText(text);
                }}
                value={this.password.current}
                onSubmitEditing={() => {
                  if (this.password.current) {
                    this.setState({
                      warningPassword: false,
                    });
                  } else {
                    this.setState({
                      warningPassword: true,
                    });
                  }
                }}
                style={{height: 60, fontSize: 20}}
                placeholder={
                  this.state.warningPassword
                    ? 'Your Password Not Empty'
                    : 'Type your password'
                }
                underlineColorAndroid={
                  this.state.warningPassword ? 'red' : '#8157de'
                }
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#02e3d8',
                position: 'relative',
                bottom: -35,
                height: 50,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                this.onPressLogin();
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 30, color: 'white'}}>
                LOGIN
              </Text>
            </TouchableOpacity>
            <ModalNotification user={this.props.user} />
          </View>
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
            <Text
              style={{color: '#37299e'}}
              onPress={() => navigate('Register')}>
              Register
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
