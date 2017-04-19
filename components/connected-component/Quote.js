import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getQuote, fetchQuote } from './module';

const Quote = ({ quote, onFetchQuote }) => (
  <div>
    <button className="t-fetch-quote" onClick={onFetchQuote}>Show a quote</button>
    {quote.loading ? <p className="t-quote">Loading</p> : null}
    {
      quote.quote
        ? <quote className="t-quote">{quote.quote}, {quote.author}</quote>
        : null
    }
  </div>
);

Quote.propTypes = {
  quote: PropTypes.shape({
    quote: PropTypes.string,
    author: PropTypes.string,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  onFetchQuote: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  quote: getQuote(state),
});

// Sadly I didn't find a way to use the shorthand notation and mock the module
const mapDispatchToProps = dispatch => ({
  onFetchQuote: () => dispatch(fetchQuote()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quote);
