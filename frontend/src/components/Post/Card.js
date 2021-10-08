import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import './Card.css';

const Card = ({ post }) => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [isLoading, setIsLoading] = useState(true);

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
        <div className="mb-3">
          <div className="card">
            <div className="card-body ">
              <div className="row mb-3 mt-3">
                <div className="col-1">
                  <img
                    src={
                      !isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user.id === post.posterId) return user.avatar;
                          else return null;
                        })
                        .join('')
                    }
                    className="img-fluid d-block mx-auto rounded-circle border"
                    style={{ width: 70 }}
                    alt="poster-pic"
                  />
                </div>
                <div className="col">
                  <p className="d-flex pt-3 fs-4">
                    {!isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user.id === post.posterId) return user.pseudo;
                          else return null;
                        })
                        .join('')}
                  </p>
                </div>
              </div>
              <h5 className="card-title pt-3 fs-4 display-4 border-bottom">
                {post.title}
              </h5>
              <p className="card-text pt-3 ">{post.content}</p>
              <span className="d-flex justify-content-center align--center">
                {post.attachment && (
                  <img
                    src={post.attachment}
                    className="card m-5 "
                    alt="post-pic"
                  />
                )}
              </span>
              <p className="card-text pt-3 pb-2 ">
                <small className="text-muted">
                  Posté le {dateParser(post.createdAt)}
                </small>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
