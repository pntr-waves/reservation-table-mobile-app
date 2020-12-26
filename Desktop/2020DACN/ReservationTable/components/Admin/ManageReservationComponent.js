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
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {baseUrl} from '../../shared/baseUrl';
import {Loading} from '../PublicComponents/LoadingComponent';
import {fetchTables, fetchAllUser} from '../../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    tables: state.tables,
    dishes: state.dishes,
    users: state.users,
  };
};

const COLOR_HEADER = '#ffffff';
const COLOR_SAFE = '#14213d';
const COLOR_FONT = '#000000';
const COLOR_TRANSPARENT_SAFE_1 = '#1d3557';
const COLOR_TRANSPARENT_SAFE_2 = '#457b9d';
const COLOR_TRANSPARENT_SAFE_3 = '#a8dadc';
const SUB_FONT = '#e5e5e5';
const COLOR_BUTTON = '#f1faee';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLOR_HEADER,
  },
  HeaderContainer: {
    backgroundColor: COLOR_HEADER,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  TextHeader: {
    flexGrow: 1,
    textAlign: 'center',
    color: COLOR_FONT,
    fontSize: 20,
  },
  FlatListContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    width: '100%',
  },
});

class ManageTableComponents extends React.Component {

  render() {
    if (this.props.users.users.length > 0) {
      console.log(this.props.route)
      let {tables} = this.props.route.params
      let users = this.props.users.users;
      let data = [];

      for (let i = 0; i < tables.dishesId.length; i++) {
        data.push({
          dishId: tables.dishesId[i],
          notice: tables.notice[i],
          people: tables.people[i],
          time: tables.time[i],
          user: users.find((user) => user._id === tables.userId[i]),
        });
      }
      return (
        <SafeAreaView style={styles.Container}>
          <StatusBar hidden />
          <View style={styles.HeaderContainer}>
            <Text style={styles.TextHeader}>{`Bàn ${tables.name}`}</Text>
          </View>
          <View style={styles.FlatListContainer}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              style={{width: '100%', flex: 1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      height: 450,
                      width: 300,
                      alignSelf: 'center',
                      marginHorizontal: 20,
                      padding: 20,
                      alignItems: 'center',
                      justifyContent: "space-evenly",
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,

                      elevation: 3,
                      backgroundColor: COLOR_HEADER,
                      borderRadius: 20
                    }}>
                    <Text style={{fontSize: 25, fontWeight: "bold"}}>{`${item.user.local.name.toUpperCase()}`}</Text>
                    <Text style={{fontSize: 20,}}>{`Liên hệ: ${item.user.local.email}`}</Text>
                    <Text style={{fontSize: 20,}}>{`Số người: ${item.people}`}</Text>
                    <Text style={{fontSize: 20}}>{item.time}</Text>
                  </View>
                );
              }}
            />
          </View>
        </SafeAreaView>
      );
    } else {
      return <Loading color={COLOR_HEADER}></Loading>;
    }
  }
}


export default connect(
  mapStateToProps
)(ManageTableComponents);
