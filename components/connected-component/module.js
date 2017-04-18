
const INCREMENT = 'counter/INCREMENT';
export const increment = () => ({
  type: INCREMENT,
});

const DECREMENT = 'counter/DECREMENT';
export const decrement = () => ({
  type: DECREMENT,
});

export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export const getCounterValue = state => state.counter;
