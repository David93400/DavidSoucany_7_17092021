import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const Signup = (props) => {

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {

      e.preventDefault();

      if (password !== controlPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Les Mots de passe ne correspondent pas',
        });
      } else {

        await axios.post(`${process.env.REACT_APP_API_URL}auth/signup`, {
          pseudo,
          email,
          password,
        })
        Swal.fire({
          title: 'Création de compte réussie',
          confirmButtonText: `SignIn`,
          confirmButtonColor: '#fd2d01',
        })
        .then((res) => {
          console.log(res);
          if (res.isConfirmed) {
            window.location = '/';
          }
        })
        .catch ((err => console.log(err.response.data)));
      }
}

    return (
      <form action="" onSubmit={handleRegister} className="ms-4 col">
        <div className="form-group m-4">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            name="pseudo"
            className="form-control"
            placeholder="Pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
        </div>

        <div className="form-group m-4">
          <label>Adresse Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Votre Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="form-group m-4">
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="form-group m-4">
          <label>Confirmer mot de passe</label>
          <input
            type="password"
            name="controlPassword"
            className="form-control"
            placeholder="Vérifier votre Mot de passe"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
        </div>

        <button type="submit" className="btn btn-secondary btn-block ms-4">
          S'inscrire
        </button>
      </form>
    );
};

export default Signup;