import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TouchableHighlight, Modal, Image } from 'react-native';
import { connect } from 'react-redux';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import PropTypes from 'prop-types';
import { SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import MenuItem from '../components/menuitem';
import { fetchMenuItems, updateModal, resetState } from '../store/actions/action.session';
import OrderStack from '../layouts/order.stack';

class MenuScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle:
    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../utils/logo.png')}
        style={{width: 97, height: 30}}
      />
    </View>,
    headerLeft: <View style={{ width: '10%',}}></View>
  });

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.items,
      category: 'é pra tudo',
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.items });
  }

  componentDidUpdate() {
    if (!this.props.sessionActive) {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'checkinStack' }),
        ],
      }));
    }
  }

  setModalVisible() {
    this.props.updateModal(true);
  }

  filterCategories(id) {
    if (id === 0) {
      this.setState({
        data: this.props.items,
        category: 'é pra tudo',
      });
    } else {
      this.setState({
        data: this.props.items.filter(item => item.menuCategory.match(id)),
        category: this.props.categories.filter(item => item.id.match(id))[0].name,
      });
    }
  }

  filterItems(text) {
    this.setState({
      data: this.props.items.filter((item) => {
        const name = item.name.toLowerCase();
        const description = item.description.toLowerCase();
        return name.includes(text) || description.includes(text);
      }),
    });
  }

  makeRemoteRequest() {
    this.props.fetchMenuItems(this.props.businessID);
  }

  searchBarCleared() {
    this.setState({
      data: this.props.items,
    });
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  renderItem(item, navigate) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => (
          navigate('itemScreen', {
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.picture,
            id: item._id,
            menuCategory: item.menuCategory,
          })
        )}
      >
        <MenuItem
          name={item.name}
          description={item.description}
          price={`${item.price}`}
          image={`${item.picture}`}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const categories = this.props.categories.map(item => (
      <MenuOption key={item.id} value={item.id}>
        <Text>{item.name}</Text>
      </MenuOption>
    ));

    return (
      <MenuContext style={styles.view}>
        <View style={styles.searchBar}>
          <View style={styles.searchIconView}>
            <Image
              source={require('../utils/search.png')}
            />
          </View>
          <SearchBar
            lightTheme
            onChangeText={text => this.filterItems(text.toLowerCase())}
            onClearText={() => this.searchBarCleared()}
            containerStyle={styles.searchContainer}
            inputStyle={styles.searchInput}
            placeholder="procura que acha"
            placeholderTextColor="#231F1F"
            selectionColor="#231F1F"
            noIcon={true}
          />
          <TouchableOpacity
            style={styles.cart}
            onPress={() => this.setModalVisible()}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 38 }}>
              <Text style={{ textAlign: 'center', fontFamily: 'daxline-medium', fontSize: 14, color: '#EEE7E0' }}>
                é pra pedir
              </Text>
              <Image
                source={require('../utils/cart2.png')}
                style={{ marginLeft: 10 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={{ width: 65 }}></View>
          <View>
            <Text style={{ fontFamily: 'daxline-medium', fontSize: 16 }}>{this.state.category}</Text>
          </View>
          <Menu onSelect={value => this.filterCategories(value)}>
            <MenuTrigger style={styles.trigger}>
              <Image
                source={require('../utils/dropdown.png')}
                />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption value={0}>
                <Text>Todos</Text>
              </MenuOption>
              {categories}
            </MenuOptions>
          </Menu>
        </View>
        <FlatList
          style={styles.flatlist}
          data={this.state.data}
          renderItem={({ item }) => this.renderItem(item, navigate)}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReachedThreshold={50}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => null}
          style={{ backgroundColor: '#EDEAE2' }}
        >
          <OrderStack />
        </Modal>
      </MenuContext>
    );
  }
}

MenuScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.object,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMenuItems: PropTypes.func.isRequired,
  updateModal: PropTypes.func.isRequired,
  businessID: PropTypes.string.isRequired,
  sessionActive: PropTypes.bool.isRequired,
  modalVisible: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#EDEAE2',
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#919A98',
  },
  searchIconView: {
    flex: 1.2,
    height: 38,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#BEC2BD',
  },
  searchContainer: {
    flex: 3.8,
    height: 38,
    backgroundColor: '#BEC2BD',
  },
  searchInput: {
    height: 42,
    margin: -3,
    backgroundColor: '#BEC2BD',
    color: '#231F1F',
    textAlign: 'center',
    fontFamily: 'daxline-medium'
  },
  cart: {
    flex: 5,
    width: '50%',
    height: 38,
    backgroundColor: '#919A98',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    backgroundColor: '#AFB09E',
  },
  trigger: {
    marginRight: 25,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 38,
    width: 40,
  },
  flatlist: {
    flex: 1,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
  },
});

const mapStateToProps = state => (
  {
    categories: state.sessionReducer.menuCategories,
    businessID: state.sessionReducer.businessID,
    items: state.sessionReducer.menuItems,
    modalVisible: state.sessionReducer.modalVisible,
    tableNumber: state.sessionReducer.tableNumber,
    sessionActive: state.sessionReducer.sessionActive,
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    fetchMenuItems: id => dispatch(fetchMenuItems(id)),
    updateModal: modalVisible => dispatch(updateModal(modalVisible)),
    resetState: () => dispatch(resetState()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);

