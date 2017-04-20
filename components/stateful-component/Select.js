import React from 'react';
import PropTypes from 'prop-types';
import { find, compose, map, prop, join, reduce } from 'ramda';

const getSelectedTextByValues = (options, selected) => compose(
  join(', '),
  map(prop('text')),
  reduce((acc, id) => {
    const option = find(o => id === o.id, options);
    return option ? [...acc, option] : acc;
  }, []),
)(selected);

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
    };

    this.onChange = this.onChange.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      selected: [...this.state.selected, e.target.value],
    });
  }

  onReset() {
    this.setState({
      selected: [],
    });
  }

  onSubmit() {
    this.props.onSubmit(this.state.selected);
  }

  render() {
    const selectedOptions = getSelectedTextByValues(this.props.options, this.state.selected);
    return (
      <form>
        <div className="select-options t-selected-options">{selectedOptions}</div>
        <select className="select t-select" onChange={this.onChange}>
          {this.props.options.map(o =>
            <option className="t-option" key={o.id} value={o.id}>{o.text}</option>,
          )}
        </select>
        <div>
          <button type="reset" className="t-reset" onClick={this.onReset}>Clear</button>
          <button type="submit" className="t-submit" onClick={this.onSubmit}>Submit</button>
        </div>
      </form>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  selected: [],
};

export default Dropdown;
