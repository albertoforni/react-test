import React from 'react';
import Dropdown from '../components/stateful-component';

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
      <div>
        <Dropdown
          options={this.state.options}
          onSubmit={() => {}}
        />
      </div>
    );
  }
}

export default Values;
