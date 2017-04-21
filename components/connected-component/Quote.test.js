/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import Quote from './Quote';
import * as QuoteModule from './module';

describe('Quote', () => {
  let store;
  beforeEach(() => {
    store = configureMockStore([])({});
  });

  // Test that the state is passed to the component
  it('gets values from the store', () => {
    QuoteModule.getQuote = jest.fn().mockReturnValue({ loading: false });
    const storeState = 'a test state';
    store.getState = jest.fn().mockReturnValue(storeState);

    shallow(<Quote store={store} />);

    expect(QuoteModule.getQuote).toBeCalledWith(storeState);
  });

  it('displays a loading text', () => {
    QuoteModule.getQuote = jest.fn().mockReturnValue({
      loading: true,
    });

    const wrapper = shallow(<Quote store={store} />).shallow();

    expect(wrapper.find('.t-quote').text()).toBe('Loading');
  });

  it('displays a quote', () => {
    QuoteModule.getQuote = jest.fn().mockReturnValue({
      quote: 'TDD is dead',
      author: 'DHH',
      loading: false,
    });

    const wrapper = shallow(<Quote store={store} />).shallow();

    expect(wrapper.find('.t-quote').text()).toBe('TDD is dead, DHH');
  });

  // Test that the action creator is connected to the component
  it('calls fetchQuote when the "Get Quote" button is clicked', () => {
    const testFetchAction = { type: 'TEST_FETCH' };
    QuoteModule.fetchQuote = jest.fn().mockReturnValue(testFetchAction);

    const wrapper = shallow(<Quote store={store} />).shallow();

    wrapper.find('.t-fetch-quote').simulate('click');
    expect(QuoteModule.fetchQuote).toHaveBeenCalledTimes(1);
    expect(QuoteModule.fetchQuote).toBeCalledWith();
    expect(store.getActions()).toEqual([testFetchAction]);
  });
});
