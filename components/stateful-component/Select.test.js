/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import Select from './Select';

describe('Select', () => {
  const defaultProps = {
    options: [
      { id: '8', text: 'Conte' },
      { id: '10', text: 'Del Piero' },
      { id: '1', text: 'Buffon' },
    ],
    onSubmit: () => { },
  };

  describe('element testing', () => {
    it('renders the passed in options', () => {
      const options = [
        { id: '10', text: 'Del Piero' },
        { id: '21', text: 'Dybala' },
      ];

      const wrapper = shallow(
        <Select
          {...defaultProps}
          options={options}
        />);

      const optionTags = wrapper.find('.t-option');
      expect(optionTags.length).toBe(2);
      expect(optionTags.at(0).text()).toBe(options[0].text);
      expect(optionTags.at(1).text()).toBe(options[1].text);
      expect(wrapper.find('.t-selected-options').text()).toBe('');
    });

    it('renders the selected option', () => {
      const wrapper = shallow(
        <Select
          {...defaultProps}
          selected={['10']}
        />);

      expect(wrapper.find('.t-selected-options').text()).toBe('Del Piero');

      wrapper.find('.t-select').simulate('change', { target: { value: '1' } });
      expect(wrapper.find('.t-selected-options').text()).toBe('Del Piero, Buffon');
    });

    describe('DONTS', () => {
      it('displays the selected items by changing state', () => {
        const wrapper = shallow(
          <Select
            {...defaultProps}
            selected={['10']}
          />);

        expect(wrapper.find('.t-selected-options').text()).toBe('Del Piero');

        wrapper.setState({ selected: ['1', '10'] });
        expect(wrapper.find('.t-selected-options').text()).toBe('Buffon, Del Piero');
      });
    });
  });

  describe('snapshot testing', () => {
    it('user can select options', () => {
      const onSubmit = jest.fn();
      const options = [
        { id: '8', text: 'Conte' },
        { id: '10', text: 'Del Piero' },
        { id: '1', text: 'Buffon' },
        { id: '21', text: 'Pirlo' },
      ];

      const wrapper = shallow(
        <Select
          {...defaultProps}
          options={options}
          selected={['1', '21']}
          onSubmit={onSubmit}
        />);

      expect(wrapper).toMatchSnapshot();

      wrapper.find('.t-select').simulate('change', { target: { value: '10' } });
      expect(wrapper).toMatchSnapshot();

      wrapper.find('.t-submit').simulate('click');

      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit).toBeCalledWith(['1', '21', '10']);

      wrapper.find('.t-reset').simulate('click');
      expect(wrapper).toMatchSnapshot();
    });
  });


  describe('interactions', () => {
    it('clears the selection when clicking on reset', () => {
      const wrapper = shallow(
        <Select
          {...defaultProps}
          selected={['10']}
        />);

      wrapper.find('.t-reset').simulate('click');

      expect(wrapper.find('.t-selected-options').text()).toBe('');
    });

    it('returns the new selection on submit', () => {
      const onSubmit = jest.fn();
      const wrapper = shallow(
        <Select
          {...defaultProps}
          selected={['10']}
          onSubmit={onSubmit}
        />);

      wrapper.find('.t-submit').simulate('click');

      expect(onSubmit.mock.calls.length).toBe(1);
      expect(onSubmit).toBeCalledWith(['10']);
    });
  });
});
