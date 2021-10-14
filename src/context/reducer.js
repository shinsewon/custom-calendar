import moment from "moment";
import {
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAIL,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  ADD_NEW_EVENT,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
} from "./action";

const dateFormat = "YYYY/MM/DD";

const initialState = {
  events: [
    {
      id: 1,
      title: "Long Event",
      className: "bg-warning text-white",
      start: "2021-10-08T09:00:00.000Z",
      end: "2021-10-12T12:00:00.000Z",
      rangePiker: [
        moment("2021/10/01", dateFormat),
        moment("2021/10/10", dateFormat),
      ],
    },
    {
      id: 2,
      title: "Short Event",
      className: "bg-info text-white",
      start: "2021-10-11T09:00:00.000Z",
      end: "2021-10-11T12:00:00.000Z",
      rangePiker: [
        moment("2021/10/11", dateFormat),
        moment("2021/10/11", dateFormat),
      ],
    },
    {
      id: 3,
      title: "Meeting",
      className: "bg-success text-white",
      start: "2021-10-14T02:30:00.000Z",
      end: "2021-10-14T03:30:00.000Z",
      rangePiker: [
        moment("2021/10/14", dateFormat),
        moment("2021/10/14", dateFormat),
      ],
    },
    {
      id: 4,
      title: "Lunch",
      className: "bg-danger text-white",
      start: "2021-10-14T03:00:00.000Z",
      end: "2021-10-14T05:00:00.000Z",
      rangePiker: [
        moment("2021/10/14", dateFormat),
        moment("2021/10/14", dateFormat),
      ],
    },
    {
      id: 5,
      title: "Dinner",
      className: "bg-danger text-white",
      start: "2021-10-16T18:00:00.000Z",
      end: "2021-10-16T21:00:00.000Z",
      rangePiker: [
        moment("2021/10/16", dateFormat),
        moment("2021/10/16", dateFormat),
      ],
    },
  ],
  categories: [],
  error: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
      };

    case GET_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_NEW_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    // case ADD_EVENT_SUCCESS:
    //   return {
    //     ...state,
    //     events: [...state.events, action.payload],
    //   };
    case ADD_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id.toString() === action.payload.id.toString()
            ? { event, ...action.payload }
            : event
        ),
      };

    // case UPDATE_EVENT_SUCCESS:
    //   console.log("state.events>>>", state.events);
    //   return {
    //     ...state,
    //     events: state.events.map((event) =>
    //       event.id.toString() === action.payload.id.toString()
    //         ? { event, ...action.payload }
    //         : event
    //     ),
    //   };

    case UPDATE_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id.toString() !== action.payload.id.toString()
        ),
      };

    case DELETE_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { reducer, initialState };
