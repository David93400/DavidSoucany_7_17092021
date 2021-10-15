
import { useSelector } from 'react-redux';
import cookie from 'js-cookie';
import axios from 'axios';

const DeleteProfil = () => {
  
  const userData = useSelector((state) => state.userReducer);


  const removeCookie = (key) => {
    if (window !== undefined) {
      cookie.remove(key, { expires: 1 });
    }
  };

  const deleteUser = async () => {
    const id = userData.id;

    await axios
      .delete(`${process.env.REACT_APP_API_URL}users/${id}`)
      .then(() => removeCookie('jwt')).then(()=> window.location='/')
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="d-flex justify-content-center pt-5">
        <button
          className="btn btn-secondary mb-3 mt-4 mt-5"
          onClick={() => {
            if (window.confirm('Voulez-vous vraiment supprimer le profil ?')) {
              deleteUser();
            }
          }}
        >
          Supprimer le profil
        </button>
      </div>
    </>
  );
};

export default DeleteProfil;
