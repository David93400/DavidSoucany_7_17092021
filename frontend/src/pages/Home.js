import React, { useContext } from 'react';
import Thread from '../components/Thread';
import { UidContext } from '../components/AppContext';
import '../styles/home.css'
import NewPost from '../components/Post/NewPost';
import Login from '../components/Login/Index.js';



const Home = () => {
    const uid = useContext(UidContext)
    return (
      <>
        <h1 className="text-center mt-5 fw-bold col-9 container main-title" style={{ color: '#0A1F43' }}>
          Bienvenue sur le réseau Social de Groupomania
        </h1>
        <div>{uid ? <NewPost /> : <Login signin={true} signup={false} />}</div>
        <Thread />
      </>
    );
};

export default Home;