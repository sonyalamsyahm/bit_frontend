import {
  todosFetchDataFullfilled,
  todosFetchDataPending,
  todosFetchDataRejected,
} from '../_actions/todoList';
import {
  GET_METHOD,
  PUT_METHOD,
  DELETE_METHOD,
  ADD_METHOD,
} from '../config/constans';

import {URL} from '../config/api';

const todos = (METHODS, params, id) => {
  return dispatch => {
    switch (METHODS) {
      case GET_METHOD:
        dispatch(todosFetchDataPending(true));
        URL.get(`todos`)
          .then(response => {
            dispatch(todosFetchDataFullfilled(response.data));
          })
          .catch(error => {
            // console.log('tesga masuk');
            dispatch(todosFetchDataRejected(error));
          });
        break;
      case PUT_METHOD:
        dispatch(todosFetchDataPending(true));
        URL.put(`todos/${id}`, {
          name: params.name,
          completed: params.setCompleted,
        })
          .then(response => {
            dispatch(todosFetchDataFullfilled(null));
          })
          .catch(error => {
            // console.log('tesga masuk');
            dispatch(todosFetchDataRejected(error));
          });
        break;
      case ADD_METHOD:
        dispatch(todosFetchDataPending(true));
        URL.post(`todos`, {
          name: params,
        })
          .then(response => {
            dispatch(todosFetchDataFullfilled(null));
          })
          .catch(error => {
            dispatch(todosFetchDataRejected(error));
          });
        break;
      case DELETE_METHOD:
        dispatch(todosFetchDataPending(true));
        URL.delete(`todos/${id}`)
          .then(response => {
            dispatch(todosFetchDataFullfilled(null));
          })
          .catch(error => {
            dispatch(todosFetchDataRejected(error));
          });
    }
  };
};

export default todos;
