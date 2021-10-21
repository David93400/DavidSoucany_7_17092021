import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'reactstrap';
import { addPost, getPosts } from '../../actions/post.actions';
import { isEmpty, timestampParser } from '../Utils';

import './NewPost.css';

const Swal = require('sweetalert2');

const NewPost = (post) => {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postAttachment, setPostAttachment] = useState(null);
  const [file, setFile] = useState();

  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  // const commentsData = useSelector((state) => state.commentsReducer);
  // const posts = useSelector((state) => state.postReducer);

  const handlePost = async () => {
    if (title && content) {
      const data = new FormData();
      data.append('userId', userData.id);
      data.append('title', title);
      data.append('content', content);
      if (file) data.append('file', file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez saisir un titre et un contenu',
        confirmButtonColor: 'red',
      });
    }
  };

  const handlePicture = (e) => {
    setPostAttachment(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setTitle('');
    setContent('');
    setPostAttachment('');
    setFile('');
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  return (
    <div className="container mt-4 pt-5">
      {isLoading ? (
        <div className="card mb-3" style={{ height: 100 }}>
          <div className="card-body text-center">
            <i className="fas fa-spinner fa-pulse"></i>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-3 new-post">
            <div className="card">
              <div className="card-body ">
                <NavLink
                  className="d-flex justify-content-center"
                  href="/profil"
                >
                  <img
                    src={userData.avatar}
                    alt="avatar"
                    className="img-fluid rounded-circle mt-4"
                    style={{ width: 110 }}
                  />
                </NavLink>
                <div className="mb-3 mt-3 d-flex d-row"></div>
                <textarea
                  name="title"
                  id="title"
                  className="card-title fs-5 display-5 text-left ps-2 form-control"
                  rows="1"
                  placeholder="Titre"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                <textarea
                  name="content"
                  id="content"
                  className="card-text ps-2 fs-5 display-5 text-left form-control"
                  rows="3"
                  placeholder="Contenu"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                />
                <span className="d-flex flex-wrap justify-content-between mt-3">
                  <div className="d-flex mb-2">
                    <img
                      className="img-fluid me-2"
                      style={{ width: 42 }}
                      src="./img/picture.png"
                      alt="pic-icon"
                    />
                    <input
                      className="form-control-sm"
                      type="file"
                      id="file"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </div>
                  <div>
                    {title || content || postAttachment ? (
                      <button
                        className="btn btn-block btn-danger"
                        onClick={cancelPost}
                      >
                        Annuler
                      </button>
                    ) : null}
                    <button
                      className="btn btn-block btn-secondary ms-2"
                      onClick={handlePost}
                    >
                      Publier
                    </button>
                  </div>
                </span>
                {title || content || postAttachment ? (
                  <>
                    <p className="text-center fs-5 mt-5 display-1">
                      Prévisualisation
                    </p>
                    <div className="container">
                      <div className="card">
                        <div className="card-body ">
                          <div className="mb-3 mt-1 d-flex d-row align-items-center">
                            <img
                              src={userData.avatar}
                              className=" d-block rounded-circle border mt-3"
                              style={{ width: 70 }}
                              alt="poster-pic"
                            />
                            <p className="pt-4 ps-3 fs-4 display-5">
                              {userData.pseudo}
                            </p>
                          </div>
                          <h5 className="card-title pt-3 fs-4 display-4 border-bottom">
                            {title}
                          </h5>
                          <p className="card-text pt-3 ">{content}</p>
                          <span className="d-flex justify-content-center">
                            {postAttachment && (
                              <img
                                src={postAttachment}
                                className="card m-5 "
                                alt="post-pic"
                              />
                            )}
                          </span>
                          <p className="card-text pt-3 pb-2 ">
                            <small className="text-muted">
                              {timestampParser(Date.now())}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPost;
