import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

import getStore from './store';
import { Routes } from './config/routes';

const Navigator = StackNavigator(Routes, {
  headerMode: 'screen'
});

const navReducer = (state, action) => {
    const newState = Navigator.router.getStateForAction(action, state);
    return newState || state;
};

class App extends Component {
  render() {
      return (
          <Navigator
              navigation={addNavigationHelpers({
                  dispatch: this.props.dispatch,
                  state: this.props.nav
              })}
          />
      );
  }
}

const store = getStore(navReducer);
const AppIndex = connect(state => ({ nav: state.nav }))(App);

export default () => {
    return (
        <Provider store={store}>
            <AppIndex />
        </Provider>
    );
};
