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
} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../../shared/baseUrl';
import {postBill} from '../../redux/ActionCreators';
import {updateBill} from '../../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    dishes: state?.dishes,
    bills: state.bills,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postBillReservation: (dish, amount) => dispatch(postBill(dish, amount)),
    updateBillReservation: (dish, amount) =>
      dispatch(updateBill(dish, amount)),
  };
};

function DisplayModal({visible, toggleModal, comment, onChangeCommentsText}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'slide'}
      onDismiss={toggleModal}
      onRequestClose={toggleModal}>
      <View
        style={{
          height: 500,
          width: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          top: 302,
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
          <Text style={{fontSize: 20, color: '#8157de'}}>Comments</Text>
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
            padding: 20,
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
          }}>
          <Text style={{width: 70, fontWeight: 'bold', fontSize: 18}}>
            Author
          </Text>
          <Text style={{flexGrow: 1, fontSize: 14}}>nice!</Text>
        </View>
      </View>
    </Modal>
  );
}

function ReservationModal({
  toggleModalReservation,
  visible,
  amount,
  dish,
  postBillToState,
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
          <Text style={{fontSize: 20, color: '#8157de'}}>Reservation</Text>
          <Icon
            name={'close'}
            style="font-awesome"
            color="#8157de"
            size={30}
            onPress={toggleModalReservation}
          />
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <View>
            <Text
              style={{
                fontSize: 25,
                color: '#a6a8ab',
              }}>{`Bạn muốn đặt ${amount} phần ${dish}`}</Text>
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
      </View>
    </Modal>
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
    };

    this.comment = React.createRef();
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
    this.setState({
      amountRender: text,
    });
  }

  onReduceAmountText() {
    let reduce = parseInt(this.state.amountRender);
    reduce -= 1;
    this.setState({
      amountRender: reduce.toString(),
    });
  }

  onIncreaseAmountText() {
    let increase = parseInt(this.state.amountRender);
    increase += 1;
    this.setState({
      amountRender: increase.toString(),
    });
  }

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
          dish={dish[0].name}
          postBillToState={() => {
            let checkDishInBill = this.props.bills.bill.some(
              (el) => el.dish.id === dish[0].id,
            );
            if (checkDishInBill) {
              this.props.updateBillReservation(
                dish[0],
                this.state.amountRender,
              );
            } else {
              this.props.postBillReservation(
                dish[0],
                this.state.amountRender,
              );
            }
            this.toggleModalReservation();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              shadowColor: '#000',
              backgroundColor: 'white',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,

              elevation: 1,

              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.onReduceAmountText();
            }}>
            <Text style={{fontSize: 30, alignSelf: 'center', color: '#8157de'}}>
              -
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="1"
            placeholderTextColor="#8157de"
            keyboardType="numeric"
            value={this.state.amountRender}
            onChangeText={(text) => {
              this.onChangeAmountText(text);
            }}
            defaultValue="1"
            style={{
              textAlign: 'center',
              backgroundColor: 'white',
              color: '#8157de',
              height: 60,
              width: 70,
              fontSize: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,

              elevation: 1,
            }}
          />
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              shadowColor: '#000',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,

              elevation: 1,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
            onPress={() => this.onIncreaseAmountText()}>
            <Text style={{fontSize: 30, alignSelf: 'center', color: '#8157de'}}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView>
            <View style={[styles.WrapperContent]}>
              <TouchableOpacity
                style={[styles.DescriptionTitle, {marginTop: 40}]}>
                <Text style={[styles.DescriptionText]}>Details</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: 30,
                }}>
                <Text style={styles.DescriptionContent}>{dish[0].name}</Text>
                <Text style={styles.DetailsPrices}>{`${dish[0].price} $`}</Text>
              </View>
            </View>
            <View style={styles.WrapperContent}>
              <TouchableOpacity style={styles.DescriptionTitle}>
                <Text style={[styles.DescriptionText]}>Description</Text>
              </TouchableOpacity>
              <Text style={styles.DescriptionContent}>
                {dish[0].description}
              </Text>
            </View>
            <View style={styles.WrapperContent}>
              <TouchableOpacity
                style={styles.DescriptionTitle}
                onPress={() => this.toggleModal()}>
                <Text style={[styles.DescriptionText]}>Comments</Text>
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
              <View
                style={{
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{width: 70, fontWeight: 'bold', fontSize: 18}}>
                  Author
                </Text>
                <Text style={{flexGrow: 1, fontSize: 14}}>nice!</Text>
              </View>
            </View>
            <DisplayModal
              visible={this.state.showModal}
              comment={this.comment}
              toggleModal={() => {
                this.toggleModal();
              }}
              onChangeCommentsText={(text) => {
                this.onChangeCommentsText(text);
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

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
    width: '100%',
    alignItems: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
  },
  DescriptionText: {
    color: '#8157de',
    fontSize: 30,
  },
  DescriptionContent: {
    fontSize: 20,
    color: '#a6a8ab',
    paddingHorizontal: 20,
    flex: 1,
    textAlign: 'justify',
  },
  WrapperContent: {
    width: '100%',
    marginBottom: 20,
    flexGrow: 1,
  },
  DetailsPrices: {
    fontSize: 40,
    color: '#8157de',
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DishesDetailsComponent);
