/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import configureStore from './configureStore';
import Quote from './Quote';
import * as QuoteModule from './module';

jest.mock('./module');

describe('Quote', () => {
  let store;

  beforeEach(() => {
    QuoteModule.quoteReducer.mockImplementation(() => ({}));
    QuoteModule.getQuote.mockImplementation(() => ({ loading: false }));
    store = configureStore({});
  });

  // Test that the state is passed to the component
  it('displays a loading text', () => {
    QuoteModule.getQuote.mockImplementation(() => ({
      loading: true,
    }));

    const wrapper = mount(<Quote store={store} />);

    expect(QuoteModule.getQuote.mock.calls.length).toBe(1);
    expect(wrapper.find('.t-quote').text()).toBe('Loading');
  });

  it('displays a quote', () => {
    QuoteModule.getQuote.mockImplementation(() => ({
      quote: 'foo',
      author: 'baz',
      loading: false,
    }));

    const wrapper = mount(<Quote store={store} />);

    expect(QuoteModule.getQuote.mock.calls.length).toBe(1);
    expect(wrapper.find('.t-quote').text()).toBe('foo, baz');
  });

  // Test that the action creator is connected to the component
  it('calls fetchQuote when the "Get Quote" button is clicked', () => {
    const testFetchAction = { type: 'TEST_FETCH' };
    QuoteModule.fetchQuote.mockImplementation(() => testFetchAction);
    store.dispatch = jest.fn();

    const wrapper = mount(<Quote store={store} />);
    wrapper.find('.t-fetch-quote').simulate('click');

    expect(QuoteModule.fetchQuote.mock.calls.length).toBe(1);
    expect(QuoteModule.fetchQuote).toBeCalledWith();
    expect(store.dispatch).toBeCalledWith(testFetchAction);
  });

  describe('journey with snapshot', () => {
    it('renders a quote', () => {
      QuoteModule.getQuote
      .mockImplementationOnce(() => ({
        loading: false,
      }))
      .mockImplementationOnce(() => ({
        loading: true,
      }))
      .mockImplementationOnce(() => ({
        quote: 'foo',
        author: 'baz',
        loading: false,
      }));
      QuoteModule.fetchQuote.mockImplementation(() => ({ type: 'TEST_JOURNEY' }));

      const wrapper = mount(<Quote store={store} />);
      expect(wrapper.find('Quote')).toMatchSnapshot();

      wrapper.find('.t-fetch-quote').simulate('click');
      expect(wrapper.find('Quote')).toMatchSnapshot();

      wrapper.find('.t-fetch-quote').simulate('click');
      expect(wrapper.find('Quote')).toMatchSnapshot();

      expect(QuoteModule.fetchQuote).toHaveBeenCalledTimes(2);
    });
  });
});
