import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import FoodItem from '../components/fooditem';
import { fetchMenuItems } from '../store/actions/action.session';
import api from '../api';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

export class MenuScreen extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: this.props.items
    };
  }

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
    const { navigate } = this.props.navigation;
    const categories = this.props.categories.map((item) => {
      return (
        <MenuOption key={item.id} value={item.id}>
          <Text>{item.name}</Text>
        </MenuOption>
      );
    });

    return (
      <MenuContext style={styles.view}>
        <View style={styles.container}>
          <View style={styles.dropdownTitle}>
            <Text>CATEGORIAS</Text>
          </View>
          <Menu onSelect={(value) => this.filterCategories(value)}>
            <MenuTrigger>
              <Text style={{ fontSize: 30}}>&#8942;</Text>
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
          renderItem={({item}) => this.renderItem(item, navigate)}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReachedThreshold={50}
          />
      </MenuContext>
    );
  }

  filterCategories = (id) => {
    if (id == 0) {
      this.setState({
        data: this.props.items
      });
    } else {
      this.setState({
        data: this.props.items.filter( item => {
          return item.menuCategory.match(id);
        })
      });
    }
  };

  getCategories = () => {
    this.props.categories.for
  };

  makeRemoteRequest = () => {
    this.props.fetchMenuItems(this.props.businessID);
  };

  renderSeparator = () => {
    return (
      <View style={styles.separator}/>
    );
  };
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'lightblue'
  },
  dropdownTitle: {
    flex:1
  },
  flatlist: {
    flex: 1
  }
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
