import React from 'react';
import {Animated} from 'react-native';
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {Icon, Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
  };
};

//font-family
const FONT_TITLE = 'Pacifico-Regular';
const FONT_NORMAL = 'Play-Regular';
//color
const HomeDisplayColor = '#00afb9';
const COLOR1 = '#00afb9';
//with
const {width, height} = Dimensions.get('window');
const SPACING = 10;
const HEIGHT_RENDER_ITEM = 450;
const ITEM_SIZE = width * 0.54;
const BACKDROP_HEIGHT = height * 0.65;

class CategoryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.scrollX = new Animated.Value(0);
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

  render() {
    const {navigate} = this.props.navigation;
    const {target, dishes} = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            height: BACKDROP_HEIGHT,
            width,
            position: 'absolute',
            top: 0,
          }}>
          <FlatList
            data={
              dishes
                ? dishes
                : this.props.dishes.dishes.filter((dish) => {
                    return dish.category === target;
                  })
            }
            keyExtractor={(item) => item._id + '-backdrop'}
            removeClippedSubviews={false}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{width: width, height: BACKDROP_HEIGHT}}
            renderItem={({item, index}) => {
              const translateX = this.scrollX.interpolate({
                inputRange: [index * ITEM_SIZE, (index + 1) * ITEM_SIZE],
                outputRange: [0, width],
              });
              return (
                <Animated.View
                  style={{
                    height,
                    transform: [{translateX}],
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width,
                      height: BACKDROP_HEIGHT,
                      position: 'absolute',
                    }}
                  />
                  <LinearGradient
                    colors={['#FFFFFF', '#FFFFFF00']}
                    style={{
                      height: 90,
                      width: width,
                      position: 'absolute',
                      top: 0,
                    }}></LinearGradient>
                  <LinearGradient
                    colors={['#FFFFFF00', '#FFFFFF']}
                    style={{
                      height: 300,
                      width: width,
                      position: 'absolute',
                      top: BACKDROP_HEIGHT - 270,
                    }}></LinearGradient>
                </Animated.View>
              );
            }}
          />
        </View>
        <View style={styles.Header}>
          <Icon
            name="arrow-back"
            style="material"
            size={30}
            color={HomeDisplayColor}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text
            style={{
              fontFamily: FONT_NORMAL,
              marginLeft: 20,
              fontSize: 20,
              color: HomeDisplayColor,
            }}>
            BACK TO MENU
          </Text>
        </View>
        <Animated.FlatList
          data={
            dishes
              ? dishes
              : this.props.dishes.dishes.filter((dish) => {
                  return dish.category === target;
                })
          }
          keyExtractor={(item) => item._id.toString()}
          style={styles.FlatListRender}
          horizontal={true}
          contentContainerStyle={{paddingRight: ITEM_SIZE * 0.68}}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_SIZE}
          decelerationRate={0.98}
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: this.scrollX}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          ListFooterComponent={<View style={{width: ITEM_SIZE}}></View>}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];

            const translateY = this.scrollX.interpolate({
              inputRange,
              outputRange: [0, -50, 0],
              extrapolate: 'clamp',
            });

            console.log(this.filterComments(item._id));
            let comments = this.filterComments(item._id);
            var totalRating = 0;
            var numberOfComments = 0;
            if (comments.length > 0) {
              for (let comment of comments) {
                totalRating = totalRating + parseInt(comment.rating);
                numberOfComments = numberOfComments + 1;
              }
            }

            return (
              <Animated.View
                style={[styles.RenderItem, {transform: [{translateY}]}]}>
                <TouchableOpacity
                  style={[
                    {
                      height: HEIGHT_RENDER_ITEM,
                      width: ITEM_SIZE,
                      borderRadius: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 3,
                      paddingVertical: 10,
                    },
                  ]}
                  onPress={() => {
                    console.log('onpress' + item.name);
                    this.props.navigation.navigate('DishesDetails', {
                      dishId: item._id,
                    });
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      height: 200,
                      width: 200,
                      resizeMode: 'cover',
                      borderRadius: 20,
                      marginBottom: 10,
                    }}
                  />
                  <View
                    style={{
                      flexGrow: 1,
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 25,
                        marginBottom: 4,
                        color: COLOR1,
                        alignSelf: 'center',
                        textAlign: 'center',
                        fontFamily: FONT_NORMAL,
                      }}>
                      {item.name.toUpperCase()}
                    </Text>
                    <Text style={{fontSize: 20}}>{`${item.price} $`}</Text>
                    {comments.length > 0 ? (
                      <>
                        <Text style={{fontSize: 15, color: '#f1c40f'}}>{`${(
                          totalRating / numberOfComments
                        ).toFixed(1)}/5`}</Text>
                        {totalRating !== 0 ? (
                          <Rating
                            ratingBackgroundColor={'#ededed'}
                            type="custom"
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
                        <Text
                          style={{
                            fontSize: 15,
                            color: '#f1c40f',
                          }}>{`5/5`}</Text>
                        <Rating
                          imageSize={10}
                          startingValue={5}
                          readonly={true}
                        />
                      </>
                    )}
                    <Text style={{width: '80%', textAlign: 'center'}}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  Header: {
    shadowOpacity: 1,
    height: 60,
    width: '100%',
    shadowColor: 'black',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  TextHeader: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  FlatListRender: {
    paddingLeft: 20,
    paddingRight: width + ITEM_SIZE,
  },

  RenderItem: {
    height: HEIGHT_RENDER_ITEM,
    width: ITEM_SIZE,
    borderRadius: 30,
    marginHorizontal: SPACING,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
  Banner: {
    padding: 10,
  },
});

export default connect(mapStateToProps)(CategoryDetail);
