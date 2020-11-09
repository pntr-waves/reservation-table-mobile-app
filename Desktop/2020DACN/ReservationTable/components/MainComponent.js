import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';

import {fetchDishes} from '../redux/ActionCreators';
import MenuComponents from './MenuComponent';
import DishesDetailsComponent from './DishesDetailsComponent';
import CategoryDetailComponent from './CategoryDetailComponent';
import HomeComponent from './HomeComponent';

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
  };
};

function MenuNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Menu">
      <Stack.Screen name="Menu" component={MenuComponents} />
      <Stack.Screen name="DishesDetails" component={DishesDetailsComponent} />
      <Stack.Screen name="DishesCategory" component={CategoryDetailComponent} />
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

class MainComponent extends React.Component {
  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {
    console.log(this.props.dishes.dishes);
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props) => (
            <View>
              <BottomTabBar {...props} />
            </View>
          )}
          tabBarOptions={{
            tabStyle: {backgroundColor: 'transparent'},
          }}>
          <Tab.Screen
            name="HomeStack"
            component={HomeNavigator}
            options={{
              tabBarLabel: 'Home',
              
            }}
          />
          <Tab.Screen
            name="MenuStack"
            component={MenuNavigator}
            options={{
              tabBarLabel: 'Menu',
              tabBarIcon: ({tintColor}) => (
                <Icon 
                  name='ios-american-football'
                  type='ionicon'
                  size={24}
                  color={tintColor}
                /> 
              )                
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
