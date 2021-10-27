import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import { isEmpty } from './Utils';
import Card from './Post/Card';

const Thread = () => {

    const [loadPost, setLoadPost] = useState(true);
    const [count, setcount]= useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    const loadMore = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
        setLoadPost(true);
      }
    }
// infinite scroll
    useEffect(() => {
            if (loadPost){
                dispatch(getPosts(count ));
                setLoadPost(false);
                setcount(count + 5);
            }

            window.addEventListener('scroll', loadMore);
            return () => window.removeEventListener('scroll', loadMore)

    }, [loadPost, dispatch, count])

    return (
      <div className="container mt-5">
        <div>
          {!isEmpty(posts[0]) &&
            posts.map((post) => {
              return <Card post={post} key={post.id}/>
            })}
        </div>
      </div>
    );
};

export default Thread;