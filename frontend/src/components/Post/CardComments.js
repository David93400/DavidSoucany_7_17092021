import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../actions/comments.actions';
import { addComment } from '../../actions/post.actions';
import { dateParser, isEmpty } from '../Utils';
import EditDeleteComment from './EditDeleteComment';

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
                className="card mb-3 border-danger ms-4 me-4"
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
                    style={{ width: 80 }}
                    alt="commenter-pic"
                  />

                  <div className="d-block">
                    <p className="mt-3 fw-bold ms-2">
                      {!isEmpty(usersData[0]) &&
                        usersData
                          .map((user) => {
                            if (user.id === comment.userId) return user.pseudo;
                            else return null;
                          })
                          .join('')}
                    </p>
                    <p className="d-flex align-items-center border-bottom pb-3 ms-2">
                      {comment.comment}
                    </p>
                    <EditDeleteComment comment={comment} postId={post.post.id}/>
                  </div>
                </div>
                <p className="text-muted ps-3 mt-2">
                  Le {dateParser(comment.createdAt)}
                </p>
              </div>
            );
          }
          return null;
        })}
      {userData.id && (
        <div className="container col-sm-6 pb-4">
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
    </>
  );
};

export default CardComments;
