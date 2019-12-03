import axios from "axios";
import * as actionType from "././eventsType";

export const increaseEventCapacity = evtIndex => ({
  type: actionType.INCREASE_EVENT_CAPCITY,
  evtIndex
});

export const decreaseEventCapacity = evtIndex => ({
  type: actionType.DECREASE_EVENT_CAPCITY,
  evtIndex
});
export const updateEvents = list => ({
  type: actionType.UPDATE_EVENTS,
  list
});

export const getEvents = location => (dispatch, getState) => {
  if (getState().events.list.length === 0) {
    axios
      .get("https://next.json-generator.com/api/json/get/Vk7OTypQ8")
      .then(({ data }) => {
        const ids = location.state ? location.state.id : null;

        const updatedData = data.map(d => {
          d["fullname"] = `${d.organizer.first} ${d.organizer.last}`;
          if (ids) {
            d.isHighlight = ids.indexOf(d._id) > -1;
          }
          return d;
        });

        dispatch(updateEvents(updatedData));
      });
  }
};
