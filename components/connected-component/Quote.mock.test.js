/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import Quote from './Quote';
import * as QuoteModule from './module';

jest.mock('./module');

describe('Quote', () => {
  let store;

  beforeEach(() => {
    QuoteModule.getQuote.mockImplementation(() => ({ loading: false }));
    store = configureMockStore([])({});
  });

  // Test that the state is passed to the component
  it('gets values from the store', () => {
    const storeState = 'a test state';
    store.getState = jest.fn().mockReturnValue(storeState);

    shallow(<Quote store={store} />);

    expect(QuoteModule.getQuote).toBeCalledWith(storeState);
  });

  it('displays a loading text', () => {
    QuoteModule.getQuote.mockImplementation(() => ({
      loading: true,
    }));

    const wrapper = shallow(<Quote store={store} />).shallow();

    expect(wrapper.find('.t-quote').text()).toBe('Loading');
  });

  it('displays a quote', () => {
    QuoteModule.getQuote.mockImplementation(() => ({
      quote: 'foo',
      author: 'baz',
      loading: false,
    }));

    const wrapper = shallow(<Quote store={store} />).shallow();

    expect(wrapper.find('.t-quote').text()).toBe('foo, baz');
  });

  // Test that the action creator is connected to the component
  it('calls fetchQuote when the "Get Quote" button is clicked', () => {
    const testFetchAction = { type: 'TEST_FETCH' };
    QuoteModule.fetchQuote.mockImplementation(() => testFetchAction);

    const wrapper = shallow(<Quote store={store} />).shallow();
    wrapper.find('.t-fetch-quote').simulate('click');

    expect(QuoteModule.fetchQuote).toHaveBeenCalledTimes(1);
    expect(QuoteModule.fetchQuote).toBeCalledWith();
    expect(store.getActions()).toEqual([testFetchAction]);
  });

  describe('journey with snapshot', () => {
    it('loads and renders a quote', () => {
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

      const wrapper = shallow(<Quote store={store} />).shallow();
      expect(wrapper.children()).toMatchSnapshot();

      wrapper.find('.t-fetch-quote').simulate('click');
      expect(wrapper.children()).toMatchSnapshot();
      expect(wrapper.children()).toMatchSnapshot();

      expect(QuoteModule.fetchQuote).toHaveBeenCalledTimes(1);
    });
  });
});
