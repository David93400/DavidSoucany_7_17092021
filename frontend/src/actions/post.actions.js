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
  // const config = {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  // };
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}posts/`, data)
      .then(console.log)
      .catch(console.error);
  };
};

export const updatePost = (postId, content, title) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}posts/${postId}`,
      data: { content, title },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { postId, content, title } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}posts/${postId}`,
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

export const editComment = (commentId, comment) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}comments/${commentId}`,
      data:{ comment },
    })
      .then(console.log)
      .catch(console.error);
  };
};

export const deleteComment = (commentId) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}comments/${commentId}`
    })
      .then(console.log)
      .catch(console.error);
  };
};
