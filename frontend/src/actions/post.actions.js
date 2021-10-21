import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

// Comments

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}posts/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}posts/`, data)
      .then(console.log)
      .catch(console.error);
  };
};

export const updatePost = (postId, content, title, userId, isAdmin) => {
  
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}posts/${postId}`,
      data: { content, title, userId, isAdmin },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { postId, content, title } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId, userId, isAdmin) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}posts/${postId}`,
      data: {userId, isAdmin},
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (data) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}comments/`,
      data,
    })
      .then(console.log)
      .catch(console.error);
  };
};

export const editComment = (commentId, comment, user, isAdmin) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}comments/${commentId}`,
      data: { comment, user, isAdmin },
      withCredentials: true,
    })
      .then(console.log)
      .catch(console.error);
  };
};

export const deleteComment = (commentId, user, isAdmin) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}comments/${commentId}`,
      data:{user, isAdmin},
      withCredentials: true,
    })
      .then(console.log)
      .catch(console.error);
  };
};
