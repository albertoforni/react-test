import React from 'react';

import Select from '../components/stateful-component/Select';
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
    };
  }

  render() {
    return (
      <Layout>
        <Select
          options={this.state.options}
          onSubmit={() => {}}
        />
      </Layout>
    );
  }
}

export default Values;
