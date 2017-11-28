import React, { Component } from 'react';;
import { Text,
         View,
         StyleSheet,
         TouchableOpacity,
         FlatList,
         ActivityIndicator } from 'react-native';
import FoodItem from '../components/fooditem';


export default class MenuScreen extends Component {

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

  renderItem(item, navigate){
    return (
      <TouchableOpacity >
        <FoodItem
          name={`${item.name}`}
          description={item.description}
          price={`${item.price}`}
          image={`${item.image}`}
          />
      </TouchableOpacity>
    )
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <FlatList
        style={styles.container}
        data={this.state.data}
        renderItem={({item}) => this.renderItem(item, navigate)}
        keyExtractor={item => item.name}
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
    const url = `http://10.0.0.79:3030/menu-items/`;
    this.setState({ loading: true });

    fetch(url)
      .then(response => response.json())
      .then(json => {
      this.setState({
        data: json.data || [],
        error: json.error || null,
        loading: false,
        refreshing: false
      });
    }).catch(error => {
      this.setState({ error, loading: false });
    });
  };

  handleRefresh = () => {
    this.setState({
      page: 1,
      seed: this.state.seed + 1,
      refreshing: true
    }, () => {
      this.makeRemoteRequest();
    });
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 }, () => { this.makeRemoteRequest(); } );
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
});
