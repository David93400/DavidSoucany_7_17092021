import {combineReducers} from 'redux';
import userReducer from './user.reducer';
import postReducer from './post.reducer';
import usersReducer from './users.reducer';
import commentsReducer from './comments.reducer';

export default combineReducers({
  userReducer,
  postReducer,
  usersReducer,
  commentsReducer,
});


