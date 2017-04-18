import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

import Counter from './Counter';

const store = configureStore({});

export default () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);
