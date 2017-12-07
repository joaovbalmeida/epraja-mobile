import React from 'react';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import MainNav, { BypassCheckinNav } from './src/layouts/main';
import sessionReducer from './src/store/reducers/reducer.session';

console.ignoredYellowBox = ['Setting a timer', 'Warning: Each child in'];

function configureStore() {

  const middlewares = [];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({
      collapsed: false,
    }));
    middlewares.push(thunk);
  }
  const reducer = persistCombineReducers(config, { sessionReducer });
  const config = {
    key: 'root',
    storage: AsyncStorage,
  };

  const store = createStore(reducer, compose(applyMiddleware(...middlewares)));
  const persistor = persistStore(store);

  const state = store.getState()
  const route = [];

  if (state.sessionReducer.tableNumber !== 0) {
    route.push(<BypassCheckinNa/>)
    return {store, persistor, route};
  } else {
    route.push(<MainNav/>)
    return {store, persistor, route};
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: null,
      persistor: null,
      route: null,
    }
  }

  async componentWillMount () {
    const {store, persistor, route} = await configureStore();
    this.setState({
      store: store,
      persistor: persistor,
      route: route,
    });
  }

  render {
    return (
      <Provider store={this.state.store}>
        <PersistGate persistor={this.state.persistor}>
          {this.state.route}
        </PersistGate>
      </Provider>
    )
  }
}

export default App;

