export const GET_EVENTS = "GET_EVENTS";
export const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS";
export const GET_EVENTS_FAIL = "GET_EVENTS_FAIL";

export const ADD_NEW_EVENT = "ADD_NEW_EVENT";
export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";
export const ADD_EVENT_FAIL = "ADD_EVENT_FAIL";

export const UPDATE_EVENT = "UPDATE_EVENT";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAIL = "UPDATE_EVENT_FAIL";

export const DELETE_EVENT = "DELETE_EVENT";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_FAIL = "DELETE_EVENT_FAIL";

export const getEvents = () => ({
  type: GET_EVENTS,
});

export const getEventsSuccess = (events) => ({
  type: GET_EVENTS_SUCCESS,
  payload: events,
});

export const getEventsFail = (error) => ({
  type: GET_EVENTS_FAIL,
  payload: error,
});

export const addNewEvent = (event) => ({
  type: ADD_NEW_EVENT,
  payload: event,
});

export const addEventSuccess = (event) => ({
  type: ADD_EVENT_SUCCESS,
  payload: event,
});

export const addEventFail = (error) => ({
  type: ADD_EVENT_FAIL,
  payload: error,
});

export const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  payload: event,
});

export const updateEventSuccess = (event) => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: event,
});

export const updateEventFail = (error) => ({
  type: UPDATE_EVENT_FAIL,
  payload: error,
});

export const deleteEvent = (event) => ({
  type: DELETE_EVENT,
  payload: event,
});

export const deleteEventSuccess = (event) => ({
  type: DELETE_EVENT_SUCCESS,
  payload: event,
});

export const deleteEventFail = (error) => ({
  type: DELETE_EVENT_FAIL,
  payload: error,
});
