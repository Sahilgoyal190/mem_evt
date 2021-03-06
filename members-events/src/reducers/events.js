import * as actionTypes from "../actions/eventsType";

const initialState = {
  list: []
};

const ADD = "add";
const SUB = "sub";

export const events = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_EVENTS:
      return { ...state, list: action.list };
    case actionTypes.INCREASE_EVENT_CAPCITY:
      return manageCapcity(state, action.evtIndex, ADD);
    case actionTypes.DECREASE_EVENT_CAPCITY:
      return manageCapcity(state, action.evtIndex, SUB);
    default:
      return state;
  }
};

function manageCapcity(state, evtId, operation) {
  return {
    ...state,
    list: state.list.map(l => {
      if (l._id === evtId) {
        l.capacity = operation === ADD ? l.capacity + 1 : l.capacity - 1;
      }
      return l;
    })
  };
}
