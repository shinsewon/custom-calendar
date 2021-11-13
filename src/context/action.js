export const GET_EVENTS = "GET_EVENTS";
export const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS";
export const GET_EVENTS_FAIL = "GET_EVENTS_FAIL";

export const ADD_NEW_EVENT = "ADD_NEW_EVENT";
export const ADD_EVENT_FAIL = "ADD_EVENT_FAIL";

export const UPDATE_EVENT = "UPDATE_EVENT";
export const UPDATE_EVENT_FAIL = "UPDATE_EVENT_FAIL";

export const DELETE_EVENT = "DELETE_EVENT";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_FAIL = "DELETE_EVENT_FAIL";

export const getEvents = () => ({
  type: GET_EVENTS,
});

export const addNewEvent = (event) => ({
  type: ADD_NEW_EVENT,
  payload: event,
});

export const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  payload: event,
});

export const deleteEvent = (event) => ({
  type: DELETE_EVENT,
  payload: event,
});

export const deleteEventSuccess = (event) => ({
  type: DELETE_EVENT_SUCCESS,
  payload: event,
});
