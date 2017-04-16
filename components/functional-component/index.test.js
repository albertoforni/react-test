/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Dropdown from './index';

// TODO fail on prop types

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

      const component = shallow(
        <Dropdown
          {...defaultProps}
          options={options}
        />);

      const optionTags = component.find('option');
      expect(optionTags.length).toBe(2);
      expect(optionTags.at(0).text()).toEqual(options[0].text);
      expect(optionTags.at(1).text()).toEqual(options[1].text);
    });

    it('displays the text for the selected value', () => {
      const component = shallow(
        <Dropdown
          {...defaultProps}
          selected="1"
        />);

      expect(component.find('select').prop('value')).toEqual('1');
    });

    it('calls onChange with the new value', () => {
      const onChange = jest.fn();

      const component = shallow(
        <Dropdown
          {...defaultProps}
          onChange={onChange}
        />);
      component.find('select').simulate('change', { target: { value: '123' } });

      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange).toBeCalledWith('123');
    });
  });

  describe('snapshot testing', () => {
    it('renders a list of options', () => {
      const options = [
        { id: '10', text: 'Del Piero' },
        { id: '21', text: 'Dybala' },
      ];

      const tree = renderer.create(
        <Dropdown
          {...defaultProps}
          options={options}
        />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
