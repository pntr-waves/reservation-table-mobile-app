import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';

import {
  fetchDishes,
  fetchAllUser,
  fetchComments,
  fetchFavorites,
} from '../redux/ActionCreators';
import DishesDetailsComponent from './PublicComponents/DishesDetailsComponent';
import CategoryDetailComponent from './PublicComponents/CategoryDetailComponent';
import HomeComponent from './HomeDisplay/HomeComponent';
import FirstComponent from './LoginDisplay/FirstComponent';
import LoginComponent from './LoginDisplay/LoginComponent';
import RegisterComponent from './LoginDisplay/RegisterComponent';
import TableComponent from './ReservationDisplay/TableComponent';
import UserComponent from './UserDisplay/UserComponent';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDishes: () => dispatch(fetchDishes()),
    fetchAllUser: () => dispatch(fetchAllUser()),
    fetchComments: () => dispatch(fetchComments()),
    fetchFavorites: () => dispatch(fetchFavorites()),
  };
};
//admin stack

function LoginNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="First">
      <Stack.Screen name="First" component={FirstComponent} />
      <Stack.Screen name="Login" component={LoginComponent} />
      <Stack.Screen name="Register" component={RegisterComponent} />
    </Stack.Navigator>
  );
}
function TabBarNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <View>
          <BottomTabBar {...props} />
        </View>
      )}
      //14213d e63946
      tabBarOptions={{
        tabStyle: {backgroundColor: 'transparent'},
        style: {},
        activeTintColor: '#14213d',
        labelStyle: {
          fontSize: 14,
        },
      }}
      initialRouteName="HomeStack">
      <Tab.Screen
        name="HomeStack"
        component={HomeComponent}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor}) => (
            <Icon name="home" style="feather" size={30} color={tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="UserStack"
        component={UserComponent}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor}) => (
            <Icon
              name="account-circle"
              style="material"
              size={30}
              color={tintColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TableStack"
        component={TableComponent}
        options={{
          tabBarLabel: 'Reservation',
          tabBarIcon: ({tintColor}) => (
            <Icon name="cast" type="feather" size={30} color={tintColor} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
//Admin TabBar

class MainComponent extends React.Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchFavorites();
    this.props.fetchAllUser();
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TabBar"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginNavigator} />
          <Stack.Screen name="TabBar" component={TabBarNavigator} />
          <Stack.Screen
            name="DishesCategory"
            component={CategoryDetailComponent}
          />
          <Stack.Screen
            name="DishesDetails"
            component={DishesDetailsComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
