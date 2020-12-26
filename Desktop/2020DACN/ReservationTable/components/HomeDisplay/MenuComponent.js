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
} from 'react-native';
import {connect} from 'react-redux';

import {baseUrl} from '../../shared/baseUrl';
import {Loading} from '../PublicComponents/LoadingComponent';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

let mains;
let side;
let appetizer;
let desert;
const borderRadiusOfItem = 20;

function RenderItemDishes(props) {
  return (
    <View style={styles.viewMenuContain}>
      <TouchableOpacity
        style={{
          height: 200,
          width: 130,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: '#ddd',
          borderRadius: borderRadiusOfItem,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,

          elevation: 1,
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
              borderTopLeftRadius: borderRadiusOfItem,
              borderTopRightRadius: borderRadiusOfItem,
            }}
            source={{uri: props.uri}}
          />
        </View>
        <View style={{flex: 1, paddingTop: 10, paddingLeft: 10}}>
          <Text>{props.name}</Text>
          <Text>{props.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const filterDishes = (arr) => {
  mains = [];
  side = [];
  appetizer = [];
  desert = [];
  if (arr) {
    mains = arr.filter((dish) => {
      return dish.category === 'mains';
    });
    side = arr.filter((dish) => {
      return dish.category === 'side';
    });
    appetizer = arr.filter((dish) => {
      return dish.category === 'appetizer';
    });
    desert = arr.filter((dish) => {
      return dish.category === 'desert';
    });
  } else {
    console.log('dishes null');
    return 'fail';
  }
};

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
        filterDishes(this.props.dishes.dishes);
        return (
          <SafeAreaView style={styles.container}>
            <ImageBackground
              source={{uri: baseUrl + 'images/menu.jpg'}}
              style={{
                width: 400,
                height: 270,
                margin: 10,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              imageStyle={{borderRadius: 20}}>
              <Text
                style={[styles.labelText, {color: '#8157de', fontSize: 40}]}>
                Menu
              </Text>
            </ImageBackground>
            <ScrollView>
              <View style={styles.viewMenuContain}>
                <Text
                  style={styles.labelText}
                  onPress={() => {
                    navigate('DishesCategory', {
                      target: 'mains',
                    });
                    console.log('Go to Dishes Category');
                  }}>
                  Main Dishes
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {mains.map((item, index) => {
                    return (
                      <RenderItemDishes
                        key={index}
                        uri={baseUrl + item.image}
                        name={item.name}
                        price={item.price + '$'}
                        onPress={() =>
                          navigate('DishesDetails', {
                            dishId: item.id,
                          })
                        }
                      />
                    );
                  })}
                </ScrollView>
              </View>
              <View style={styles.viewMenuContain}>
                <Text
                  style={styles.labelText}
                  onPress={() => {
                    navigate('DishesCategory', {
                      target: 'side',
                    });
                    console.log('Go to Dishes Category');
                  }}>
                  Side Dishes
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {side.map((item, index) => {
                    return (
                      <RenderItemDishes
                        key={index}
                        uri={baseUrl + item.image}
                        name={item.name}
                        price={item.price + '$'}
                        onPress={() =>
                          navigate('DishesDetails', {
                            dishId: item.id,
                          })
                        }
                      />
                    );
                  })}
                </ScrollView>
              </View>
              <View style={styles.viewMenuContain}>
                <Text
                  style={styles.labelText}
                  onPress={() => {
                    navigate('DishesCategory', {
                      target: 'appetizer',
                    });
                    console.log('Go to Dishes Category');
                  }}>
                  Appetizer
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {appetizer.map((item, index) => {
                    return (
                      <RenderItemDishes
                        key={index}
                        uri={baseUrl + item.image}
                        name={item.name}
                        price={item.price + '$'}
                        onPress={() =>
                          navigate('DishesDetails', {
                            dishId: item.id,
                          })
                        }
                      />
                    );
                  })}
                </ScrollView>
              </View>
              <View style={styles.viewMenuContain}>
                <Text
                  style={styles.labelText}
                  onPress={() => {
                    navigate('DishesCategory', {
                      target: 'desert',
                    });
                    console.log('Go to Dishes Category');
                  }}>
                  Desert
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {desert.map((item, index) => {
                    return (
                      <RenderItemDishes
                        key={index}
                        uri={baseUrl + item.image}
                        name={item.name}
                        price={item.price + '$'}
                        onPress={() =>
                          navigate('DishesDetails', {
                            dishId: item.id,
                          })
                        }
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </ScrollView>
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
    color: "#8157de"
  },

  viewMenuContain: {
    height: 250,
    marginTop: 20,
  },
  labelView: {
    flex: 1,
  },
  labelText: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
    color: "#8157de"
  },

  viewMenuContain: {
    height: 250,
    marginTop: 20,
  },
});
export default connect(mapStateToProps)(MenuComponent);
