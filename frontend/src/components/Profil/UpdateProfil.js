import React from 'react';
import { useSelector } from 'react-redux';
import UploadImg from './UploadImg';

const UpdateProfil = () => {

    const userData = useSelector((state) => state.userReducer);

    return (
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col border d-flex align-items-center justify-content-center m-3 p-3">
            <h1 className="fs-2">Profil de {userData.pseudo}</h1>
          </div>
        </div>


        <div className="row mt-3">
          <div className="col-sm-4 m-auto border">
              <h2 className='fs-4 pt-3'>Photo de profil</h2>
          <img src={userData.avatar} alt="avatar utilisateur" className="img-fluid" />
          <UploadImg />
          </div>

          
          <div className="col-sm-4 m-auto border">Bio</div>
        </div>
      </div>
    );
};

export default UpdateProfil;