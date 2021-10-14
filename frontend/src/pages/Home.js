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
        <div className="home-header">
            {uid ? <NewPost/> : <Login signin={true} signup={false}/> }
        </div>
        <Thread/>
        </>
    );
};

export default Home;