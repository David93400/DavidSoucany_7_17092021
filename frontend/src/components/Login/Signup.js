import axios from 'axios';
import { Formik } from 'formik';
import Swal from 'sweetalert2';


const initialValues = {
  pseudo:'',
  email: '',
  password: '',
  controlPassword:''
};

const validate = (values) => {

  let errors = {};
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;

  if (!values.pseudo) {
    errors.pseudo = 'Un pseudo est requis';
  } else if (values.pseudo.length < 4) {
    errors.pseudo = 'Votre pseudo doit faire au minimum 4 caractères';
  }

  if (!values.email) {
    errors.email = 'Une Adresse Email est requise';
  } else if (!regexMail.test(values.email)) {
    errors.email = 'Adresse Email invalide';
  }

  if (!values.password) {
    errors.password = 'Un mot de passe est requis';
  } else if (!regexPassword.test(values.password)) {
    errors.password =
      'Le mot de passe doit faire minimum 8 caractères, contenir une min, une maj, un chiffre et au moins un de ces caractères spéciaux: $ @ % * + - _ !';
  }

  if (values.password !== values.controlPassword) {
    errors.controlPassword = 'Le mot de passe ne correspond pas';
  } 

  return errors;
};

const submitForm = (values) => {

  axios.post(`${process.env.REACT_APP_API_URL}auth/signup`, {
          pseudo: values.pseudo,
          email: values.email,
          password: values.password
        })
        
        .then((res) => {

          Swal.fire({
            icon: 'success',
            text: res.data.message,
            showConfirmButton: false,
          });
    
          window.setTimeout(function () {
            window.location.href = '/profil';
          }, 2000);
          
        })
        .catch ((err) =>{
          console.log(err.response.data.message);
          Swal.fire({
            icon: 'error',
            text: err.response.data.message,
            confirmButtonColor: 'red'
          });
        })
};


const Signup = () => {

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty
        } = formik;

      return (
        <form action="" onSubmit={handleSubmit} className="ms-4 col">
          <div className="form-group m-4">
            <label htmlFor="pseudo" className="mb-1">
              Pseudo
            </label>
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              value={values.pseudo}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.pseudo && touched.pseudo
                  ? 'border-danger form-control'
                  : 'form-control'
              }
              placeholder="Pseudo"
            />
            {errors.pseudo && touched.pseudo && (
              <span className="error text-danger">{errors.pseudo}</span>
            )}
          </div>

          <div className="form-group m-4">
            <label htmlFor="email" className="mb-1">
              Adresse Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email
                  ? 'border-danger form-control'
                  : 'form-control'
              }
              placeholder="Votre Email"
            />
            {errors.email && touched.email && (
              <span className="error text-danger">{errors.email}</span>
            )}
          </div>

          <div className="form-group m-4">
            <label htmlFor="password" className="mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password
                  ? 'border-danger form-control'
                  : 'form-control'
              }
              placeholder="Mot de passe"
            />
            {errors.password && touched.password && (
              <span className="error text-danger">{errors.password}</span>
            )}
          </div>

          <div className="form-group m-4">
            <label htmlFor="controlPassword" className="mb-1">
              Confirmer mot de passe
            </label>
            <input
              type="password"
              name="controlPassword"
              id="controlPassword"
              className={
                errors.controlPassword && touched.controlPassword
                  ? 'border-danger form-control'
                  : 'form-control'
              }
              placeholder="Vérifier votre Mot de passe"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.controlPassword}
            />
            {errors.controlPassword && touched.controlPassword && (
              <span className="error text-danger">
                {errors.controlPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={
              !(dirty && isValid)
                ? 'btn-danger btn ms-4 mb-4'
                : 'btn-success btn ms-4 mb-4'
            }
            disabled={!(dirty && isValid)}
          >
            S'inscrire
          </button>
        </form>
      );
    }
  }
  </Formik>
  );
};

  export default Signup;