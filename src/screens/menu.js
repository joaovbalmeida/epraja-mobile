import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import PropTypes from 'prop-types';
import { SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import MenuItem from '../components/menuitem';
import { fetchMenuItems, updateModal, resetState } from '../store/actions/action.session';
import OrderStack from '../layouts/order.stack';

class MenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Menu',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.items,
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
      });
    } else {
      this.setState({
        data: this.props.items.filter(item => item.menuCategory.match(id)),
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
          <SearchBar
            lightTheme
            onChangeText={text => this.filterItems(text.toLowerCase())}
            onClearText={() => this.searchBarCleared()}
            containerStyle={styles.searchContainer}
            placeholder="Buscar"
          />
          <TouchableHighlight
            style={styles.cart}
            onPress={() => this.setModalVisible()}
          >
            <Text style={{ textAlign: 'right', paddingRight: 10, fontSize: 18 }}>
              PEDIDOS
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.container}>
          <View style={styles.dropdownTitle}>
            <Text>CATEGORIAS</Text>
          </View>
          <Menu onSelect={value => this.filterCategories(value)}>
            <MenuTrigger>
              <Text style={{ fontSize: 18 }}>ABRIR</Text>
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
        <View style={styles.advertise}>
          <Text>PROPAGANDA</Text>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => null}
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
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  searchContainer: {
    flex: 1,
  },
  cart: {
    flex: 1,
    width: '50%',
    justifyContent: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    height: 40,
    padding: 10,
    backgroundColor: 'lightblue',
  },
  dropdownTitle: {
    flex: 1,
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

