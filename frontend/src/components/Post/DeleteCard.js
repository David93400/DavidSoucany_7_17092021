import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

const DeleteCard = (props) => {

  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id, userData.id, userData.isAdmin));

  return (
    <div 
      onClick={() => {
        if (window.confirm('Voulez-vous supprimer cette publication ?')) {
          deleteQuote();
        }
      }}
    >
      <img
        className="img-fluid rounded-circle"
        style={{ width: 25 }}
        src="./img/delete.png"
        alt="icon-delete"
      />
      <small className="text-muted ms-1 ">Supprimer</small>
    </div>
  );
};

export default DeleteCard;
