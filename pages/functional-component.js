import React from 'react';
import Dropdown from '../components/functional-component/index';

const capitains = [
  { id: 8, text: 'Conte' },
  { id: 10, text: 'Del Piero' },
  { id: 1, text: 'Buffon' },
];

export default () => (
  <Dropdown
    options={capitains}
    selected={10}
  />
);
