import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'reactstrap';
import { dateParser, isEmpty } from '../Utils';

const CardComments = (post) => {
  const [comment, setComment] = useState('');
  const commentsData = useSelector((state) => state.commentsReducer);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  console.log(post.post.id);

  const handleComment = () => {};

  return (
    <>
      {!isEmpty(commentsData[0]) &&
        commentsData.map((comment) => {
          if (comment.postId === post.post.id) {
            return (
              <div className="card mb-3" key={comment.id}>
                <p className="display-5 fs-5 m-2 border-bottom">Commentaires</p>
                <div className="d-flex align-items-center">
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
                    <p className="mt-3 fw-bold">
                      {!isEmpty(usersData[0]) &&
                        usersData
                          .map((user) => {
                            if (user.id === comment.userId) return user.pseudo;
                            else return null;
                          })
                          .join('')}
                    </p>
                    <p className="d-flex align-items-center">
                      {comment.comment}
                    </p>
                  </div>
                </div>
                <p className="text-muted ps-3">
                  Le {dateParser(comment.createdAt)}
                </p>
              </div>
            );
          }
        })}
    </>
  );
};

export default CardComments;
