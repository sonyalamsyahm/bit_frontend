import {
  GET_TODOLIST_FULLFILLED,
  GET_TODOLIST_PENDING,
  GET_TODOLIST_REJECTED,
} from '../config/constans';

export const todosFetchDataPending = set => {
  return {
    type: GET_TODOLIST_PENDING,
    payload: set,
  };
};

export const todosFetchDataFullfilled = data => {
  // console.log(JSON.stringify(data, null, 2));
  return {
    type: GET_TODOLIST_FULLFILLED,
    payload: data,
    isLoading: false,
  };
};

export const todosFetchDataRejected = error => {
  return {
    type: GET_TODOLIST_REJECTED,
    payload: error,
    isLoading: false,
  };
};
