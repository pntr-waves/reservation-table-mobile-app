import React from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';
import {Alert} from 'react-native';
//import redux
import {deleteBill} from '../../redux/ActionCreators';
//import url
import {DeleteCartUrl} from '../../shared/baseUrl';
//redux get state
const mapStateToProps = (state) => {
  return {
    bills: state.bills,
    dishes: state.dishes,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBill: (dish) => dispatch(deleteBill(dish)),
  };
};

const PickerDiner = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Note = [
  {
    diner: 1,
    note: ['', 'Gần cửa sổ', 'Nơi yên tĩnh'],
  },
  {
    diner: 2,
    note: ['', 'Gần cửa sổ', 'Nơi yên tĩnh'],
  },
  {
    diner: 3,
    note: ['', 'Bình thường', 'Gần cửa sổ'],
  },
  {
    diner: 4,
    note: ['', 'Bình thường', 'Gần cửa sổ'],
  },
  {
    diner: 5,
    note: ['', 'Bình thường', 'Gần cửa sổ'],
  },
  {
    diner: 6,
    note: ['', 'Bình thường', 'Gần cửa sổ'],
  },
  {
    diner: 7,
    note: ['', 'Bình thường'],
  },
  {
    diner: 8,
    note: ['', 'Bình thường'],
  },
  {
    diner: 9,
    note: ['', 'Bình thường'],
  },
  {
    diner: 10,
    note: ['', 'Bình thường'],
  },
];
const COLOR_HEADER = '#e63946';
const HEIGHT_RENDER_ITEM = 110;
const MAIN_COLOR = '#8157de';
const SUB_COLOR = '#a6a8ab';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderContainer: {
    backgroundColor: COLOR_HEADER,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  TextHeader: {
    flexGrow: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  FormWrapper: {
    paddingVertical: 5,
    justifyContent: 'center',
  },
  InputStyle: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  LabelInput: {
    fontSize: 20,
    backgroundColor: COLOR_HEADER,
    color: 'white',
    width: 130,
    borderRadius: 20,
    padding: 5,
    textAlign: 'center',
  },
  TimeInput: {
    fontSize: 20,
    paddingHorizontal: 20,
  },
  Picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  LabelPicker: {
    fontSize: 20,
  },
  ButtonConfirm: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    flexBasis: 60,
  },
  ButtonConfirmContent: {
    width: '95%',
    backgroundColor: COLOR_HEADER,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  BillWrapper: {
    flexBasis: 400,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BillContent: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  RenderItem: {
    height: HEIGHT_RENDER_ITEM,
    width: 370,
    marginBottom: 20,
    borderRadius: 10,
    paddingRight: 40,
    backgroundColor: '#ededed',
    flexDirection: 'row',
    alignItems: 'center',

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 3,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,

    // elevation: 2,
  },
  FlatListRender: {
    padding: 20,
  },
});
// const LeftAction = (progress, dragX) => {
//   const scale = dragX.interpolate({
//     inputRange: [0, 100],
//     outputRange: [0, 1],
//     extrapolate: 'clamp',
//   });
//   return (
//     <View
//       style={{
//         backgroundColor: 'red',
//         alignItems: 'flex-start',
//         width: 370,
//         justifyContent: 'center',
//         height: HEIGHT_RENDER_ITEM,
//         padding: 10,
//         borderRadius: 10,
//       }}>
//       <Animated.Text
//         onPress={}
//         style={[{color: 'white', fontSize: 20}, {transform: [{scale}]}]}>
//         Delete
//       </Animated.Text>
//     </View>
//   );
// };

function BillComponent({
  bills,
  user,
  navigation,
  deleteBill,
  check,
  toggleCart,
  toggleCartClose,
  data,
}) {
  console.log(check);
  if (bills.bills.length > 0) {
    if (check === 1) {
      return (
        <>
          <View
            style={[
              {
                marginVertical: 20,
                flexDirection: 'row',
                alignItems: 'center',
                width: 370,
                justifyContent: 'space-between',
              },
            ]}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: '#1d3557',
                width: 250,
              }}>
              Danh sách món trong giỏ hàng
            </Text>
            <TouchableOpacity
              onPress={toggleCartClose}
              style={{
                backgroundColor: '#1d3557',
                width: 50,
                padding: 10,
                borderRadius: 20,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                style="material"
                name="delete-outline"
                color="#f1faee"
                size={20}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                // <Swipeable onSwipeableLeftOpen={} renderLeftActions={LeftAction}>
                <TouchableOpacity
                  style={styles.RenderItem}
                  onPress={() =>
                    navigation.navigate('DishesDetails', {
                      dishId: item._id,
                    })
                  }>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      height: HEIGHT_RENDER_ITEM,
                      width: HEIGHT_RENDER_ITEM,
                      resizeMode: 'cover',
                      borderTopLeftRadius: 3,
                      borderBottomLeftRadius: 3,
                      marginRight: 15,
                    }}
                  />
                  <View
                    style={{
                      flexGrow: 1,
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingRight: 10,
                      width: 230,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: SUB_COLOR,
                        fontWeight: 'bold',
                      }}>{`${
                      item.category === 'mains' ? 'Main Dish' : item.category
                    }`}</Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginBottom: 4,
                        color: '#8157de',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: SUB_COLOR,
                      }}>{`${item.price} $`}</Text>
                  </View>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      backgroundColor: MAIN_COLOR,
                      position: 'absolute',
                      top: 6,
                      right: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      style="material"
                      name="delete-outline"
                      color="white"
                      size={20}
                      onPress={() => {
                        deleteBill(item._id);
                        axios.post(`${DeleteCartUrl}${user.user.id}`, {
                          dishesId: item._id,
                        });
                      }}
                    />
                  </View>
                </TouchableOpacity>
                // </Swipeable>
              );
            }}
            keyExtractor={(item) => item._id.toString()}
            style={styles.FlatListRender}
          />
        </>
      );
    } else {
      return (
        <View style={styles.BillContent}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#1d3557'}}>
            Bạn chưa chọn món ăn??
          </Text>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#1d3557'}}>
            Bạn có muốn đặt món có trong giỏ hàng hay không??
          </Text>
          <TouchableOpacity
            onPress={toggleCart}
            style={{
              backgroundColor: '#1d3557',
              width: 100,
              padding: 10,
              borderRadius: 20,
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20, color: '#f1faee'}}>Yes!!</Text>
          </TouchableOpacity>
        </View>
      );
    }
  } else {
    return (
      <View style={styles.BillContent}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#1d3557'}}>
          Bạn chưa chọn món ăn??
        </Text>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#1d3557'}}>
          Bạn có muốn chọn món ăn trước không??
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HomeStack');
          }}
          style={{
            backgroundColor: '#1d3557',
            width: 100,
            padding: 10,
            borderRadius: 20,
            marginTop: 10,
          }}>
          <Text style={{fontSize: 20, color: '#f1faee'}}>Go Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDateModal: false,
      showTimeModal: false,
      date: new Date(),
      time: new Date(),
      diners: 2,
      note: 'Yêu cầu thêm',
      checkCart: 0,
    };
  }
  componentDidMount() {
    console.log('come');
  }

  toggleCart() {
    this.setState({
      checkCart: 1,
    });
  }

  toggleCartClose() {
    this.setState({
      checkCart: 0,
    });
  }

  ToggleDateModal() {
    console.log('will go');
    this.setState({
      showDateModal: !this.state.showDateModal,
    });
  }

  ToggleTimeModal() {
    console.log('time');
    console.log(this.state.showTimeModal);
    this.setState({
      showTimeModal: false,
    });
  }

  onConfirm(typeModal, value) {
    let now = new Date();
    let [d, mth, y] = now.toLocaleDateString('en-GB').split('/');
    let [h, m, s] = now.toLocaleTimeString('en-GB').split(/:| /);
    let [day, month, year] = value.toLocaleDateString('en-GB').split('/');
    console.log(value.toLocaleDateString('en-GB').split('/'));
    switch (typeModal) {
      case 'date': {
        this.ToggleDateModal();
        if (
          (parseInt(y) === parseInt(year) &&
            parseInt(mth) > parseInt(month) &&
            parseInt(d) > parseInt(day)) ||
          (parseInt(y) === parseInt(year) &&
            parseInt(mth) === parseInt(month) &&
            parseInt(d) > parseInt(day)) ||
          (parseInt(y) === parseInt(year) &&
            parseInt(mth) === parseInt(month) &&
            parseInt(d) === parseInt(day))
        ) {
          Alert.alert(
            'Tạo đặt bàn thất bại',
            'Không được chọn ngày trong quá khứ',
            [
              {
                text: 'OK',
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
          break;
        } else {
          this.setState({
            date: new Date(value),
          });
          break;
        }
      }
      case 'time': {
        let [hour, minute, second] = value
          .toLocaleTimeString('en-GB')
          .split(/:| /);
        console.log(hour);
        if (
          (parseInt(hour) >= 10 && parseInt(hour) < 13) ||
          (parseInt(hour) >= 16 && parseInt(hour) < 21)
        ) {
          this.setState({
            time: new Date(value),
          });
        } else {
          Alert.alert(
            'Tạo đơn đặt bàn thất bại',
            'Thời gian hoạt động của chúng tôi là từ 10h-13h và từ 16h-21h',
            [
              {
                text: 'OK',
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
        this.ToggleTimeModal();
        break;
      }
    }
  }

  confirmTables() {
    var now = new Date();
    let [d, mth, y] = now.toLocaleDateString('en-GB').split('/');
    let [h, m, s] = now.toLocaleTimeString('en-GB').split(/:| /);
    let [day, month, year] = this.state.date
      .toLocaleDateString('en-GB')
      .split('/');
    let [hour, minute, second] = this.state.time
      .toLocaleTimeString('en-GB')
      .split(/:| /);
    if (
      (parseInt(y) === parseInt(year) &&
        parseInt(mth) > parseInt(month) &&
        parseInt(d) > parseInt(day)) ||
      (parseInt(y) === parseInt(year) &&
        parseInt(mth) === parseInt(month) &&
        parseInt(d) === parseInt(day) &&
        (parseInt(h) > parseInt(hour) ||
          (parseInt(h) === parseInt(hour) && parseInt(m) > parseInt(minute))))
    ) {
      Alert.alert(
        'Tạo đặt bàn thất bại',
        'Không được chọn ngày trong quá khứ',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      if (parseInt(minute) === 0 || parseInt(minute) === 30) {
        let dis = 0;
        if (this.state.note === 'Gần cửa sổ') {
          dis = 1;
        } else if (this.state.note === 'Nơi yên tĩnh') {
          dis = 2;
        }
        let data;

        data = {
          date: `${year}-${month}-${day}`,
          time: `${hour}:${minute}`,
          people: this.state.diners.toString(),
          distinction: dis.toString(),
        };
        console.log({
          date: `${year}-${month}-${day}`,
          time: `${hour}:${minute}`,
          people: this.state.diners.toString(),
          distinction: dis.toString(),
        });
        axios
          .post(
            'https://androidapp-reservation.herokuapp.com/reservation_tables/' +
              this.props.user.user.id +
              `/${this.state.check}`,
            data,
          )
          .then((res) => {
            if (res.data === 'err') {
              Alert.alert('Hiện tại không có bàn phù hợp với bạn', '', [
                {
                  text: 'OK',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
              ]);
            } else {
              Alert.alert('tạo bàn thành công', '', [
                {
                  text: 'OK',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
              ]);
            }
          })
          .catch((err) => {
            Alert.alert('Xảy ra lỗi', err, [
              {
                text: 'OK',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ]);
          });
      } else {
        Alert.alert(
          'Để tiện cho nhà hàng, số phút chỉ có thể là 0 hoặc 30',
          'Mong quý khách thông cảm',
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }
    }
  }

  mapCartToDishes() {
    if (this.props.bills.local_bills) {
      let cart = this.props.bills.local_bills;
      let newDishesInCart = [];
      for (let i of cart) {
        if (newDishesInCart.includes(i) === false) {
          newDishesInCart.push(i);
        }
      }
      let mapRecommend = newDishesInCart.map((r) => {
        let findDish = this.props.dishes.dishes.find((dish) => dish._id === r);
        return findDish;
      });
      console.log(mapRecommend);
      return mapRecommend;
    } else {
      return [];
    }
  }

  render() {
    let [hour, minute, second] = this.state.time
      .toLocaleTimeString('en-GB')
      .split(/:| /);
    if (this.props.user.user) {
      return (
        <SafeAreaView style={styles.Container}>
          <StatusBar hidden />
          <View
            style={{
              flex: 1,
              height: '100%',
              position: 'relative',
              alignItems: 'center',
              width: '100%',
            }}>
            <View style={styles.HeaderContainer}>
              <Text style={styles.TextHeader}>Reservation Table</Text>
            </View>
            <View style={styles.FormWrapper}>
              <View style={styles.InputStyle}>
                <TouchableOpacity onPress={() => this.ToggleDateModal()}>
                  <Text style={styles.LabelInput}>Date</Text>
                </TouchableOpacity>
                <View style={styles.Picker}>
                  <DateTimePickerModal
                    isVisible={this.state.showDateModal}
                    mode="date"
                    onConfirm={(date) => {
                      this.onConfirm('date', date);
                    }}
                    onCancel={() => this.ToggleDateModal()}
                  />
                  <Text
                    // onPress={() => this.ToggleDateModal()}
                    style={styles.TimeInput}>
                    {this.state.date.toDateString()}
                  </Text>
                </View>
              </View>
              <View style={styles.InputStyle}>
                <TouchableOpacity
                  onPress={() => this.setState({showTimeModal: true})}>
                  <Text style={styles.LabelInput}>Time</Text>
                </TouchableOpacity>
                <View style={styles.Picker}>
                  <DateTimePickerModal
                    isVisible={this.state.showTimeModal}
                    mode="time"
                    is24Hour={true}
                    minuteInterval={30}
                    display="spinner"
                    onConfirm={(time) => {
                      this.onConfirm('time', time);
                    }}
                    onCancel={() => this.ToggleTimeModal()}
                  />
                  <Text style={styles.TimeInput}>{`${hour}:${minute}`}</Text>
                </View>
              </View>
              <View style={styles.InputStyle}>
                <Text style={styles.LabelInput}>Diners</Text>
                <View style={styles.Picker}>
                  <Text
                    style={
                      styles.LabelPicker
                    }>{`${this.state.diners} người`}</Text>
                  <Picker
                    selectedValue={this.state.diners}
                    style={[
                      styles.TimeInput,
                      {
                        textAlign: 'center',
                        height: 34.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log(itemValue);
                      this.setState({
                        diners: itemValue,
                      });
                    }}
                    mode="dropdown">
                    {PickerDiner.map((diner, index) => (
                      <Picker.Item
                        key={index}
                        label={diner.toString()}
                        value={diner}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.InputStyle}>
                <Text style={styles.LabelInput}>Note</Text>
                <View style={styles.Picker}>
                  <Text style={styles.LabelPicker}>{this.state.note}</Text>
                  <Picker
                    selectedValue={this.state.note}
                    style={[
                      styles.TimeInput,
                      {
                        textAlign: 'center',
                        height: 34.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log(itemValue);
                      this.setState({
                        note: itemValue,
                      });
                    }}>
                    {Note.find((n) => n.diner === this.state.diners).note.map(
                      (nt, index) => (
                        <Picker.Item key={index} label={nt} value={nt} />
                      ),
                    )}
                  </Picker>
                </View>
              </View>
            </View>
            <View style={styles.BillWrapper}>
              <BillComponent
                data={this.mapCartToDishes()}
                toggleCart={() => this.toggleCart()}
                toggleCartClose={() => this.toggleCartClose()}
                check={this.state.checkCart}
                {...this.props}
              />
            </View>
            <View style={styles.ButtonConfirm}>
              <TouchableOpacity
                onPress={() => this.confirmTables()}
                style={styles.ButtonConfirmContent}>
                <Text style={{color: 'white', fontSize: 20}}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{flex: 1}}>
          <StatusBar hidden />
          <View style={styles.HeaderContainer}>
            <Text style={styles.TextHeader}>Reservation Table</Text>
          </View>
          <View style={{padding: 20}}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#1d3557'}}>
              Bạn chưa đăng nhập??
            </Text>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#1d3557'}}>
              Vui lòng đăng nhập để tiến hành đặt món!!!
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
              style={{
                backgroundColor: '#1d3557',
                width: 100,
                padding: 10,
                borderRadius: 20,
                marginTop: 10,
              }}>
              <Text style={{fontSize: 20, color: '#f1faee'}}>Go Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
