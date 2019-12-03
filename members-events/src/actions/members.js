import axios from "axios";
import * as actionType from "./membersType";
import * as evtActions from "./events";

export const deleteMember = index => ({
  type: actionType.DELETE_MEMBER,
  index
});
export const sorting = (sortType, dir) => ({
  type: actionType.SORTING,
  sortType,
  dir
});

export const updateMember = list => ({
  type: actionType.UPDATE_MEMBER_LIST,
  list
});

export const addOrRemoveEventToMember = (memId, evtId) => (
  dispatch,
  getState
) => {
  const { list } = getState().members;
  let decEvent = true;
  const updatedList = list.map(l => {
    if (l._id === memId) {
      if (!l.events) {
        l.events = [evtId];
      } else {
        const isAvailable = l.events.indexOf(evtId);
        if (isAvailable > -1) {
          decEvent = false;
          l.events.splice(isAvailable, 1);
        } else {
          l.events.push(evtId);
        }
      }
    }

    return l;
  });
  dispatch(updateMember(updatedList));
  dispatch(
    decEvent
      ? evtActions.decreaseEventCapacity(evtId)
      : evtActions.increaseEventCapacity(evtId)
  );
};

export const getMembersList = () => (dispatch, getState) => {
  if (getState().members.list.length === 0) {
    axios
      .get("https://next.json-generator.com/api/json/get/NyNrlJTX8")
      .then(({ data }) => {
        const updatedData = data.map(d => {
          d["fullname"] = `${d.name.first} ${d.name.last}`;
          return d;
        });

        dispatch(updateMember(updatedData));
      });
  }
};
