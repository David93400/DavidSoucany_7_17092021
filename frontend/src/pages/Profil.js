
import React, { useContext } from 'react';
import Header from '../components/Header';
import Login from '../components/Login/Index.js'
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';


const Profil = () => {
  const uid = useContext(UidContext);


    return (
      <>
        <Header />
        {uid ? (
          <UpdateProfil/>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col">
                <Login signin={false} signup={true} />
              </div>
              {/* <div className="col-sm-auto d-flex  pt-4"> */}
              <img
                className="mt-5 ms-5 pt-5 w-50 img-fluid"
                src="./img/icon-left-font.png"
                alt="Logo"
              />
              {/* </div> */}
            </div>
          </div>
        )}
      </>
    );
};

export default Profil;