import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import PropTypes from 'prop-types';
import FoodItem from '../components/fooditem';
import { fetchMenuItems } from '../store/actions/action.session';

export class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.items,
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

  renderSeparator() {
    return <View style={styles.separator} />;
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
        <View style={styles.container}>
          <View style={styles.dropdownTitle}>
            <Text>CATEGORIAS</Text>
          </View>
          <Menu onSelect={value => this.filterCategories(value)}>
            <MenuTrigger>
              <Text style={{ fontSize: 25 }}>ABRIR</Text>
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
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'lightblue',
  },
  dropdownTitle: {
    flex: 1,
  },
  flatlist: {
    flex: 1,
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

