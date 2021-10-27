import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Signin from './Signin';
import Signup from './Signup';
import "./Index.css"

const Index = ( props ) => {

    const [signupModal, setSignupModal] = useState(props.signup);
    const [signinModal, setSigninModal] = useState(props.signin);


    const handleModals = (e) => {
        if(e.target.id === 'register') {
            setSigninModal(false);
            setSignupModal(true);
        } else if (e.target.id === 'login') {
            setSignupModal(false);
            setSigninModal(true);
        }
    }

    return (
      <>
        <div className="container col-11 bg-groupomania">
          <div className="d-flex justify-content-center mt-5 pt-3">
            <Button
              outline
              color="black"
              onClick={handleModals}
              className="m-3 bg-light"
              id="register"
            >
              S'inscrire
            </Button>
            <Button
              outline
              color="black"
              onClick={handleModals}
              className="m-3 bg-light"
              id="login"
            >
              Se connecter
            </Button>
          </div>
          {signupModal && <Signup />}
          {signinModal && <Signin />}
        </div>
      </>
    );
};

export default Index;