import React from 'react';

import Dropdown from '../components/functional-component/Dropdown';
import Layout from '../components/Layout';

class Values extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        { id: '8', text: 'Conte' },
        { id: '10', text: 'Del Piero' },
        { id: '1', text: 'Buffon' },
      ],
      selected: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({
      selected: value,
    });
  }

  render() {
    return (
      <Layout>
        <Dropdown
          options={this.state.options}
          selected={this.state.selected}
          onChange={this.onChange}
        />
      </Layout>
    );
  }
}

export default Values;
