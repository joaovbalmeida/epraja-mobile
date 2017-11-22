import React, { Component } from 'react';;
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Picker } from 'react-native';
import { connect } from 'react-redux';
import FoodItem from '../components/fooditem';
import { fetchMenuItems } from '../store/actions/action.session'
import api from '../api';

export class MenuScreen extends Component {

  componentDidMount() {
    this.makeRemoteRequest();
  }

  renderItem(item, navigate){
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <FoodItem
          name={item.name}
          description={item.description}
          price={`${item.price}`}
          image={`${item.image}`}
          />
      </TouchableOpacity>
    );
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <FlatList
        style={styles.container}
        data={this.props.items}
        renderItem={({item}) => this.renderItem(item, navigate)}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={this.renderSeparator}
        onEndReachedThreshold={50}
        />
    );
  }

  makeRemoteRequest() {
    this.props.fetchMenuItems(this.props.businessID);
  };

  renderSeparator = () => {
    return (
      <View style={styles.separator}/>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

const mapStateToProps = state => (
  {
    categories: state.sessionReducer.menuCategories,
    businessID: state.sessionReducer.businessID,
    items: state.sessionReducer.menuItems
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    fetchMenuItems: (id) => dispatch(fetchMenuItems(id))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
