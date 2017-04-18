import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCounterValue, increment, decrement } from './module';

const Counter = ({ counter, onIncrement, onDecrement }) => (
  <div>
    <h2>Counter: {counter}</h2>
    <div>
      <button className="t-increment" onClick={onIncrement}>+</button>
      <button className="t-decrement" onClick={onDecrement}>-</button>
    </div>
  </div>
);

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  counter: getCounterValue(state),
});

// Sadly I didn't find a way to use the shorthand notation and mock the module
const mapDispatchToProps = dispatch => ({
  onIncrement: () => dispatch(increment()),
  onDecrement: () => dispatch(decrement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
