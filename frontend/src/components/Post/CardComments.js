import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../actions/comments.actions';
import { addComment } from '../../actions/post.actions';
import { dateParser, isEmpty } from '../Utils';
import EditDeleteComment from './EditDeleteComment';
import './CardComments.css';

const CardComments = (post) => {
  const [text, setText] = useState('');
  const commentsData = useSelector((state) => state.commentsReducer);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    const data = {
      userId: userData.id,
      postId: post.post.id,
      comment: text,
    };

    e.preventDefault();
    if (text) {
      dispatch(addComment(data)).then(() =>
        dispatch(getComments()).then(() => setText(''))
      );
    }
  };

  return (
    <>
      <p className="display-5 fs-5 ps-3">Commentaires</p>
      {!isEmpty(commentsData[0]) &&
        commentsData.map((comment) => {
          if (comment.postId === post.post.id) {
            return (
              <div
                className={
                  userData.id === comment.userId
                    ? 'mb-2 ms-4 me-4 user '
                    : 'border-secondary card mb-2 ms-4 me-4'
                }
                // className="card mb-2 border-danger ms-4 me-4"
                key={comment.id}
              >
                <div className="d-flex align-items-center flex-wrap">
                  <img
                    src={
                      !isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user.id === comment.userId) return user.avatar;
                          else return null;
                        })
                        .join('')
                    }
                    className="m-3 img-fluid rounded-circle"
                    style={{ width: 40 }}
                    alt="commenter-pic"
                  />

                  <div className="d-block">
                    <p className="mt-1 fw-bold ms-3">
                      {!isEmpty(usersData[0]) &&
                        usersData
                          .map((user) => {
                            if (user.id === comment.userId) return user.pseudo;
                            else return null;
                          })
                          .join('')}
                    </p>
                    <span className="d-flex align-items-center ms-3">
                      {comment.comment}
                    </span>
                    <EditDeleteComment
                      comment={comment}
                      postId={post.post.id}
                    />
                  </div>
                </div>
                <span className="text-muted ps-3">
                  Le {dateParser(comment.createdAt)}
                </span>
              </div>
            );
          }
          return null;
        })}
      {userData.id && (
        <div className="container col-sm-6 pt-2">
          <form
            className="d-flex justify-content-center align-items-center"
            action=""
            onSubmit={handleComment}
          >
            <input
              className="form-control me-2"
              type="text"
              name="comment"
              id="comment"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Laisser un commentaire"
            />
            <br />
            <button className="btn btn-secondary" type="submit">
              Envoyer
            </button>
          </form>
        </div>
      )}
      <div className="btn"></div>
    </>
  );
};

export default CardComments;
