import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { resetCart, fetchSurveyRates, fetchItemStatuses, fetchBillStatuses } from '../store/actions/action.session';
import BusinessItem from '../components/businessitem';
import api from '../api';

class CheckinScreen extends React.Component {
  static navigationOptions = {
    title: 'Check-in',
  };

  constructor(props) {
    super(props);
    if (this.props.sessionActive) {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'menuStack' }),
        ],
      }));
    }
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    if (!this.props.sessionActive) {
      this.props.resetCart();
    }
    this.props.fetchSurveyRates();
    this.props.fetchItemStatuses();
    this.props.fetchBillStatuses();
    this.makeRemoteRequest();
  }

  makeRemoteRequest() {
    api.business.find()
      .then((json) => {
        this.setState({
          data: json.data || [],
        });
      })
      .catch(error => console.log(error));
  }

  renderItem(item, navigate) {
    const address = item.address || '';
    const type = item.type || '';
    const businessHours = item.businessHours || '';
    const deliveryArea = item.deliveryArea || '';
    const description = `${address}\n${type}\n${businessHours}\n${deliveryArea}`;
    description.split('\n').map(i => <div>{i}</div>);
    return (
      <BusinessItem
        name={`${item.name}`}
        description={description}
        price={`${item.price}`}
        image={`${item.picture}`}
        navigate={navigate}
        id={item._id}
      />
    );
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatlist}
          data={this.state.data}
          renderItem={({ item }) => this.renderItem(item, navigate)}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <View style={styles.advertise}>
          <Text>PROPAGANDA</Text>
        </View>
      </View>
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
  sessionActive: PropTypes.bool.isRequired,
  resetCart: PropTypes.func.isRequired,
  fetchSurveyRates: PropTypes.func.isRequired,
  fetchItemStatuses: PropTypes.func.isRequired,
  fetchBillStatuses: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  flatlist: {
    flex: 1,
  },
  advertise: {
    height: 45,
    backgroundColor: 'gray',
  },
  separator: {
    height: 1,
    width: '86%',
    backgroundColor: '#CED0CE',
    marginLeft: '14%',
  },
});

const mapStateToProps = state => (
  {
    sessionActive: state.sessionReducer.sessionActive,
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    resetCart: () => dispatch(resetCart()),
    fetchSurveyRates: () => dispatch(fetchSurveyRates()),
    fetchItemStatuses: () => dispatch(fetchItemStatuses()),
    fetchBillStatuses: () => dispatch(fetchBillStatuses()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CheckinScreen);
