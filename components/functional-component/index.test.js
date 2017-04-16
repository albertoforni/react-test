import React from 'react';
import { shallow } from 'enzyme';

import Dropdown from './index';

// TODO fail on prop types

describe('Dropdown', () => {
  const defaultProps = {
    options: [
      { id: 8, text: 'Conte' },
      { id: 10, text: 'Del Piero' },
      { id: 1, text: 'Buffon' },
    ],
    selected: 10,
    onChange: () => { },
  };

  it('renders a list of options', () => {
    const options = [
      { id: 10, text: 'Del Piero' },
      { id: 21, text: 'Dybala' },
    ];

    const component = shallow(
      <Dropdown
        {...defaultProps}
        options={options}
      />
    );

    expect(component.find('option').length).toBe(2);
    expect(component.find('option').first().text()).toEqual(options[0].text);
    expect(component.find('option').last().text()).toEqual(options[1].text);
  });

  it('displays the text for the selected value', () => {
    const component = shallow(
      <Dropdown
        {...defaultProps}
        selected={1}
      />
    );

    expect(component.find('select').prop('value')).toEqual(1);
  });

  it('calls onChange with the new value', () => {
    const options = [
      ...defaultProps,
      { id: 8, text: 'Marchisio' },
    ];
    const onChange = jest.fn();

    const component = shallow(
      <Dropdown
        {...defaultProps}
        onChange={onChange}
      />
    );
    component.find('select').simulate('change', { target: { value: 8 } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange).toBeCalledWith(8);
  });
});
