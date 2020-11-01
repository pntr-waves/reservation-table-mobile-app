import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';

import {fetchDishes} from '../redux/ActionCreators';
import MenuComponents from './MenuComponents';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const mapStateToProps = (state) => {
  return {
      dishes: state.dishes
    }
};

const mapDispatchToProps = (dispatch) => {
  return{
      fetchDishes: () => dispatch(fetchDishes())
    }
};

function MenuNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Menu" component={MenuComponents} />
    </Stack.Navigator>
  );
}

class MainComponents extends React.Component {
  
  componentDidMount() {
    this.props.fetchDishes();
  }

  render(){
    return (
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="MenuStack" component={MenuNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainComponents);
