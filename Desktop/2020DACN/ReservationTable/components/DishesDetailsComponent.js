import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

class DishesDetailsComponent extends React.Component {
  render() {
    const {dishId} = this.props.route.params;
    const dish = this.props.dishes.dishes.filter((dish) => dish.id === dishId);
    console.log(dish[0].image);
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{uri: baseUrl + dish[0].image}}
          style={styles.background}
          imageStyle={{borderBottomLeftRadius: 65}}>
          <Text style={styles.TextInBackgroundCategory}>Món Chính</Text>
          <Text style={styles.TextInBackgroundName}>{dish[0].name}</Text>
        </ImageBackground>
        <TouchableOpacity style={styles.ReserveBackground}>
          <Text style={styles.ReserveText}>Reserve</Text>
        </TouchableOpacity>
        <ScrollView>
          <TouchableOpacity style={styles.DescriptionTitle}>
            <Text style={[styles.DescriptionText]}>Description</Text>
          </TouchableOpacity>
          <Text style={styles.DescriptionContent}>{dish[0].description}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: 270,
  },
  TextInBackgroundCategory: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    bottom: 90,
    left: 20,
  },
  TextInBackgroundName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    bottom: 60,
    left: 20,
  },
  ReserveBackground: {
    borderBottomLeftRadius: 25,
    backgroundColor: '#8157de',
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    top: -20,
    left: 300,
  },
  ReserveText: {
    color: 'white',
    fontSize: 20,
  },
  DescriptionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#8157de',
    width: '100%',
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flex: 1,
    marginBottom: 10,
  },
  DescriptionText: {
    color: 'white',
    fontSize: 30,
  },
  DescriptionContent: {
    fontSize: 20,
    color: '#a6a8ab',
    paddingHorizontal: 20,
  },
});
export default connect(mapStateToProps)(DishesDetailsComponent);
