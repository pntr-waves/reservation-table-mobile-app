import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  StatusBar,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import {DishesUrl} from '../../shared/baseUrl';
import {Loading} from '../PublicComponents/LoadingComponent';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

const {height, width} = Dimensions.get('window');

const ICON_SIZE = 100;

const ICON_DATA = [
  {
    id: 1,
    nameIcon: 'lunch-dining',
    descriptionIcon: 'Main Dishes',
    target: 'mains',
  },
  {
    id: 2,
    nameIcon: 'fastfood',
    descriptionIcon: 'Appetizer',
    target: 'appetizer',
  },
  {
    id: 3,
    nameIcon: 'icecream',
    descriptionIcon: 'Deserts',
    target: 'dessert',
  },
  {
    id: 4,
    nameIcon: 'cake',
    descriptionIcon: 'Side Dishes',
    target: 'side',
  },
  {
    id: 5,
    nameIcon: 'calendar-today',
    descriptionIcon: 'Reservation',
  },
  {
    id: 6,
    nameIcon: 'more',
    descriptionIcon: 'More Info',
  },
];

let BANNER_DATA = [
  // {
  //   id: 1,
  //   uri: DishesUrl + 'images/banner1.jpg',
  //   title: 'Nhà hàng X',
  //   description:
  //     'Không gian thoáng mát, tiện nghi, đầy đủ ánh sáng, ấm cúng như ở nhà',
  // },
  // {
  //   id: 2,
  //   uri: DishesUrl + 'images/banner2.jpg',
  //   title: 'Nhà hàng X',
  //   description: 'Nơi mọi người ngồi bên nhau vui vẻ',
  // },
  // {
  //   id: 3,
  //   uri: DishesUrl + 'images/banner3.jpg',
  //   title: 'Nhà hàng X',
  //   description: 'Với những món ăn siêu ngon, và đẹp mắt',
  // },
];

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
          height: 190,
          width: 130,
          marginHorizontal: 20,
          borderWidth: 0.5,
          borderColor: '#f1faee ',
          borderRadius: borderRadiusOfItem,
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

const renderBannerItem = ({item}) => {
  return (
    <View>
      <Image
        source={{uri: item.uri}}
        style={{
          height: 200,
          width: 400,
          marginRight: 10,
          borderRadius: 20,
          resizeMode: 'cover',
        }}
      />
      <View style={{position: 'absolute', bottom: 20, padding: 12}}>
        <Text style={styles.TitleInBanner}>{item.title}</Text>
        <Text style={styles.DescriptionInBanner}>{item.description}</Text>
      </View>
    </View>
  );
};

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

const Banner = ({onScroll, data}) => {
  return (
    <View style={styles.Banner}>
      <FlatList
        data={data}
        renderItem={renderBannerItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
    </View>
  );
};

const ShortCutIcon = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          width: ICON_SIZE * 3,
        }}>
        <FlatList
          data={ICON_DATA}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  width: ICON_SIZE,
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <Icon
                  name={item.nameIcon}
                  style="font-awesome"
                  solid
                  reverse
                  color="#8157de"
                  size={30}
                  onPress={() => {
                    if (item.nameIcon === 'calendar-today') {
                      console.log('navigation Reservation stack');
                      navigation.navigate('ReservationStack');
                    } else {
                      navigation.navigate('DishesCategory', {
                        target: item.target,
                      });
                    }
                  }}
                />
                <Text style={{fontSize: 9, fontWeight: 'bold'}}>
                  {item.descriptionIcon}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.flatListRef = React.createRef(new Animated.Value(0)).current;
    this.state = {
      data: [],
      scrollValue: 0,
    };
    this.scrollX = new Animated.Value(0);
  }

  addItemInNewArray(arr, text) {
    if (BANNER_DATA.length === 4) {
      return;
    } else {
      let tempArray = [];
      console.log('aax ' + arr);
      if (arr) {
        tempArray = arr.filter((el) => {
          return el.category === text;
        });

        console.log('aaa: ' + tempArray);
        BANNER_DATA = [
          ...BANNER_DATA,
          {
            id: tempArray[tempArray.length - 1]._id,
            uri:tempArray[tempArray.length - 1].image,
            title: tempArray[tempArray.length - 1].name,
            description: tempArray[tempArray.length - 1].description,
          },
        ];
      } else {
        return 'fail';
      }
    }
  }

  renderNewDishes(dishes) {
    if (dishes) {
      console.log(dishes);
      this.addItemInNewArray(dishes, 'mains');
      this.addItemInNewArray(dishes, 'appetizer');
      this.addItemInNewArray(dishes, 'dessert');
      this.addItemInNewArray(dishes, 'side');

      console.log(
        'renderNewDishes da chay ' + this.addItemInNewArray(dishes, 'main'),
      );

      console.log('gg: ' + BANNER_DATA);
    }
  }

  render() {
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
        let position = Animated.divide(this.scrollX, width);
        this.renderNewDishes(this.props.dishes.dishes);
        filterDishes(this.props.dishes.dishes);
        return (
          <SafeAreaView style={{flex: 1}}>
            <StatusBar hidden />
            <ScrollView>
              <Banner
                data={BANNER_DATA}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {x: this.scrollX}}}],
                  {useNativeDriver: false},
                )}
              />
              <View style={styles.dotView}>
                {BANNER_DATA.map((_, i) => {
                  let opacity = position.interpolate({
                    inputRange: [i - 1, i, i + 1],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={i}
                      style={{
                        opacity: opacity,
                        height: 10,
                        width: 10,
                        backgroundColor: '#595959',
                        margin: 8,
                        borderRadius: 5,
                      }}
                    />
                  );
                })}
              </View>
              <ShortCutIcon {...this.props} />
              <ScrollView>
              <View style={styles.viewMenuContain}>
                <Text
                  style={styles.labelText}
                  onPress={() => {
                    this.props.navigation.navigate('DishesCategory', {
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
                        uri={item.image}
                        name={item.name}
                        price={item.price + '$'}
                        onPress={() =>
                          this.props.navigation.navigate('DishesDetails', {
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
                    this.props.navigation.navigate('DishesCategory', {
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
                        uri={item.image}
                        name={item.name}
                        price={item.price + '$'}
                        onPress={() =>
                          this.props.navigation.navigate('DishesDetails', {
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
                    this.props.navigation.navigate('DishesCategory', {
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
                        uri={item.image}
                        name={item.name}
                        price={item.price + '$'}
                        onPress={() =>
                          this.props.navigation.navigate('DishesDetails', {
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
                    this.props.navigation.navigate('DishesCategory', {
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
                        uri={item.image}
                        name={item.name}
                        price={item.price + '$'}
                        onPress={() =>
                          this.props.navigation.navigate('DishesDetails', {
                            dishId: item.id,
                          })
                        }
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </ScrollView>
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
  HeaderWrapper: {
    height: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  HeaderText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  Banner: {
    marginLeft: 6,
    marginTop: 10,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  TitleInBanner: {
    fontSize: 20,
    color: '#8157de',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  DescriptionInBanner: {
    fontSize: 16,
    color: '#8157de',
    width: 300,
  },
  labelText: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
    color: "#8157de"
  },

  viewMenuContain: {
    height: 300,
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
export default connect(mapStateToProps)(HomeComponent);
