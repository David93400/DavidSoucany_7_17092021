import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {

    e.preventDefault();

    const data = new FormData();
    data.append("pseudo", userData.pseudo);
    data.append("userId", userData.id);
    data.append("file", file);


    dispatch(uploadPicture(data, userData.id));

  };

  return (
    <div className="mb-3">
      <form action="" onSubmit={handlePicture}>
        <label
          htmlFor="file"
          className="form-label mt-3 mb-3 fs-5 text-danger display-1"
        >
          Changer d'image
        </label>
        <input
          className="form-control"
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <input
          type="submit"
          value="Envoyer"
          className="btn btn-secondary btn-block"
        />
      </form>
    </div>
  );
};

export default UploadImg;
