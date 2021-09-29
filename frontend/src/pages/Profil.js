
import React, { useContext } from 'react';
import Header from '../components/Header';
import Login from '../components/Login/Index.js'
import { UidContext } from '../components/AppContext';


const Profil = () => {
  const uid = useContext(UidContext);


    return (
      <>
        <Header />
        {uid ? (
          <div className="row">
            <div className="col">
              <h1 className='mt-5 pt-5'>Update Page</h1>
            </div>
            <div className="col d-flex  pt-4">
              <img
                className="mt-5 ms-5 pt-5 w-50"
                src="./img/icon-left-font.png"
                alt="Logo"
              />
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col">
              <Login signin={false} signup={true} />
            </div>
            <div className="col d-flex  pt-4">
              <img
                className="mt-5 ms-5 pt-5 w-50"
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