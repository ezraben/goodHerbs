import { useEffect } from "react";

const DeletePopUp = ({ emailToDelete, deleteOnPopUpClick, hidePopUp }) => {
  useEffect(() => {}, []);
  const handleFormClick = (ev) => {
    ev.stopPropagation();
  };
  return (
    <div onClick={hidePopUp} className="center-wrapper">
      <div onClick={handleFormClick} className="buttonContainer center-form">
        <div className="topSpaceFromNav form-group">
          <div>
            <p>
              Are you sure you wanna delete the user{" "}
              <span className="text-danger">{emailToDelete}?</span>{" "}
            </p>
          </div>
          <div className="d-flex justify-content-around">
            <button onClick={deleteOnPopUpClick} className="btn btn-danger ">
              Delete
            </button>
            <button onClick={hidePopUp} className="btn btn-warning">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
