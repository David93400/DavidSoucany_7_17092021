
import React, { useContext } from 'react';
import Login from '../components/Login/Index.js'
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';


const Profil = () => {
  const uid = useContext(UidContext);


    return (
      <>
        {uid ? (
          <UpdateProfil/>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col">
                <Login signin={false} signup={true} />
              </div>

              <img
                className="mt-5 ms-5 pt-5 w-50 img-fluid"
                src="./img/icon-left-font.png"
                alt="Logo"
              />

            </div>
          </div>
        )}
      </>
    );
};

export default Profil;