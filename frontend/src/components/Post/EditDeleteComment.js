import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getComments } from '../../actions/comments.actions';
import { deleteComment, editComment } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = (comment, postId) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const uid = useContext(UidContext);

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(comment.comment.id, text)).then(() =>
        dispatch(getComments()).then(() => setText(''), setEdit(false))
      );
    }
  };

  const handleDelete = () =>
    dispatch(deleteComment(comment.comment.id)).then(() =>
      dispatch(getComments())
    );

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.comment.userId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.comment.userId]);

  return (
    <div>
      {isAuthor && edit === false && (
        <span className="btn" onClick={() => setEdit(!edit)}>
          <img
            src="./img/edit.png"
            alt="edit-comment-icon"
            className="img-fluid rounded-circle"
            style={{ width: 25 }}
          />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit}>
          <label
            className="mb-2 btn border ms-2"
            htmlFor="text"
            onClick={() => setEdit(!edit)}
          >
            Éditer
          </label>
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
                  className="img-fluid"
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
