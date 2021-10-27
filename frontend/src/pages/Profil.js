
import React, { useContext } from 'react';
import Login from '../components/Login/Index.js'
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';


const Profil = () => {
  const uid = useContext(UidContext);


    return (
      <>
        {uid ? (
          <UpdateProfil />
        ) : (
          <div className="container mt-5 pt-5">
            <h1 className="text-center d-none">Login</h1>
            <div className="row">
              <div className="col">
                <Login signin={false} signup={true} />
              </div>

              <img
                className="img-fluid col w-50 ps-5"
                src="./img/icon-left-font-monochrome-black.png"
                alt="Logo-groupomania"
              />
            </div>
          </div>
        )}
      </>
    );
};

export default Profil;