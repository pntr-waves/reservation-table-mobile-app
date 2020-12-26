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
import {Icon, SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {baseUrl} from '../../shared/baseUrl';
import {fetchTables, searchTables} from '../../redux/ActionCreators';
import {Loading} from '../PublicComponents/LoadingComponent';

const mapStateToProps = (state) => {
  return {
    tables: state.tables,
    dishes: state.dishes,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTables: () => dispatch(fetchTables()),
    searchTables: (text) => dispatch(searchTables(text)),
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
  ContainWrapper: {
    marginVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  AddTablesButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: COLOR_HEADER,
    alignItems: 'center',
    borderWidth: 0.8,
    borderStyle: 'solid',
    borderColor: SUB_FONT,
  },
  TextAddTablesButton: {
    fontSize: 25,
    color: COLOR_TRANSPARENT_SAFE_3,
    fontWeight: 'bold',
    flexGrow: 1,
  },
  IconAddTablesButton: {
    height: '100%',
    borderRadius: 13,
    padding: 2,
    backgroundColor: COLOR_BUTTON,
  },
});

function TablesList({tables, navigation}) {
  if (tables.tables.length) {
    return (
      <View style={{flexGrow: 1, marginVertical: 20}}>
        <FlatList
          data={tables.subTables}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate({name: "ManageReservationStack", key: "ManageReservationStack"+Math.random(1), params: {
                    tables: item
                  }});
                }}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  width: '100%',
                  backgroundColor: COLOR_HEADER,
                  borderBottomWidth: 0.6,
                  borderStyle: 'solid',
                  borderColor: SUB_FONT,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: COLOR_FONT,
                    fontSize: 25,
                    marginBottom: 5,
                    flexGrow: 1,
                  }}>
                  {`Bàn ${item.name}`}
                </Text>
                <Text style={{fontSize: 16, color: COLOR_TRANSPARENT_SAFE_2}}>
                  {item.time.length > 0 ? `${item.time.length} đặt bàn` : ``}
                </Text>
                <View
                  style={{
                    borderRadius: 50,
                    backgroundColor: COLOR_TRANSPARENT_SAFE_1,
                    height: 20,
                    width: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    marginLeft: 5,
                  }}>
                  <Icon
                    name="arrow-right"
                    type="material"
                    size={20}
                    color={COLOR_HEADER}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item._id.toString()}
          style={{paddingVertical: 10, marginBottom: 20, flex: 1}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  } else {
    if (tables.errMess) {
      return (
        <View>
          <Text style={{fontSize: 20, color: COLOR_FONT}}>
            {tables.errMess}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{height: 300}}>
          <Loading color={COLOR_TRANSPARENT_SAFE_3}></Loading>
        </View>
      );
    }
  }
}
class ManageTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.searchText = React.createRef();
  }

  componentDidMount() {
    this.props.fetchTables();
  }

  onChangeAndSearch(text) {
    this.searchText.current = text;
    this.props.searchTables(text.trim());
  }

  render() {
    return (
      <SafeAreaView style={styles.Container}>
        <StatusBar hidden />
        <View style={styles.HeaderContainer}>
          <Text style={styles.TextHeader}>Manage Reservation</Text>
        </View>
        <View style={styles.ContainWrapper}>
          <SearchBar
            ref={(ref) => {
              this.searchText = ref;
            }}
            placeholder="Search"
            onChangeText={(text) => this.onChangeAndSearch(text)}
            value={this.searchText.current}
            clearIcon={{type: 'material', color: COLOR_FONT, name: 'cancel'}}
            cancelIcon={{
              type: 'material',
              color: COLOR_FONT,
              name: 'arrow-back',
            }}
            lightTheme={true}
            platform="android"
            loadingProps={{size: 'large', color: COLOR_FONT}}
            containerStyle={{
              padding: 10,
              borderWidth: 0.5,
              height: 40,
              justifyContent: 'center',
              borderColor: COLOR_FONT,
              borderRadius: 50,
              borderWidth: 0.2,
            }}
          />
          <TablesList {...this.props} />
          <TouchableOpacity style={styles.AddTablesButton}>
            <Text style={styles.TextAddTablesButton}>Thêm bàn mới</Text>
            <View style={styles.IconAddTablesButton}>
              <Icon
                type="material"
                name="arrow-right-alt"
                size={40}
                color={COLOR_TRANSPARENT_SAFE_3}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageTableComponent);
