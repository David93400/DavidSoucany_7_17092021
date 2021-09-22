
import React from 'react';
import Login from '../components/Login'


const Profil = () => {
    return (
      <div className="profil-page">
        <div className="login-container">
          <Login />
          <div className="img-container">
            <img
              src="./img/icon-left-font-monochrome-black.png"
              alt="logo groupomania"
            />
          </div>
        </div>
      </div>
    );
};

export default Profil;