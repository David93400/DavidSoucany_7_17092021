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
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}users/${id}`, data)
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

export const updateBio = (id, bio) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}users/` + id,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};
