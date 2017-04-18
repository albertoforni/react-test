/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Counter from './Counter';
import configureStore from './configureStore';
import * as CounterModule from './module';

describe('Counter', () => {
  let store;

  beforeEach(() => {
    store = configureStore({});
  });

  // TEST that the state is passed to the component
  it('displays counter', () => {
    CounterModule.getCounterValue = jest.fn().mockReturnValue(10);

    const wrapper = mount(
      <Provider store={store}>
        <Counter />
      </Provider>);

    expect(CounterModule.getCounterValue.mock.calls.length).toEqual(1);
    expect(wrapper.find('h2').text()).toEqual('Counter: 10');
  });

  // Test that the action creator is connected to the component
  it('dispatches increment when + is clicked', () => {
    CounterModule.increment = jest.fn().mockReturnValue({ type: 'TEST' });

    const wrapper = mount(
      <Provider store={store}>
        <Counter />
      </Provider>);

    wrapper.find('.t-increment').simulate('click');
    expect(CounterModule.increment.mock.calls.length).toEqual(1);
    expect(CounterModule.increment).toBeCalledWith();
  });

  it('dispatches decrement when - is clicked', () => {
    CounterModule.decrement = jest.fn().mockReturnValue({ type: 'TEST' });

    const wrapper = mount(
      <Provider store={store}>
        <Counter />
      </Provider>);

    wrapper.find('.t-decrement').simulate('click');
    expect(CounterModule.decrement.mock.calls.length).toEqual(1);
    expect(CounterModule.decrement).toBeCalledWith();
  });
});
