/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import Dropdown from './Dropdown';

describe('Dropdown', () => {
  const defaultProps = {
    options: [
      { id: '8', text: 'Conte' },
      { id: '10', text: 'Del Piero' },
      { id: '1', text: 'Buffon' },
    ],
    selected: '10',
    onChange: () => { },
  };

  describe('element testing', () => {
    it('renders a list of options', () => {
      const options = [
        { id: '10', text: 'Del Piero' },
        { id: '21', text: 'Dybala' },
      ];

      const wrapper = shallow(
        <Dropdown
          {...defaultProps}
          options={options}
        />);

      const optionTags = wrapper.find('.t-option');
      expect(optionTags.length).toBe(2);
      expect(optionTags.at(0).text()).toBe(options[0].text);
      expect(optionTags.at(1).text()).toBe(options[1].text);
    });

    it('displays the text for the selected value', () => {
      const wrapper = shallow(
        <Dropdown
          {...defaultProps}
          selected="1"
        />);

      expect(wrapper.find('.t-select').prop('value')).toBe('1');
    });
  });

  it('calls onChange with the new value', () => {
    const onChange = jest.fn();

    const wrapper = shallow(
      <Dropdown
        {...defaultProps}
        onChange={onChange}
      />);
    wrapper.find('.t-select').simulate('change', { target: { value: '123' } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange).toBeCalledWith('123');
  });

  describe('snapshot testing', () => {
    it('renders a list of options and a value', () => {
      const options = [
        { id: '10', text: 'Del Piero' },
        { id: '21', text: 'Dybala' },
      ];

      const wrapper = shallow(
        <Dropdown
          {...defaultProps}
          options={options}
          selected="21"
        />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
