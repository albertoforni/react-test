import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { identity } from 'ramda';

import { quoteReducer } from './module';

// eslint-disable-next-line no-underscore-dangle
const devTools = ((global.window && global.window.__REDUX_DEVTOOLS_EXTENSION__) || identity);

const configureStore = initialState => createStore(
  combineReducers({ quote: quoteReducer }),
  initialState,
  compose(
    applyMiddleware(thunk),
    devTools()));

export default configureStore;
