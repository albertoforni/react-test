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

const mapDispatchToProps = {
  onIncrement: increment,
  onDecrement: decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
