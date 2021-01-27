import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {Icon, Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  postComment,
  addLocalFavorites,
  addFavorite,
  deleteFavorite,
  addBill,
} from '../../redux/ActionCreators';
//import gradient
import LinearGradient from 'react-native-linear-gradient';
//axios
import axios from 'axios';
//comment
import {
  CommentsUrl,
  CartUrl,
  DeleteFavoriteUrl,
  AddFavoriteUrl,
} from '../../shared/baseUrl';

const mapStateToProps = (state) => {
  return {
    dishes: state?.dishes,
    bills: state.bills,
    comments: state.comments,
    favorites: state.favorites,
    users: state.users,
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postComment: (dishId, rating, comment, name) =>
      dispatch(postComment(dishId, rating, comment, name)),
    addLocalFavorites: (dishes) => dispatch(addLocalFavorites(dishes)),
    addFavorite: (dish) => dispatch(addFavorite(dish)),
    deleteFavorite: (dish) => dispatch(deleteFavorite(dish)),
    addBill: (dish) => dispatch(addBill(dish)),
  };
};

function DisplayModal({
  visible,
  toggleModal,
  comment,
  onChangeCommentsText,
  comments,
  onRatingComment,
  onPostComment,
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'slide'}
      onDismiss={toggleModal}
      onRequestClose={toggleModal}>
      <View
        style={{
          height: 530,
          width: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          top: 270,
        }}>
        <View
          style={{
            height: 60,
            width: '100%',
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,
          }}>
          <Text
            style={{fontSize: 20, color: '#8157de', fontFamily: FONT_NORMAL}}>
            Comments
          </Text>
          <Icon
            name={'close'}
            style="font-awesome"
            color="#8157de"
            size={30}
            onPress={toggleModal}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Rating
            imageSize={15}
            startingValue={5}
            showRating
            onFinishRating={onRatingComment}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 10,
          }}>
          <TextInput
            placeholder="type your comment"
            style={{flexGrow: 1, height: 60, fontSize: 19}}
            underlineColorAndroid="#8157de"
            ref={(ref) => {
              comment = ref;
            }}
            value={comment.current}
            onChangeText={onChangeCommentsText}
          />
          <TouchableOpacity
            onPress={onPostComment}
            style={{
              flexBasis: 100,
              backgroundColor: '#8157de',
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white'}}>POST</Text>
          </TouchableOpacity>
        </View>
        {comments.length > 0 ? (
          <>
            {comments.map((comment, index) => {
              return (
                <View
                  key={index}
                  style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      width: 70,
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    {comment.userName}
                  </Text>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#f1c40f',
                      }}>{`${comment.rating}/5`}</Text>
                    <Rating
                      imageSize={12}
                      startingValue={Number(comment.rating)}
                      readonly={true}
                    />
                  </View>
                  <Text style={{flexGrow: 1, fontSize: 18, color: '#a6a8ab'}}>
                    {comment.comment}
                  </Text>
                </View>
              );
            })}
          </>
        ) : (
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, color: '#a6a8ab'}}>
              Chưa có đánh giá nào
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
}

function ReservationModal({
  toggleModalReservation,
  visible,
  dish,
  postBillToState,
  user,
  navigateLogin,
}) {
  return (
    <Modal
      visible={visible}
      onDismiss={toggleModalReservation}
      onRequestClose={toggleModalReservation}
      transparent={true}
      animationType="slide">
      <View
        style={{
          width: '95%',
          backgroundColor: 'white',
          position: 'absolute',
          top: 240,
          borderRadius: 10,
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}>
        <View
          style={{
            height: 60,
            width: '100%',
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: 'white',
          }}>
          <Icon
            name={'close'}
            style="font-awesome"
            color="#8157de"
            size={30}
            onPress={toggleModalReservation}
          />
        </View>
        {user ? (
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: 'black',
                }}>{`Bạn muốn đặt ${dish}`}</Text>
            </View>
            <View style={{marginTop: 20, alignItems: 'flex-end'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#8157de',
                  width: 60,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}
                onPress={postBillToState}>
                <Text style={{fontSize: 20, color: 'white'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: 'black',
                }}>{`Bạn chưa đăng nhập?`}</Text>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                }}>{`Bạn có muốn chuyển sang trang Đăng nhập?`}</Text>
            </View>
            <View style={{marginTop: 20, alignItems: 'flex-end'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#8157de',
                  width: 60,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}
                onPress={navigateLogin}>
                <Text style={{fontSize: 20, color: 'white'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

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

class DishesDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showModal: false,
      showReservation: false,
      amountRender: '1',
      ratingComment: 5,
    };

    this.comment = React.createRef();
  }

  componentDidMount() {
    this.addDataLocalFavorites();
  }
  toggleModal() {
    if (this.comment.current) {
      Alert.alert(
        '',
        'Are you keep typing your comment?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel');
              this.comment.current = '';
              this.setState({
                showModal: !this.state.showModal,
              });
            },
            style: 'cancel',
          },
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
    } else {
      this.setState({
        showModal: !this.state.showModal,
      });
    }
  }

  toggleModalReservation() {
    this.setState({
      showReservation: !this.state.showReservation,
    });
  }

  onChangeCommentsText(text) {
    this.comment.current = text;
    console.log(this.comment);
  }

  onChangeAmountText(text) {
    if (parseInt(text) >= 0) {
      this.setState({
        amountRender: text,
      });
    }
  }

  onReduceAmountText() {
    let reduce = parseInt(this.state.amountRender);
    reduce -= 1;
    if (reduce >= 0) {
      this.setState({
        amountRender: reduce.toString(),
      });
    }
  }

  onIncreaseAmountText() {
    let increase = parseInt(this.state.amountRender);
    increase += 1;
    this.setState({
      amountRender: increase.toString(),
    });
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

  onRatingComment(rating) {
    console.log(rating);
    this.setState({
      ratingComment: rating,
    });
  }

  async onPostComment(dishId, rating, comment, name = '') {
    if (this.props.user.user) {
      console.log(CommentsUrl + '/' + this.props.user.user.id);

      await axios.post(CommentsUrl + '/' + this.props.user.user.id, {
        dishId,
        rating,
        comment,
      });
      this.props.postComment(dishId, rating, comment, name);
    } else {
      Alert.alert(
        'Chưa đăng nhập',
        'Bạn có muốn đăng nhập không?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              this.comment.current = '';
              this.setState({
                showModal: !this.state.showModal,
              });
              this.props.navigation.navigate('Login');
            },
          },
        ],
        {cancelable: false},
      );
    }
  }

  async postToCart(userId, dishId) {
    if (this.props.user.user) {
      console.log(CartUrl + userId);
      this.props.addBill(dishId);
      axios
        .post(CartUrl + userId, {
          dishesId: dishId,
        })
        .then((res) => {
          if (res.data === 'ok') {
            Alert.alert(
              'Đặt món thành công',
              '',
              [
                {
                  text: 'OK',
                  style: 'cancel',
                },
              ],
              {
                cancelable: false,
              },
            );
          }
        });
    }
  }

  addDataLocalFavorites() {
    if (this.props.user.user) {
      let listFavorites = this.props.favorites.favorites.find(
        (favorite) => favorite.userId === this.props.user.user.id,
      );
      this.props.addLocalFavorites(listFavorites.dishesId);
    }
  }
  //check favorites
  checkPropsFavorite(favorites, user, dishId) {
    if (user) {
      return favorites.localFavorites.includes(dishId);
    } else {
      return false;
    }
  }

  actionFavorite(check, dishId) {
    switch (check) {
      case true: {
        this.props.deleteFavorite(dishId);
        axios.post(`${DeleteFavoriteUrl}${this.props.user.user.id}`, {
          dishesId: dishId,
        });
        break;
      }
      case false: {
        this.props.addFavorite(dishId);
        axios.post(`${AddFavoriteUrl}${this.props.user.user.id}`, {
          dishesId: dishId,
        });
        break;
      }
    }
  }

  render() {
    const {dishId} = this.props.route.params;
    const dish = this.props.dishes.dishes.find((dish) => dish._id === dishId);
    const recommend = this.props.dishes.dishes.filter(
      (el) => el._id !== dishId && el.category === dish.category,
    );
    const checkFavorite = this.checkPropsFavorite(
      this.props.favorites,
      this.props.user.user,
      dishId,
    );
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{uri: dish.image}}
          style={styles.background}></ImageBackground>
        {/* view background color gradient */}

        {/* View button favorite */}
        <LinearGradient
          colors={['#f8f9fa', '#FFFFFF00']}
          style={{
            position: 'absolute',
            top: 0,
            height: 60,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingBottom: 15,
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" type="material" size={30} color="#8157de" />
          </TouchableOpacity>
          {this.props.user.user ? (
            <TouchableOpacity>
              <Icon
                name={checkFavorite ? 'favorite' : 'favorite-border'}
                type="material"
                size={30}
                color="#8157de"
                onPress={() => this.actionFavorite(checkFavorite, dishId)}
              />
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </LinearGradient>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.toggleModalReservation();
          }}
          style={styles.ReserveBackground}>
          <Text style={styles.ReserveText}>Reserve</Text>
        </TouchableOpacity>
        <ReservationModal
          toggleModalReservation={() => {
            this.toggleModalReservation();
          }}
          visible={this.state.showReservation}
          amount={this.state.amountRender}
          dish={dish.name}
          user={this.props.user.user}
          navigateLogin={() => {
            this.props.navigation.navigate('Login');
            this.toggleModalReservation();
          }}
          postBillToState={() => {
            this.postToCart(this.props.user.user.id, dishId);
            this.toggleModalReservation();
          }}
        />
        <View style={{height: 400, paddingVertical: 20}}>
          <ScrollView>
            <View style={[styles.WrapperContent]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: 30,
                  marginTop: 25,
                }}>
                <Text
                  style={[
                    styles.DescriptionContent,
                    {fontFamily: FONT_NORMAL, fontSize: 35, color: '#8157de'},
                  ]}>
                  {dish.name}
                </Text>
                <Text style={styles.DetailsPrices}>{`${(
                  dish.price * this.state.amountRender
                ).toFixed(2)} $`}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: 30,
                }}>
                <Text style={[styles.DescriptionContent, {fontSize: 14}]}>
                  {dish.category}
                </Text>
              </View>
            </View>
            <View style={styles.WrapperContent}>
              <TouchableOpacity style={styles.DescriptionTitle}>
                <Text
                  style={[styles.DescriptionText, {fontFamily: FONT_NORMAL}]}>
                  About
                </Text>
              </TouchableOpacity>
              <Text style={[styles.DescriptionContent, {fontSize: 20}]}>
                {dish.description}
              </Text>
            </View>
            <View style={styles.WrapperContent}>
              <TouchableOpacity
                style={styles.DescriptionTitle}
                onPress={() => this.toggleModal()}>
                <Text
                  style={[styles.DescriptionText, {fontFamily: FONT_NORMAL}]}>
                  Comments
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    right: 2,
                    position: 'absolute',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#8157de',
                    }}>
                    More
                  </Text>
                  <Icon
                    name="expand-more"
                    style="font-awesome"
                    solid
                    reverse
                    color="#8157de"
                    size={14}
                  />
                </View>
              </TouchableOpacity>
              {/* comment */}
              {this.filterComments(dishId).length > 0 ? (
                <>
                  {this.filterComments(dishId).map((comment, index) => {
                    if (
                      index < this.filterComments(dishId).length &&
                      index > this.filterComments(dishId).length - 3
                    ) {
                      return (
                        <View
                          key={index}
                          style={{
                            paddingHorizontal: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              width: 70,
                              fontWeight: 'bold',
                              fontSize: 20,
                            }}>
                            {comment.userName}
                          </Text>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginHorizontal: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                color: '#f1c40f',
                              }}>{`${comment.rating}/5`}</Text>
                            <Rating
                              imageSize={12}
                              startingValue={Number(comment.rating)}
                              readonly={true}
                            />
                          </View>
                          <Text
                            style={{
                              flexGrow: 1,
                              fontSize: 18,
                              color: '#a6a8ab',
                            }}>
                            {comment.comment}
                          </Text>
                        </View>
                      );
                    }
                  })}
                </>
              ) : (
                <View
                  style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 20, color: '#a6a8ab'}}>
                    Chưa có đánh giá nào
                  </Text>
                </View>
              )}
            </View>
            <DisplayModal
              visible={this.state.showModal}
              comment={this.comment}
              comments={this.filterComments(dishId)}
              onRatingComment={(rating) => this.onRatingComment(rating)}
              toggleModal={() => {
                this.toggleModal();
              }}
              onChangeCommentsText={(text) => {
                this.onChangeCommentsText(text);
              }}
              onPostComment={() => {
                if (this.props.user.user) {
                  this.onPostComment(
                    dishId,
                    this.state.ratingComment.toString(),
                    this.comment.current,
                    this.props.user.user.name,
                  );
                } else {
                  Alert.alert(
                    'Chưa đăng nhập',
                    'Bạn có muốn đăng nhập không?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          this.comment.current = '';
                          this.setState({
                            showModal: !this.state.showModal,
                          });
                          this.props.navigation.navigate('Login');
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }
              }}
            />
            {recommend.length > 0 ? (
              <>
                <View style={{padding: 20, marginBottom: 5}}>
                  <Text
                    style={{
                      fontFamily: FONT_NORMAL,
                      fontSize: 25,
                      color: '#8157de',
                    }}>
                    Recommend Menu
                  </Text>
                </View>
              </>
            ) : (
              <></>
            )}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {recommend.map((item, index) => {
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
            </ScrollView>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const FONT_TITLE = 'Pacifico-Regular';
const FONT_NORMAL = 'Play-Regular';
const COLOR5 = '#ffffff';
const borderRadiusOfItem = 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: '#8157de',
    width: 350,
    height: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  ReserveText: {
    color: 'white',
    fontSize: 20,
  },
  DescriptionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    width: '100%',
    alignItems: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
  },
  DescriptionText: {
    color: '#8157de',
    fontSize: 25,
  },
  DescriptionContent: {
    color: '#a6a8ab',
    paddingLeft: 20,
    flex: 1,
  },
  WrapperContent: {
    width: '100%',
    marginBottom: 20,
    flexGrow: 1,
  },
  DetailsPrices: {
    fontSize: 40,
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DishesDetailsComponent);
