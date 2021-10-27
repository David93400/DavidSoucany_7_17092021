import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../actions/comments.actions';
import { deleteComment, editComment } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = (comment, postId) => {
  const userData = useSelector((state) => state.userReducer);
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const uid = useContext(UidContext);

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(
        editComment(comment.comment.id, text, userData.id, userData.isAdmin)
      ).then(() =>
        dispatch(getComments()).then(() => setText(''), setEdit(false))
      );
    }
  };

  const handleDelete = () =>
    dispatch(
      deleteComment(comment.comment.id, userData.id, userData.isAdmin)
    ).then(() => dispatch(getComments()));

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.comment.userId || userData.isAdmin) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [userData.isAdmin, uid, comment.comment.userId]);

  return (
    <div>
      {isAuthor && edit === false && (
        <span className="btn" onClick={() => setEdit(!edit)}>
          <img
            src="./img/edit.png"
            alt="edit-comment-icon"
            className="img-fluid rounded-circle bg-light"
            style={{ width: 25 }}
          />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit}>
          <span className="btn" onClick={() => setEdit(!edit)}>
            <img
              src="./img/edit.png"
              alt="edit-comment-icon"
              className="img-fluid rounded-circle bg-light"
              style={{ width: 25 }}
            />
          </span>
          <br />
          <div className="d-flex align-items-center flex-wrap">
            <span
              onClick={() => {
                if (
                  window.confirm(
                    'Voulez-vous vraiment supprimer ce commentaire ?'
                  )
                ) {
                  handleDelete();
                }
              }}
            >
              <div className="d-inline btn">
                <img
                  src="./img/trash.png"
                  alt="delete-icon"
                  className="img-fluid bg-light rounded-circle"
                  style={{ width: 35 }}
                />
              </div>
            </span>
            <textarea
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              defaultValue={comment.comment.comment}
              className="text-muted form-control me-1 col"
              rows="1"
            />
            <input
              className="btn btn-secondary ms-2 mb-1 me-2"
              type="submit"
              value="Modifier"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
