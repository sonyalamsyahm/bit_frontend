import {
  GET_TODOLIST_PENDING,
  GET_TODOLIST_FULLFILLED,
  GET_TODOLIST_REJECTED,
} from '../config/constans';

const initialState = {
  data: [],
  isLoading: true,
  error: null,
};

const todoList = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOLIST_PENDING:
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    case GET_TODOLIST_FULLFILLED:
      return {
        ...state,
        isLoading: action.isLoading,
        data: action.payload,
      };
    case GET_TODOLIST_REJECTED:
      return {
        ...state,
        isLoading: action.isLoading,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default todoList;
