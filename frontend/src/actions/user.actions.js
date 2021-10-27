import axios from 'axios';

export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPDATE_BIO = 'UPDATE_BIO';
export const DELETE_PROFIL = 'DELETE_PROFIL';

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}users/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  // for (var value of data.values()) {
  //   console.log(value);
  // }
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}users/${id}`,
      data: data,
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}users/${id}`)
          .then((res) => {
            console.log(res);
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.avatar });
          });
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (id, bio, userId, isAdmin) => {
  
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}users/` + id,
      data: { bio, userId, isAdmin },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};
