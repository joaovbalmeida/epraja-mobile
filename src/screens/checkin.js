import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import BusinessItem from '../components/businessitem';
import api from '../api';

export default class CheckinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest() {
    api.business.find()
      .then((json) => {
        this.setState({
          data: json.data || [],
        });
      }, error => console.log(error));
  }

  renderItem(item, navigate) {
    const description = `${item.adress}\n${item.type}\n${item.businessHours}\n${item.deliveryArea}`;
    description.split('\n').map(i => <div>{i}</div>);
    return (
      <TouchableOpacity
        onPress={() => (
          navigate('loginScreen', { id: item._id })
        )}
        activeOpacity={0.9}
      >
        <BusinessItem
          name={`${item.name}`}
          description={description}
          price={`${item.price}`}
          image={`${item.image}`}
        />
      </TouchableOpacity>
    );
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <FlatList
        style={styles.container}
        data={this.state.data}
        renderItem={({ item }) => this.renderItem(item, navigate)}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={this.renderSeparator}
      />
    );
  }
}

CheckinScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.object,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
  separator: {
    height: 1,
    width: '86%',
    backgroundColor: '#CED0CE',
    marginLeft: '14%',
  },
});
