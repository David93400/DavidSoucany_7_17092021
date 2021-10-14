import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id));

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
