import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Button,
} from 'react-native';
import {connect} from 'react-redux';

import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

function RenderItemDishes(props) {
  return (
    <View style={styles.viewMenuContain}>
      <TouchableOpacity
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: '#ddd',
        }}
        onPress={() => {
          props.onPress();
          console.log('do it');
        }}>
        <View style={{flex: 2}}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'cover',
            }}
            source={{uri: props.uri}}
          />
        </View>
        <View style={{flex: 1, paddingTop: 10, paddingLeft: 10}}>
          <Text> {props.name} </Text>
          <Text>{props.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

class MenuComponent extends React.Component {
  render() {
    const {navigate} = this.props.navigation;

    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      );
    } else {
      if (this.props.dishes.dishes !== undefined) {
        return (
          <SafeAreaView style={styles.container}>
            <ImageBackground
              source={{uri: baseUrl + 'images/menu.jpg'}}
              style={{width: '100%', height: 270}}
              imageStyle={{borderBottomLeftRadius: 65}}>
              <Text style={styles.labelText}>Menu</Text>
            </ImageBackground>
            <View style={styles.viewMenuContain}>
              <Text
                style={styles.labelText}
                onPress={() => {
                  navigate('DishesCategory');
                  console.log('Go to Dishes Category');
                }}>
                Main Dishes
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <RenderItemDishes
                  uri={baseUrl + this.props.dishes.dishes[0].image}
                  name={this.props.dishes.dishes[0].name}
                  price={this.props.dishes.dishes[0].price + '$'}
                  onPress={() =>
                    navigate('DishesDetails', {
                      dishId: this.props.dishes.dishes[0].id,
                    })
                  }
                />
                <RenderItemDishes
                  uri={baseUrl + this.props.dishes.dishes[1].image}
                  name={this.props.dishes.dishes[1].name}
                  price={this.props.dishes.dishes[1].price + '$'}
                  onPress={() =>
                    navigate('DishesDetails', {
                      dishId: this.props.dishes.dishes[1].id,
                    })
                  }
                />
                <RenderItemDishes
                  uri={baseUrl + this.props.dishes.dishes[2].image}
                  name={this.props.dishes.dishes[2].name}
                  price={this.props.dishes.dishes[2].price + '$'}
                  onPress={() =>
                    navigate('DishesDetails', {
                      dishId: this.props.dishes.dishes[2].id,
                    })
                  }
                />
              </ScrollView>
            </View>
          </SafeAreaView>
        );
      } else {
        return <View></View>;
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  labelView: {
    flex: 1,
  },

  labelText: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },

  viewMenuContain: {
    height: 200,
    marginTop: 20,
  },
});
export default connect(mapStateToProps)(MenuComponent);
