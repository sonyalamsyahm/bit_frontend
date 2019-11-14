import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import todoList from '../_reducers/todoList';

const rootReducers = combineReducers({
  todoList,
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
