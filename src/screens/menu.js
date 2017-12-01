import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import PropTypes from 'prop-types';
import { SearchBar, Button } from 'react-native-elements';
import MenuItem from '../components/menuitem';
import { fetchMenuItems } from '../store/actions/action.session';

export class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.items,
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
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

  makeRemoteRequest() {
    this.props.fetchMenuItems(this.props.businessID);
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
            image: item.image,
            id: item._id,
          })
        )}
      >
        <MenuItem
          name={item.name}
          description={item.description}
          price={`${item.price}`}
          image={`${item.image}`}
        />
      </TouchableOpacity>
    );
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
            containerStyle={styles.searchContainer}
            placeholder="Buscar"
          />
          <TouchableHighlight
            style={styles.cart}
            onPress={() => this.setModalVisible(true)}
          >
            <Text style={{textAlign: 'right', paddingRight: 10, fontSize: 20,}}>
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={styles.modal}>
            <View style={styles.top}>
              <TouchableHighlight
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                >
                <Text style={styles.closeButton}>&#10799;</Text>
              </TouchableHighlight>
              <View>
                <Text style={styles.closeButton}>&#128651;</Text>
              </View>
            </View>
            <View style={styles.bottom}>
              <Button
                title="MONTAGEM DO SEU PEDIDO"
              />
              <Button
                title="PEDIDOS PENDENTES"
              />
              <Button
                title="CONTA"
              />
            </View>
          </View>
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
  businessID: PropTypes.string.isRequired,
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
    height: 45,
    padding: 10,
    backgroundColor: 'lightblue',
  },
  dropdownTitle: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
  },
  modal: {
    flex: 1,
    marginTop: 30,
    paddingBottom: 50,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    marginHorizontal: 15,
    marginTop: 10,
  },
  bottom: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    height: '50%',
    marginHorizontal: 30,
    paddingVertical: 20,
  },
  closeButton: {
    width: 30,
    fontSize: 30,
  },
});

const mapStateToProps = state => (
  {
    categories: state.sessionReducer.menuCategories,
    businessID: state.sessionReducer.businessID,
    items: state.sessionReducer.menuItems,
  }
);

const mapDispatchToProps = dispatch => (
  {
    dispatch,
    fetchMenuItems: id => dispatch(fetchMenuItems(id)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);

