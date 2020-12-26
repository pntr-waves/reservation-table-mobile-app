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
} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import {baseUrl} from '../../shared/baseUrl';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    bills: state.bills,
  };
};

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
class ReservationComponent extends React.Component {
  render() {
    console.log(this.props.bills.bill);
    console.log(baseUrl + this.props.dishes.dishes[0].image);
    const {navigate} = this.props.navigation;

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
                item.dish.category === 'mains'
                  ? 'Main Dish'
                  : item.dish.category
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
                position: "absolute",
                top:  6,
                right: 10,
                alignItems: "center",
                justifyContent: "center"
              }}>
              <Text style={{color: 'white'}}>{`x${item.amount}`}</Text>
            </View>
          </TouchableOpacity>
        </Swipeable>
      );
    };

    if (this.props.bills.bill) {
      let bill = this.props.bills.bill;
      let totalPrice = 0;
      for (let i of bill) {
        totalPrice += parseFloat(i.amount) * parseFloat(i.dish.price);
      }

      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.Header}>
            {/* <Icon
              name="f"
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
            <Icon
              name="a"
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
            /> */}
          </View>
          <FlatList
            data={this.props.bills.bill}
            renderItem={RenderDishesItem}
            keyExtractor={(item) => item.billId.toString()}
            style={styles.FlatListRender}
          />
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 30,
              paddingVertical: 20,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <Text style={{fontSize: 25, color: MAIN_COLOR}}>Tổng Cộng</Text>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 60,
                color: SUB_COLOR,
              }}>{`${totalPrice.toFixed(2)} $`}</Text>
          </View>
        </SafeAreaView>
      );
    } else {
      <SafeAreaView style={styles.container}>
        <View style={styles.Header}></View>
        <View>
          <Text>Bạn chưa đặt món trong hôm nay</Text>
        </View>
      </SafeAreaView>;
    }
  }
}

const HEIGHT_RENDER_ITEM = 110;
const MAIN_COLOR = '#8157de';
const SUB_COLOR = '#a6a8ab';
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
    width: 370,
    marginBottom: 20,
    borderRadius: 10,
    paddingRight: 40,
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

export default connect(mapStateToProps)(ReservationComponent);
