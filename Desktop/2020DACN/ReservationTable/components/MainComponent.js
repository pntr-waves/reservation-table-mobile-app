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

import {fetchDishes, fetchAllUser} from '../redux/ActionCreators';
import MenuComponents from './HomeDisplay/MenuComponent';
import DishesDetailsComponent from './PublicComponents/DishesDetailsComponent';
import CategoryDetailComponent from './PublicComponents/CategoryDetailComponent';
import HomeComponent from './HomeDisplay/HomeComponent';
import FirstComponent from './LoginDisplay/FirstComponent';
import LoginComponent from './LoginDisplay/LoginComponent';
import RegisterComponent from './LoginDisplay/RegisterComponent';
import ReservationComponent from './ReservationDisplay/ReservationComponent';
import TableComponent from './ReservationDisplay/TableComponent';
//Admin Component
import ManageTableComponent from './Admin/ManageTableComponent';
import ManageReservationComponent from './Admin/ManageReservationComponent';

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
    // fetchUsers: () => dispatch(fetchUsers()),
    fetchAllUser: () => dispatch(fetchAllUser()),
  };
};
//admin stack

function MenuNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Menu">
      <Stack.Screen name="Menu" component={MenuComponents} />
    </Stack.Navigator>
  );
}

function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeComponent} />
    </Stack.Navigator>
  );
}
function ReservationNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Reservation" component={ReservationComponent} />
    </Stack.Navigator>
  );
}

function TableNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Table" component={TableComponent} />
    </Stack.Navigator>
  );
}

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
      tabBarOptions={{
        tabStyle: {backgroundColor: 'transparent'},
        style: {},
        activeTintColor: '#e63946',
        labelStyle: {
          fontSize: 14,
        },
      }}
      initialRouteName="HomeStack">
      <Tab.Screen
        name="HomeStack"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor}) => (
            <Icon name="home" style="feather" size={30} color={tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="MenuStack"
        component={MenuNavigator}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({tintColor}) => (
            <Icon name="menu" type="feather" size={30} color={tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="ReservationStack"
        component={ReservationNavigator}
        options={{
          tabBarLabel: 'Other',
          tabBarIcon: ({tintColor}) => (
            <Icon name="cast" type="feather" size={30} color={tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="TableStack"
        component={TableNavigator}
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
function AdminTabBarNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ManageTableStack">
      <Stack.Screen
        name="ManageTableStack"
        component={ManageTableComponent}
      />
      <Stack.Screen
        name="ManageReservationStack"
        component={ManageReservationComponent}
      />
    </Stack.Navigator>
  );
}

class MainComponent extends React.Component {
  componentDidMount() {
    this.props.fetchDishes();
    // this.props.fetchUsers();
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
          <Stack.Screen name="AdminTabBar" component={AdminTabBarNavigator} />
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
