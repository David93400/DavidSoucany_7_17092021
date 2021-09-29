import React, { useState, useEffect } from "react";
import Routes from "./components/Routes";
import 'bootstrap/dist/css/bootstrap.min.css'
import { UidContext } from "./components/AppContext";
import axios from "axios";



function App() {

  const [uid, setUid] = useState(null);

  useEffect(()=> {

    const fetchToken = async () => {

      axios
      .get(`${process.env.REACT_APP_API_URL}jwtid`, { withCredentials: true })
      .then ((res) => {
        
        setUid(res.data);
      })
      .catch ((err) => console.log("No token"));
    };
    fetchToken();

  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
