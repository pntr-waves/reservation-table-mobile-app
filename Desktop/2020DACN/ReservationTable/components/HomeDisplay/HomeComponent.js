import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Icon, Badge, Rating} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

import {Loading} from '../PublicComponents/LoadingComponent';
//import action
import {fetchRecommend} from '../../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecommend: (userId) => dispatch(fetchRecommend(userId)),
  };
};

const FONT_TITLE = 'Pacifico-Regular';
const FONT_NORMAL = 'Play-Regular';
const COLOR1 = '#000000';
const COLOR2 = '#14213d';
const COLOR3 = '#fca311';
const COLOR4 = '#e5e5e5';
const COLOR5 = '#ffffff';
const COLOR6 = '#a8dadc';
const HEIGHT_RENDER_ITEM = 110;

const {height, width} = Dimensions.get('window');

const ICON_SIZE = 120;

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
    padding: 10,
    backgroundColor: COLOR5,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  TitleInBanner: {
    fontSize: 20,
    color: COLOR4,
  },
  DescriptionInBanner: {
    fontSize: 17,
    color: COLOR4,
    width: 300,
  },
  labelView: {
    flex: 1,
  },
  labelText: {
    fontSize: 25,
    paddingHorizontal: 20,
    fontFamily: FONT_TITLE,
    color: COLOR2,
  },
  viewMenuContain: {
    paddingTop: 10,
    marginVertical: 10,
    backgroundColor: COLOR5,
  },
  HeaderContainer: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  TextHeader: {
    textAlign: 'center',
    color: COLOR2,
    fontSize: 30,
    fontFamily: 'Texturina-Italic',
    paddingLeft: 15,
    marginRight: 15,
  },
});
const ICON_DATA = [
  {
    id: 1,
    nameIcon: 'lunch-dining',
    descriptionIcon: 'MAIN',
    target: 'mains',
  },
  {
    id: 2,
    nameIcon: 'fastfood',
    descriptionIcon: 'APPETIZER',
    target: 'appetizer',
  },
  {
    id: 3,
    nameIcon: 'icecream',
    descriptionIcon: 'DESERTS',
    target: 'dessert',
  },
  {
    id: 4,
    nameIcon: 'cake',
    descriptionIcon: 'SIDE',
    target: 'side',
  },
  {
    id: 5,
    nameIcon: 'calendar-today',
    descriptionIcon: 'RESERVATION',
    target: 'TableStack',
  },
  {
    id: 6,
    nameIcon: 'more',
    descriptionIcon: 'MORE INFO',
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
const borderRadiusOfItem = 5;

function RenderItemDishes(props) {
  var totalRating = 0;
  var numberOfComments = 0;
  if (props.comments.length > 0) {
    for (let comment of props.comments) {
      totalRating = totalRating + parseInt(comment.rating);
      numberOfComments = numberOfComments + 1;
    }
  }
  return (
    <View style={styles.viewMenuContain}>
      <TouchableOpacity
        style={{
          width: 160,
          marginHorizontal: 20,
        }}
        onPress={() => {
          props.onPress();
        }}>
        <View
          style={{
            flex: 2,
            backgroundColor: COLOR5,
            borderRadius: borderRadiusOfItem,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
          }}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: 160,
              resizeMode: 'cover',
              borderRadius: borderRadiusOfItem,
            }}
            source={{uri: props.uri}}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: 10,
            paddingLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{fontSize: 18, fontFamily: FONT_NORMAL}}
            numberOfLines={1}>
            {props.name.toUpperCase()}
          </Text>
          <Text style={{fontSize: 15}}>{props.price}</Text>
          {props.comments.length > 0 ? (
            <>
              <Text style={{fontSize: 15, color: '#f1c40f'}}>{`${(
                totalRating / numberOfComments
              ).toFixed(1)}/5`}</Text>
              {totalRating !== 0 ? (
                <Rating
                  imageSize={10}
                  startingValue={Number(
                    (totalRating / numberOfComments).toFixed(1),
                  )}
                  readonly={true}
                />
              ) : (
                <View></View>
              )}
            </>
          ) : (
            <>
              <Text style={{fontSize: 15, color: '#f1c40f'}}>{`5/5`}</Text>
              <Rating imageSize={10} startingValue={5} readonly={true} />
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const RenderRecommendDishes = (props) => {
  var totalRating = 0;
  var numberOfComments = 0;
  if (props.comments.length > 0) {
    for (let comment of props.comments) {
      totalRating = totalRating + parseInt(comment.rating);
      numberOfComments = numberOfComments + 1;
    }
  }
  return (
    <View style={styles.viewMenuContain}>
      <TouchableOpacity
        style={{
          width: 340,
          marginHorizontal: 20,
        }}
        onPress={() => {
          props.onPress();
        }}>
        <View
          style={{
            backgroundColor: COLOR5,
            borderRadius: borderRadiusOfItem,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
          }}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: 200,
              resizeMode: 'cover',
              borderRadius: borderRadiusOfItem,
            }}
            source={{uri: props.uri}}
          />
        </View>
      </TouchableOpacity>
      <LinearGradient
        colors={['#FFFFFF00', COLOR1]}
        style={{
          height: 50,
          width: 340,
          marginHorizontal: 20,
          position: 'absolute',
          bottom: 0,
          paddingRight: 10,
          paddingLeft: 10,
          borderRadius: borderRadiusOfItem,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View>
          <Text
            style={{fontSize: 18, fontFamily: FONT_NORMAL, color: COLOR4}}
            numberOfLines={1}>
            {props.name.toUpperCase()}
          </Text>
          <Text style={{fontSize: 15, color: COLOR4}}>{props.price}</Text>
        </View>
        <View>
          {props.comments.length > 0 ? (
            <>
              <Text style={{fontSize: 15, color: '#f1c40f'}}>{`${(
                totalRating / numberOfComments
              ).toFixed(1)}/5`}</Text>
              {totalRating !== 0 ? (
                <Rating
                  imageSize={10}
                  startingValue={Number(
                    (totalRating / numberOfComments).toFixed(1),
                  )}
                  readonly={true}
                />
              ) : (
                <View></View>
              )}
            </>
          ) : (
            <>
              <Text style={{fontSize: 15, color: '#f1c40f'}}>{`5/5`}</Text>
              <Rating imageSize={10} startingValue={5} readonly={true} />
            </>
          )}
        </View>
      </LinearGradient>
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
    return 'fail';
  }
};

const Banner = ({onScroll, data}) => {
  return (
    <View style={styles.Banner}>
      <View style={{width: '100%', marginBottom: 10}}>
        <Text
          style={{
            color: COLOR2,
            fontSize: 30,
            fontFamily: FONT_TITLE,
          }}>
          Món mới! Món mới!
        </Text>
      </View>
      <ScrollView
        onScroll={onScroll}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => {
          return (
            <View key={index.toString()}>
              <Image
                source={{uri: item.uri}}
                style={{
                  height: 200,
                  width: 385,
                  marginRight: 10,
                  borderRadius: 5,
                  resizeMode: 'cover',
                }}
              />
              <Badge
                status={'error'}
                value="new"
                containerStyle={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: 30,
                  width: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <LinearGradient
                colors={['#FFFFFF00', COLOR1]}
                style={{
                  height: 80,
                  position: 'absolute',
                  bottom: 0,
                  width: 385,
                  borderRadius: 5,
                }}>
                <View style={{position: 'absolute', bottom: 10, left: 20}}>
                  <Text
                    style={[
                      styles.TitleInBanner,
                      {
                        fontFamily: FONT_TITLE,
                        color: COLOR4,
                        fontSize: 30,
                      },
                    ]}>
                    {item.title}
                  </Text>
                  <Text numberOfLines={1} style={styles.DescriptionInBanner}>
                    {item.description}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const ShortCutIcon = ({navigation}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: COLOR5,
        padding: 20,
        width: ICON_SIZE * 3,
        alignSelf: 'center',
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: ICON_SIZE * 3,
        }}>
        {ICON_DATA.map((item, index) => {
          return (
            <View
              key={index.toString()}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE - 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                borderStyle: 'dashed',
              }}>
              <Icon
                name={item.nameIcon}
                style="font-awesome"
                solid
                color={COLOR2}
                size={50}
                onPress={() => {
                  if (item.nameIcon === 'calendar-today') {
                    navigation.navigate('TableStack');
                  } else {
                    navigation.navigate('DishesCategory', {
                      target: item.target,
                    });
                  }
                }}
              />
              <Text
                style={{
                  fontFamily: FONT_TITLE,
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: COLOR2,
                }}>
                {item.descriptionIcon}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

class HomeComponent extends React.Component {
  componentDidMount() {
    // this.props.fetchComments();
    // this.props.fetchFavorites();
    if (this.props.user.user) {
      this.props.fetchRecommend(this.props.user.user.id);
    }
  }
  constructor(props) {
    super(props);
    // this.flatListRef = React.createRef(new Animated.Value(0)).current;
    this.state = {
      data: [],
      scrollValue: 0,
    };
    this.scrollX = new Animated.Value(0);
    this.scrollY = new Animated.Value(0);
    this.diffClamp = new Animated.diffClamp(this.scrollY, 0, 60);
  }

  addItemInNewArray(arr, text) {
    if (BANNER_DATA.length === 4) {
      return;
    } else {
      let tempArray = [];
      if (arr) {
        tempArray = arr.filter((el) => {
          return el.category === text;
        });

        BANNER_DATA = [
          ...BANNER_DATA,
          {
            id: tempArray[tempArray.length - 1]._id,
            uri: tempArray[tempArray.length - 1].image,
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
      this.addItemInNewArray(dishes, 'mains');
      this.addItemInNewArray(dishes, 'appetizer');
      this.addItemInNewArray(dishes, 'dessert');
      this.addItemInNewArray(dishes, 'side');
    }
  }

  filterComments(dish_id) {
    let comments = this.props.comments.comments;
    let valueComment = comments.filter((comment) => {
      return comment.dishId === dish_id;
    });
    if (valueComment) {
      return valueComment;
    } else {
      return '0';
    }
  }

  filterTotalComment(comments) {
    let newArrayComments = [];
    let arrayCheck = [];
    for (let i = 0; i < comments.length; i++) {
      let totalRating = 0;
      let times = 0;
      let dishId = comments[i].dishId;
      for (let j = 0; j < comments.length; j++) {
        if (dishId === comments[j].dishId) {
          totalRating = parseInt(comments[j].rating) + totalRating;
          times = times + 1;
        }
      }
      if (arrayCheck.includes(dishId) === false) {
        arrayCheck.push(dishId);
        newArrayComments.push({
          dishId,
          totalRating: (totalRating / times).toFixed(1),
        });
      }
    }
    return newArrayComments;
  }

  mapRecommendToDishes(recommend, comments) {
    let newComments = [];
    let newRecommend = [];
    if (recommend.length > 0) {
      for (let i of recommend) {
        if (newRecommend.includes(i) === false) {
          newRecommend.push(i);
        }
      }
      if (comments) {
        newComments = this.filterTotalComment(comments);
      }
      if (newComments.length > 0) {
        for (let i of newComments) {
          if (parseFloat(i.totalRating) > 3) {
            if (newRecommend.includes(i.dishId) === false) {
              console.log(i.dishId);
              newRecommend.push(i.dishId);
            }
          }
        }
        // mapRecommend.push(mains[mains.length - 1]);
        // mapRecommend.push(appetizer[appetizer.length - 1]);
        // mapRecommend.push(side[side.length - 1]);
        // mapRecommend.push(desert[desert.length - 1]);
        if (newRecommend.includes(mains[mains.length - 1]._id) === false) {
          newRecommend.push(mains[mains.length - 1]._id);
        }
        if (
          newRecommend.includes(appetizer[appetizer.length - 1]._id) === false
        ) {
          newRecommend.push(appetizer[appetizer.length - 1]._id);
        }
        if (newRecommend.includes(side[side.length - 1]._id) === false) {
          newRecommend.push(side[side.length - 1]._id);
        }
        if (newRecommend.includes(desert[desert.length - 1]._id) === false) {
          newRecommend.push(desert[desert.length - 1]._id);
        }

        let mapRecommend = newRecommend.map((r) => {
          let findDish = this.props.dishes.dishes.find(
            (dish) => dish._id === r,
          );
          return findDish;
        });
        console.log(mapRecommend);
        return mapRecommend;
      }
    } else {
      return false;
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
      if (this.props.dishes.dishes) {
        let fetchRecommend = this.props.dishes.recommend;
        let fetchComments = this.props.comments.comments;
        let position = Animated.divide(this.scrollX, width);
        this.renderNewDishes(this.props.dishes.dishes);
        filterDishes(this.props.dishes.dishes);
        let recommend = this.mapRecommendToDishes(
          fetchRecommend,
          fetchComments,
        );
        return (
          <SafeAreaView style={{flex: 1}}>
            <StatusBar hidden />
            <ScrollView
              onScroll={(e) => {
                this.scrollY.setValue(e.nativeEvent.contentOffset.y);
              }}>
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
              {recommend ? (
                <>
                  <View style={styles.viewMenuContain}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingRight: 20,
                      }}>
                      <Text style={styles.labelText}>Món ngon cho bạn</Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('DishesCategory', {
                            dishes: recommend,
                          });
                          console.log('Go to Dishes Category');
                        }}
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontFamily: FONT_NORMAL, fontSize: 25}}>
                          More
                        </Text>
                        <Icon
                          name={'arrow-right'}
                          style="font-awesome"
                          color={COLOR2}
                          size={30}
                        />
                      </TouchableOpacity>
                    </View>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      {recommend.map((item, index) => {
                        if (index < 4) {
                          return (
                            <RenderRecommendDishes
                              key={index}
                              uri={item.image}
                              name={item.name}
                              price={item.price + '$'}
                              comments={this.filterComments(item._id)}
                              onPress={() =>
                                this.props.navigation.navigate(
                                  'DishesDetails',
                                  {
                                    dishId: item._id,
                                  },
                                )
                              }
                            />
                          );
                        } else {
                          return <View key={index}></View>;
                        }
                      })}
                    </ScrollView>
                  </View>
                </>
              ) : (
                <></>
              )}
              <View style={styles.viewMenuContain}>
                <Text style={styles.labelText}>
                  Cùng mở đầu cho một bữa ăn tuyệt vời
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {appetizer
                    .filter((item, index) => {
                      if (appetizer.length > 5) {
                        return index < 5;
                      }
                      return item;
                    })
                    .map((item, index) => {
                      return (
                        <RenderItemDishes
                          key={index}
                          uri={item.image}
                          name={item.name}
                          price={item.price + '$'}
                          comments={this.filterComments(item._id)}
                          onPress={() =>
                            this.props.navigation.navigate('DishesDetails', {
                              dishId: item._id,
                            })
                          }
                        />
                      );
                    })}
                  <View
                    style={[
                      styles.viewMenuContain,
                      {display: appetizer.length > 5 ? 'flex' : 'none'},
                    ]}>
                    <TouchableOpacity
                      style={{
                        width: 130,
                        height: 160,
                        marginHorizontal: 20,
                      }}
                      onPress={() => {
                        this.props.navigation.navigate('DishesCategory', {
                          target: 'appetizer',
                        });
                        console.log('Go to Dishes Category');
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: COLOR5,
                          borderRadius: borderRadiusOfItem,
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.2,
                          shadowRadius: 1.41,

                          elevation: 2,
                        }}>
                        <Icon
                          type="material"
                          name="arrow-right-alt"
                          size={50}
                          color={COLOR6}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: FONT_NORMAL,
                            color: COLOR6,
                          }}
                          numberOfLines={2}>
                          See all collection
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
              <View style={[styles.viewMenuContain, {backgroundColor: COLOR5}]}>
                <Text style={styles.labelText}>
                  Món chính cho một bữa ăn hoàn hảo
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {mains
                    .filter((item, index) => {
                      if (mains.length > 5) {
                        return index < 5;
                      }
                      return item;
                    })
                    .map((item, index) => {
                      return (
                        <RenderItemDishes
                          key={index}
                          uri={item.image}
                          name={item.name}
                          price={item.price + '$'}
                          comments={this.filterComments(item._id)}
                          onPress={() =>
                            this.props.navigation.navigate('DishesDetails', {
                              dishId: item._id,
                            })
                          }
                        />
                      );
                    })}
                  <View
                    style={[
                      styles.viewMenuContain,
                      {display: mains.length > 5 ? 'flex' : 'none'},
                    ]}>
                    <TouchableOpacity
                      style={{
                        width: 130,
                        height: 160,
                        marginHorizontal: 20,
                      }}
                      onPress={() => {
                        this.props.navigation.navigate('DishesCategory', {
                          target: 'mains',
                        });
                        console.log('Go to Dishes Category');
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: COLOR5,
                          borderRadius: borderRadiusOfItem,
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.2,
                          shadowRadius: 1.41,

                          elevation: 2,
                        }}>
                        <Icon
                          type="material"
                          name="arrow-right-alt"
                          size={50}
                          color={COLOR6}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: FONT_NORMAL,
                            color: COLOR6,
                          }}
                          numberOfLines={2}>
                          See all collection
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
              <View style={styles.viewMenuContain}>
                <Text style={styles.labelText}>Món phụ gấp đôi hạnh phúc</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {side
                    .filter((item, index) => {
                      if (side.length > 5) {
                        return index < 5;
                      }
                      return item;
                    })
                    .map((item, index) => {
                      return (
                        <RenderItemDishes
                          key={index}
                          uri={item.image}
                          name={item.name}
                          price={item.price + '$'}
                          comments={this.filterComments(item._id)}
                          onPress={() =>
                            this.props.navigation.navigate('DishesDetails', {
                              dishId: item._id,
                            })
                          }
                        />
                      );
                    })}
                  <View
                    style={[
                      styles.viewMenuContain,
                      {display: side.length > 5 ? 'flex' : 'none'},
                    ]}>
                    <TouchableOpacity
                      style={{
                        width: 130,
                        height: 160,
                        marginHorizontal: 20,
                      }}
                      onPress={() => {
                        this.props.navigation.navigate('DishesCategory', {
                          target: 'side',
                        });
                        console.log('Go to Dishes Category');
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: COLOR5,
                          borderRadius: borderRadiusOfItem,
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.2,
                          shadowRadius: 1.41,

                          elevation: 2,
                        }}>
                        <Icon
                          type="material"
                          name="arrow-right-alt"
                          size={50}
                          color={COLOR6}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: FONT_NORMAL,
                            color: COLOR6,
                          }}
                          numberOfLines={2}>
                          See all collection
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
              <View style={styles.viewMenuContain}>
                <Text style={styles.labelText}>Ngọt ngào đến từng hơi thở</Text>
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
                        comments={this.filterComments(item._id)}
                        onPress={() =>
                          this.props.navigation.navigate('DishesDetails', {
                            dishId: item._id,
                          })
                        }
                      />
                    );
                  })}
                  <View
                    style={[
                      styles.viewMenuContain,
                      {display: desert.length > 5 ? 'flex' : 'none'},
                    ]}>
                    <TouchableOpacity
                      style={{
                        width: 130,
                        height: 160,
                        marginHorizontal: 20,
                      }}
                      onPress={() => {
                        this.props.navigation.navigate('DishesCategory', {
                          target: 'desert',
                        });
                        console.log('Go to Dishes Category');
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: COLOR5,
                          borderRadius: borderRadiusOfItem,
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.2,
                          shadowRadius: 1.41,

                          elevation: 2,
                        }}>
                        <Icon
                          type="material"
                          name="arrow-right-alt"
                          size={50}
                          color={COLOR6}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: FONT_NORMAL,
                            color: COLOR6,
                          }}
                          numberOfLines={2}>
                          See all collection
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </SafeAreaView>
        );
      } else {
        return (
          <View>
            <Text>error</Text>
          </View>
        );
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
