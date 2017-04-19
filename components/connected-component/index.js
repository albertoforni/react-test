import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

import Quote from './Quote';

const store = configureStore({});

export default () => (
  <Provider store={store}>
    <Quote />
  </Provider>
);
