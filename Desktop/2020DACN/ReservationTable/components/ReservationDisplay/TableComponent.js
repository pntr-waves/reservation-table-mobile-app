import React from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  Animated,
  StatusBar,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import {baseUrl} from '../../shared/baseUrl';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';
//redux get state
const mapStateToProps = (state) => {
  return {
    bills: state.bills,
    dishes: state.dishes,
    userId: state.user
  };
};

const LogoSource = '../../shared/img/Logo.png';
const PickerDiner = ['', 1, 2, 3, 4, 5, 6];
const Note = ['', 'Gần cửa', 'Nơi yên tĩnh', 'Nơi thoáng mát'];
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
    flexBasis: 60
  },
  ButtonConfirmContent: {
    width: '95%',
    backgroundColor: COLOR_HEADER,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  BillWrapper: {
    flexBasis: 350,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 300
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
const LeftAction = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View
      style={{
        backgroundColor: 'red',
        alignItems: 'flex-start',
        width: 370,
        justifyContent: 'center',
        height: HEIGHT_RENDER_ITEM,
        padding: 10,
        borderRadius: 10,
      }}>
      <Animated.Text
        style={[{color: 'white', fontSize: 20}, {transform: [{scale}]}]}>
        Delete
      </Animated.Text>
    </View>
  );
};

const RenderDishesItem = ({item}) => {
  return (
    <Swipeable renderLeftActions={LeftAction}>
      <TouchableOpacity
        style={styles.RenderItem}
        onPress={() =>
          navigate('DishesDetails', {
            dishId: item.dish.id,
          })
        }>
        <Image
          source={{uri: baseUrl + item.dish.image}}
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
            item.dish.category === 'mains' ? 'Main Dish' : item.dish.category
          }`}</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 4,
              color: '#8157de',
            }}>
            {item.dish.name}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: SUB_COLOR,
            }}>{`${item.dish.price} $`}</Text>
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
          <Text style={{color: 'white'}}>{`x${item.amount}`}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
function BillComponent({bills, navigation}) {
  if (bills.bill.length > 0) {
    return(
      <FlatList
        data={bills.bill}
        renderItem={RenderDishesItem}
        keyExtractor={(item) => item.billId.toString()}
        style={styles.FlatListRender}
      />
    )
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
      diners: 0,
      note: 'Yêu cầu thêm',
    };
  }

  ToggleDateModal() {
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
    switch (typeModal) {
      case 'date': {
        this.ToggleDateModal();
        this.setState({
          date: new Date(value),
        });
        break;
      }
      case 'time': {
        console.log(value);
        // let [hour, minute, second] = value.toLocaleTimeString("en-US").split(/:| /)
        // console.log(hour + " " + minute + " " + second)
        this.setState({
          time: new Date(value),
        });
        this.ToggleTimeModal();
        break;
      }
    }
  }

  confirmTables(date, time){
      
    axios.post("https://androidapp-reservation.herokuapp.com/reservation_tables" + this.props.user.user.id, {
      date: 
    })
  }

  render() {
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
            <Icon
              name="arrow-back"
              style="material"
              size={30}
              color="white"
              onPress={() => this.props.navigation.goBack()}
            />
            <Text style={styles.TextHeader}>Reservation Table</Text>
          </View>
          <View style={styles.FormWrapper}>
            <View style={styles.InputStyle}>
              <Text style={styles.LabelInput}>Date</Text>
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
                  onPress={() => this.ToggleDateModal()}
                  style={styles.TimeInput}>
                  {this.state.date.toDateString()}
                </Text>
              </View>
            </View>
            <View style={styles.InputStyle}>
              <Text style={styles.LabelInput}>Time</Text>
              <View style={styles.Picker}>
                <DateTimePickerModal
                  isVisible={this.state.showTimeModal}
                  mode="time"
                  display="spinner"
                  onConfirm={(time) => {
                    this.onConfirm('time', time);
                  }}
                  onCancel={() => this.ToggleTimeModal()}
                />
                <Text
                  onPress={() => this.setState({showTimeModal: true})}
                  style={styles.TimeInput}>
                  {this.state.date.toDateString()}
                </Text>
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
                    this.setState({
                      note: itemValue,
                    });
                  }}>
                  {Note.map((note, index) => (
                    <Picker.Item key={index} label={note} value={note} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.BillWrapper}>
            <BillComponent {...this.props} />
          </View>
          <View style={styles.ButtonConfirm}>
            <TouchableOpacity onPress={()=> confirmTables(this.state.date, this.state.time)} style={styles.ButtonConfirmContent}>
              <Text style={{color: 'white', fontSize: 20}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(TableComponent);
