import * as actionTypes from "../actions/membersType";
import memData from "../mockData/mem.json";

const initialState = {
  list: memData
};

export const members = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MEM_LIST:
      return { ...state, list: action.data };
    case actionTypes.UPDATE_MEMBER_LIST:
      return { ...state, list: action.list };
    case actionTypes.SORTING:
      return sorting(state, action.dir, action.sortType);
    case actionTypes.DELETE_MEMBER:
      const list = [...state.list];
      list.splice(action.index, 1);
      return { ...state, list };
    default:
      return state;
  }
};

function sorting(state, dir, type) {
  const list = [...state.list];
  if (type === "age") {
    list.sort((a, b) => (dir === "asc" ? a.age - b.age : b.age - a.age));
  } else if (type === "name") {
    list.sort((a, b) =>
      dir === "asc"
        ? a.fullname > b.fullname
          ? 1
          : -1
        : b.fullname > a.fullname
        ? 1
        : -1
    );
  }
  return {
    ...state,
    list
  };
}
