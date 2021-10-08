import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Input, Label } from 'reactstrap';
import { updateBio } from '../../actions/user.actions';
import { dateParser } from '../Utils';
import UploadImg from './UploadImg';
import './UpdateProfil.css';

const UpdateProfil = () => {
  const [bio, setBio] = useState('');
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData.id, bio));
    setUpdateForm(false);
  }

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col d-flex align-items-center justify-content-center m-3 p-3">
          <h1 className="fs-2 display-1">Profil de {userData.pseudo}</h1>
        </div>
      </div>

      <div className="row mt-3 d-flex justify-content-around">
        <div className="col-sm-4 profil">
          <h2 className="fs-4 pt-3 pb-3 ps-2 display-1">Photo de profil</h2>
          <img src={userData.avatar} alt="user-pic" className="img-fluid" />
          <UploadImg />
        </div>

        <div className="col-sm-4 bio">
          <div className="row">
            <div className="col">
              <h2 className="fs-4 pt-3 pb-2 ps-2 mb-4 display-1">Bio</h2>
              {updateForm === false && (
                <>
                  <p
                    className="m-1 mb-4 text-bio p-2"
                    onClick={() => setUpdateForm(!updateForm)}
                  >
                    {userData.bio}
                  </p>
                  <button
                    className="btn btn-secondary btn-block mb-3 m-1"
                    onClick={() => setUpdateForm(!updateForm)}
                  >
                    Modifier bio
                  </button>
                </>
              )}
              {updateForm && (
                <>
                  <textarea
                    type="text"
                    defaultValue={userData.bio}
                    onChange={(e) => setBio(e.target.value)}
                    name="bio"
                    id="bio"
                    rows="5"
                    className="form-control text-bio"
                  ></textarea>

                  <button
                    className="btn btn-secondary btn-block mb-3 mt-4"
                    onClick={handleUpdate}
                  >
                    Enregistrer modifications
                  </button>
                </>
              )}
            </div>
            <h3 className="display-6 fs-5 d-flex justify-content-center mt-5">
              Membre depuis le {dateParser(userData.createdAt)}
            </h3>
            <img
              className="rounded mx-auto d-block w-75"
              src="./img/icon.png"
              alt="logo groupomania"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
