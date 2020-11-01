import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {Tile} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

function RenderItemDishes(props) {
  return (
    <View style={styles.viewMenuContain}>
      <ScrollView horizontal={true}>
        <View
          style={{
            height: 130,
            width: 130,
            marginLeft: 20,
            borderWidth: 0.5,
            borderColor: '#ddd',
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
        </View>
      </ScrollView>
    </View>
  );
}

class MenuComponents extends React.Component {
  render() {
    console.log(this.props.dishes.dishes);
    let dishesArray = this.props.dishes.dishes.filter(
      (dish, index) => index < 5,
    );

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>Menu</Text>
          <View style={styles.viewMenuContain}>
            <ScrollView horizontal={true}>
              <RenderItemDishes
                uri={baseUrl + dishesArray[0].image}
                name={dishesArray[0].name}
                price={dishesArray[0].price + '$'}
              />
              <RenderItemDishes
                uri={baseUrl + dishesArray[0].image}
                name={dishesArray[0].name}
                price={dishesArray[0].price + '$'}
              />
              <RenderItemDishes
                uri={baseUrl + dishesArray[0].image}
                name={dishesArray[0].name}
                price={dishesArray[0].price + '$'}
              />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  labelView: {
    flex: 1,
    paddingTop: 20,
  },

  labelText: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },

  viewMenuContain: {
    height: 160,
    marginTop: 20,
  },
});
export default connect(mapStateToProps)(MenuComponents);
