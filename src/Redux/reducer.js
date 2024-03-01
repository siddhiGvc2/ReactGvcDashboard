import { SAVE } from "./actionType";

const initstate = {
  data: []
};

const reducer = (state = initstate, { type, payload }) => {
  if (type === SAVE) {
    // Assuming payload is a Promise
    return {
      ...state,
      data: payload
    };
  }

  // You need to return the state if the action type is not handled
  return state;
};

export { reducer };

