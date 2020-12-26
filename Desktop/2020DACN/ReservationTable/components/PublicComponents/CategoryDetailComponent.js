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

import {baseUrl} from '../../shared/baseUrl';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

const HEIGHT_RENDER_ITEM = 400;

class CategoryDetail extends React.Component {
  render() {
    console.log(baseUrl + this.props.dishes.dishes[0].image);
    const {navigate} = this.props.navigation;
    const {target} = this.props.route.params;

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
              height: 170,
              width: 170,
              resizeMode: 'cover',
              borderRadius: 20,
              marginBottom: 10
            }}
          />
          <View
            style={{
              flexGrow: 1,
              width: "100%",
              alignItems: "center",
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                marginBottom: 4,
                color: '#8157de',
                alignSelf: "center",
                textAlign: "center"
              }}>
              {item.name}
            </Text>
            <Text style={{width: "80%", textAlign: "center" }}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.Header}>
          <Text style={styles.TextHeader}>Main</Text>
        </View>
        <FlatList
          data={this.props.dishes.dishes.filter((dish) => {
            return dish.category === target;
          })}
          renderItem={RenderDishesItem}
          keyExtractor={(item) => item._id.toString()}
          style={styles.FlatListRender}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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
    height: HEIGHT_RENDER_ITEM,
    width: 200,
    borderRadius: 30,

    backgroundColor: '#ededed',
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    paddingHorizontal: 3,
    paddingVertical: 10,
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
