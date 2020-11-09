import React from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {connect} from 'react-redux';

import {baseUrl} from '../shared/baseUrl';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

class CategoryDetail extends React.Component {
  render() {
    console.log(baseUrl + this.props.dishes.dishes[0].image);
    const {navigate} = this.props.navigation;

    const RenderDishesItem = ({item}) => {
      return (
        <TouchableOpacity
          style={styles.RenderItem}
          onPress={() =>
            navigate('DishesDetails', {
              dishId: item.id,
            })
          }>
          <Image
            source={{uri: baseUrl + item.image}}
            style={{
              height: 100,
              width: 100,
              resizeMode: 'contain',
              borderTopLeftRadius: 3,
              borderBottomLeftRadius: 3,
              marginRight: 15,
            }}
          />
          <Text>{item.name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.Header}>
          <Text style={styles.TextHeader}>Main</Text>
        </View>
        <FlatList
          data={this.props.dishes.dishes}
          renderItem={RenderDishesItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.FlatListRender}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Header: {
    shadowOpacity: 1,
    height: 60,
    width: '100%',
    shadowColor: 'black',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  TextHeader: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  FlatListRender: {
    padding: 20,
  },

  RenderItem: {
    height: 100,
    width: 370,
    marginBottom: 20,
    borderRadius: 10,

    backgroundColor: '#ededed',
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 2,
  },
});

export default connect(mapStateToProps)(CategoryDetail);
