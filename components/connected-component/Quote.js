import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getQuote, fetchQuote } from './module';

const Quote = ({ quote, onFetchQuote }) => (
  <div>
    <div className="buttons">
      <button className="t-fetch-quote" onClick={onFetchQuote}>Show a quote</button>
    </div>
    {quote.loading ? <p className="quote t-quote">Loading</p> : null}
    {
      !quote.loading && quote.quote
        ? <blockquote className="quote t-quote">{quote.quote}, {quote.author}</blockquote>
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
