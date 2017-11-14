import React, { Component } from 'react';
import { View,
        Text,
        StyleSheet,
        FlatList,
        ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import RestaurantItem from '../components/restaurant';

export default class CheckinScreen extends Component {

  constructor(props) {
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

  renderFlatListItem(item) {
    var description = `${item.adress}\n${item.type}\n${item.businessHours}\n${item.deliveryArea}`;
    description.split("\n").map(i => {
      return <div>{i}</div>;
    })

    return (
      <RestaurantItem
        name={`${item.name}`}
        description={description}
        price={`${item.price}`}
        image={`${item.image}`}
      />
    )
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.data}
        renderItem={({item}) => this.renderFlatListItem(item)}
        keyExtractor={item => item.email}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={50}
      />
    );
  }

  makeRemoteRequest = () => {
    const url = `http://10.0.0.79:3030/businesses/`;
    this.setState({ loading: true });

    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json.data,
          error: json.error || null,
          loading: false,
          refreshing: false
        });
      }).catch(error => {
        this.setState({ error, loading: false });
      });

    console.log(this.props.data)
    };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
            width: "86%",
              backgroundColor: "#CED0CE",
                marginLeft: "14%"
        }}
        />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
            borderTopWidth: 1,
              borderColor: "#CED0CE"
        }}
        >
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
});
