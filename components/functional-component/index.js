import React, { PropTypes } from 'react';

const Dropdown = props => (
  <select value={props.selected} onChange={e => props.onChange(e.target.value)}>
    { props.options.map(o => <option key={o.id}>{ o.text }</option>)}
  </select>
);

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  selected: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  selected: -1,
};

export default Dropdown;
