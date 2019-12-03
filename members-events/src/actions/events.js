import * as actionType from "././eventsType";

export const increaseEventCapacity = evtIndex => ({
  type: actionType.INCREASE_EVENT_CAPCITY,
  evtIndex
});

export const decreaseEventCapacity = evtIndex => ({
  type: actionType.DECREASE_EVENT_CAPCITY,
  evtIndex
});
