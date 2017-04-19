/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import Quote from './Quote';
import configureStore from './configureStore';
import * as QuoteModule from './module';

describe('Quote', () => {
  let store;

  beforeEach(() => {
    store = configureStore({});
  });

  // TEST that the state is passed to the component
  it('displays a loading text', () => {
    QuoteModule.getQuote = jest.fn().mockReturnValue({
      loading: true,
    });

    const wrapper = mount(<Quote store={store} />);

    expect(QuoteModule.getQuote.mock.calls.length).toEqual(1);
    expect(wrapper.find('.t-quote').text()).toEqual('Loading');
  });

  it('displays a quote', () => {
    QuoteModule.getQuote = jest.fn().mockReturnValue({
      quote: 'TDD is dead',
      author: 'DHH',
      loading: false,
    });

    const wrapper = mount(<Quote store={store} />);

    expect(QuoteModule.getQuote.mock.calls.length).toEqual(1);
    expect(wrapper.find('.t-quote').text()).toEqual('TDD is dead, DHH');
  });

  // Test that the action creator is connected to the component
  it('calls fetchQuote when the "Get Quote" button is clicked', () => {
    QuoteModule.fetchQuote = jest.fn().mockReturnValue({ type: 'TEST' });

    const wrapper = mount(<Quote store={store} />);

    wrapper.find('.t-fetch-quote').simulate('click');
    expect(QuoteModule.fetchQuote.mock.calls.length).toEqual(1);
    expect(QuoteModule.fetchQuote).toBeCalledWith();
  });
});
