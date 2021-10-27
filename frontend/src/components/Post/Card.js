import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../actions/post.actions';
import { UidContext } from '../AppContext';
import { dateParser, isEmpty } from '../Utils';
import './Card.css';
import CardComments from './CardComments';
import DeleteCard from './DeleteCard';

const Card = ({ post }) => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const commentsData = useSelector((state) => state.commentsReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdated, setTextUpdated] = useState(null);
  const [titleUpdated, setTitleUpdated] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const dispatch = useDispatch();

  const updateItem = async () => {
    const content = post.content;
    const title = post.title;

    if (titleUpdated) {
      dispatch(
        updatePost(
          post.id,
          content,
          titleUpdated,
          post.userId,
          userData.isAdmin
        )
      );
    }
    if (textUpdated) {
      dispatch(
        updatePost(post.id, textUpdated, title, post.userId, userData.isAdmin)
      );
    }
    if (textUpdated && titleUpdated) {
      dispatch(
        updatePost(
          post.id,
          textUpdated,
          titleUpdated,
          post.userId,
          userData.isAdmin
        )
      );
    }

    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  const countComments = () => {
    // console.log(post.id);
    const result = commentsData.filter((comment) => comment.postId === post.id);

    // console.log(result);
    const count = result.length;
    // console.log(count);
    if (count <= 1) {
      return count + ' Commentaire';
    } else if (count > 1) {
      return count + ' Commentaires';
    }
  };

  return (
    <div className="card-container" key={post.id}>
      {isLoading ? (
        <div className="card mb-3" style={{ height: 100 }}>
          <div className="card-body text-center">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        </div>
      ) : (
        <div key={post.id}>
          <div className="mb-3">
            <div className="card">
              <div className="card-body card-post ">
                <div className=" d-flex d-row p-4 bg-user">
                  <div>
                    <img
                      src={
                        !isEmpty(usersData[0]) &&
                        usersData
                          .map((user) => {
                            if (user.id === post.userId) return user.avatar;
                            else return null;
                          })
                          .join('')
                      }
                      className=" d-block mx-auto rounded-circle border"
                      style={{ width: 70 }}
                      alt={`${post.userId + post.id}`}
                    />
                  </div>
                  <div>
                    <h2 className="d-flex pt-3 fs-4 ps-3 display-5">
                      {!isEmpty(usersData[0]) &&
                        usersData
                          .map((user) => {
                            if (user.id === post.userId) return user.pseudo;
                            else return null;
                          })
                          .join('')}
                    </h2>
                  </div>
                </div>

                {isUpdated === false && (
                  <h2 className="card-title pt-3 fs-4 display-4 border-bottom">
                    {post.title}
                  </h2>
                )}
                {isUpdated && (
                  <div className="update-post">
                    <textarea
                      className="form-control mt-2"
                      rows="1"
                      defaultValue={post.title}
                      onChange={(e) => setTitleUpdated(e.target.value)}
                    />
                  </div>
                )}

                {isUpdated === false && (
                  <p className="card-text pt-3 ">{post.content}</p>
                )}
                {isUpdated && (
                  <div className="update-post">
                    <textarea
                      className="form-control mt-2"
                      rows="3"
                      defaultValue={post.content}
                      onChange={(e) => setTextUpdated(e.target.value)}
                    />
                    <div className="btn-container">
                      <button
                        onClick={updateItem}
                        className="btn btn-secondary mt-3"
                      >
                        Valider modification
                      </button>
                    </div>
                  </div>
                )}

                <span className="d-flex justify-content-center">
                  {post.attachment && (
                    <img
                      src={post.attachment}
                      className="m-3 img-fluid"
                      alt={post.userId}
                    />
                  )}
                </span>

                <div className="mt-2 btn ">
                  {(userData.id === post.userId || userData.isAdmin) && (
                    <div className="button-container mb-1 d-flex">
                      <div onClick={() => setIsUpdated(!isUpdated)}>
                        <img
                          className="img-fluid rounded-circle"
                          style={{ width: 25 }}
                          src="./img/edit.png"
                          alt="edit-button"
                        />
                        <small className="text-muted ms-1 me-3">Éditer</small>
                      </div>
                      <DeleteCard id={post.id} />
                    </div>
                  )}
                </div>

                <span className="card-text d-flex justify-content-center align-items-center flex-wrap">
                  <small className="text-muted m-auto d-flex">
                    Posté le {dateParser(post.createdAt)}
                  </small>
                  {uid ? (
                    <div className="pt-1">
                      <small
                        onClick={() => setShowComments(!showComments)}
                        className="btn border-bottom"
                      >
                        <i className="far fa-comment me-2"></i>
                        {!isEmpty(commentsData[0]) && countComments()}
                      </small>
                      <small
                        onClick={() => setShowComments(!showComments)}
                        className="btn border-bottom"
                      >
                        Commenter
                      </small>
                    </div>
                  ) : (
                    <a className="btn border-bottom" href="/profil">
                      Vous devez être connecté pour commenter
                    </a>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {showComments && <CardComments post={post} />}
    </div>
  );
};

export default Card;
