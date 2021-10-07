import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    

    const handleSignin = (e) => {

        e.preventDefault();
        
        axios
          .post(
            `${process.env.REACT_APP_API_URL}auth/login`,
            { email, password },
            { withCredentials: true }
          )

          .then((res) => {
            window.location = '/';
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              text: 'Email ou Mot de passe incorect',
              confirmButtonColor: 'red',
            });
            console.log(err);
          });   
    }


    return (
      <form onSubmit={handleSignin} id="sign-in-form" className="ms-4 col">
        <div className="form-group m-4">
          <label htmlFor="email">Adresse Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Votre email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
        </div>

        <div className="form-group m-4">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            placeholder="Entrer votre mot de passe"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
        </div>
        <button type="submit" className="btn btn-secondary btn-block mx-4">
          Se connecter
        </button>
      </form>
    );
};

export default Signin;
