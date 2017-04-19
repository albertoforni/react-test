import request from 'superagent';

import CONFIG from '../../config.json';

const LOADING = 'counter/LOADING';
const QUOTE = 'counter/QUOTE';
export const fetchQuote = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });

  request.get('https://andruxnet-random-famous-quotes.p.mashape.com/')
    .set('X-Mashape-Key', CONFIG.API_KEY)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Accept', 'application/json')
    .then((res) => {
      dispatch({
        type: QUOTE,
        payload: JSON.parse(res.text),
      });
    });
};

export const quoteReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case QUOTE:
      return {
        ...state,
        quote: action.payload.quote,
        author: action.payload.author,
        loading: false,
      };
    // TODO ERROR
    default:
      return state;
  }
};

export const getQuote = state => state.quote;
