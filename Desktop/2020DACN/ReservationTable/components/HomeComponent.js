import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return{
    dishes: state.dishes
  }
}

class HomeComponent extends React.Component {
  
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.HeaderWrapper}>
          <Text style={styles.HeaderText}>Home</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  HeaderWrapper: {
    height: 30, 
    width: "100%",
    alignItems: "center",
    marginBottom: 20
  },
  HeaderText: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold"
  }
})
export default HomeComponent;
