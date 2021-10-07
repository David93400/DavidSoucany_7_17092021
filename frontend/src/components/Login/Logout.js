import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

const Logout = () => {

    const removeCookie = (key) => {
        if (window !== undefined){
            cookie.remove(key, {expires: 1});
        }
    }
       const logout = async () => {
            await axios
            .get(
                `${process.env.REACT_APP_API_URL}auth/logout`,
                {withCredentials: true,}
            )
        .then(() => removeCookie('jwt'))
        .catch((err) => console.log(err))

    }

    return (
      
        <img
          src="./img/logout.png"
          alt="logout"
          style={{ width: 40 }}
          onClick={logout}
        />
      
    );
};

export default Logout;
