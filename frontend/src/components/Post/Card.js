import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../actions/post.actions';
import { dateParser, isEmpty } from '../Utils';
import './Card.css';
import CardComments from './CardComments';
import DeleteCard from './DeleteCard';

const Card = ({ post }) => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdated, setTextUpdated] = useState(null);
  const [titleUpdated, setTitleUpdated] = useState(null);
  const dispatch = useDispatch();

  const updateItem = async () => {
    if (textUpdated || titleUpdated) {
      dispatch(updatePost(post.id, textUpdated, titleUpdated));
    }

    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <div className="card-container" key={post.id}>
      {isLoading ? (
        <div className="card mb-3" style={{ height: 100 }}>
          <div className="card-body text-center">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <div className="card">
              <div className="card-body ">
                <div className="mb-3 mt-3 d-flex d-row">
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
                      alt="poster-pic"
                    />
                  </div>
                  <div>
                    <p className="d-flex pt-3 fs-4 ps-3 display-5">
                      {!isEmpty(usersData[0]) &&
                        usersData
                          .map((user) => {
                            if (user.id === post.userId) return user.pseudo;
                            else return null;
                          })
                          .join('')}
                    </p>
                  </div>
                </div>

                {isUpdated === false && (
                  <h5 className="card-title pt-3 fs-4 display-4 border-bottom">
                    {post.title}
                  </h5>
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

                <span
                  className="d-flex justify-content-center"
                >
                  {post.attachment && (
                    <img
                      src={post.attachment}
                      className="m-3 img-fluid"
                      alt="post-pic"
                    />
                  )}
                </span>
                <div className="mt-2 ms-2 btn">
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
                <p className="card-textpb-2 ">
                  <small className="text-muted">
                    Posté le {dateParser(post.createdAt)}
                  </small>
                  <small className="ms-5 ps-5">Like Button</small>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      
      <CardComments post={post}/>
    </div>
  );
};

export default Card;
