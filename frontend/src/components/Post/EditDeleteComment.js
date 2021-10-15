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
        //   console.log(comment.comment.id, text);
        dispatch(editComment(comment.comment.id, text)).then(() =>
          dispatch(getComments())
          .then(() => setText(''), setEdit(false))

        );
      }

    // if (text) {
    //   dispatch(editComment(comment.comment.id, text));
    //   setText('');
    //   setEdit(false);
    // }
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
            className="mb-2 btn border"
            htmlFor="text"
            onClick={() => setEdit(!edit)}
          >
            Éditer
          </label>
          <br />
          <div className="d-flex align-items-center">
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
                  style={{ width: 50 }}
                />
              </div>
            </span>
            <textarea
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              defaultValue={comment.comment.comment}
              className="text-muted form-control ms-4 me-1"
              rows="1"
            />
            <input
              className="btn btn-secondary btn-sm ms-2 mb-1"
              type="submit"
              value="Valider les modifications"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
