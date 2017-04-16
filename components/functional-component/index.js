import React, { PropTypes } from 'react';

const Dropdown = props => (
  <select value={props.selected} onChange={e => props.onChange(e.target.value)}>
    { props.options.map(o => <option key={o.id} value={o.id}>{ o.text }</option>)}
  </select>
);

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  selected: '',
};

export default Dropdown;
