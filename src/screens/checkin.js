import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import BusinessItem from '../components/businessitem';
import api from '../api';

export default class CheckinScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest() {
    api.business.find()
      .then( json => {
        this.setState({
          data: json.data,
          error: json.error || null,
          loading: false,
          refreshing: false
        });
      }, error => {
        console.log(error)
      });
  };

  render(){
    const { navigate } = this.props.navigation
    return (
      <FlatList
        style={styles.container}
        data={this.state.data}
        renderItem={({item}) => this.renderItem(item, navigate)}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={50}
      />
    );
  }

  renderItem = (item, navigate) => {
    var description = `${item.adress}\n${item.type}\n${item.businessHours}\n${item.deliveryArea}`;
    description.split("\n").map(i => {
      return <div>{i}</div>;
    })

    return (
      <TouchableOpacity onPress={() => navigate('loginScreen', { id: item._id }, )} activeOpacity={0.8}>
        <BusinessItem
          name={`${item.name}`}
          description={description}
          price={`${item.price}`}
          image={`${item.image}`}
          />
      </TouchableOpacity>
    )
  }

  handleRefresh = () => {
    this.setState({
        refreshing: true
      }, () => {
        this.makeRemoteRequest();
      });
  };

  renderSeparator = () => {
    return (
      <View style={styles.separator}/>
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      height: '100%',
      width: '100%',
    },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
  separator: {
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%",
  }
});
