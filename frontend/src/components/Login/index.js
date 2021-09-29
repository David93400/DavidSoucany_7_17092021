import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Signin from './Signin';
import Signup from './Signup';

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
        <ul className="mt-5 ms-5 pt-5 ps-5 col">
          <Button
            outline
            color="secondary"
            onClick={handleModals}
            className="m-5"
            id="register"
          >
            S'inscrire
          </Button>
          <Button
            outline
            color="secondary"
            onClick={handleModals}
            className="m-5"
            id="login"
          >
            Se connecter
          </Button>
        </ul>
        {signupModal && <Signup />}
        {signinModal && <Signin />}
      </>
    );
};

export default Index;