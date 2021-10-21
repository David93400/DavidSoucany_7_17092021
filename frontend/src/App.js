import React, { useState, useEffect } from "react";
import Routes from "./components/Routes";
import 'bootstrap/dist/css/bootstrap.min.css'
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { getUser } from "./actions/user.actions";
import { useDispatch } from 'react-redux';
import Header from "./components/Header";



function App() {

  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(()=> {

    const fetchToken = async () => {

      axios
      .get(`${process.env.REACT_APP_API_URL}jwtid`, { withCredentials: true })
      .then ((res) => {
        
        setUid(res.data);
      })
      .catch ((err) => console.log("No token !!"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid))

  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Header/>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
