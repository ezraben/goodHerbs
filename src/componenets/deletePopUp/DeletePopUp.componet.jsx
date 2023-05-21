import { useEffect } from "react";

const DeletePopUp = ({ emailToDelete, deleteOnPopUpClick, hidePopUp }) => {
  useEffect(() => {}, []);
  const handleFormClick = (ev) => {
    ev.stopPropagation();
  };
  return (
    <div onClick={hidePopUp} className="center-wrapper">
      <div onClick={handleFormClick} className="buttonContainer center-form">
        <p>Are you sure you wanna delete the user {emailToDelete}?</p>
        <button onClick={deleteOnPopUpClick} className="btn btn-warning">
          Delete
        </button>
        <button onClick={hidePopUp} className="btn btn-danger">
          Cancel
        </button>
      </div>
    </div>

    ////////////////////////////////////
    //before adding stop propagation
    // <div  className="center-wrapper">
    //   <div className="buttonContainer center-form">
    //     <p>Are you sure you wanna delete the user {emailToDelete}?</p>
    //     <button onClick={deleteOnPopUpClick} className="btn btn-warning">
    //       Delete
    //     </button>
    //     <button onClick={hidePopUp} className="btn btn-danger">
    //       Cancel
    //     </button>
    //   </div>
    // </div>
    ////////////////////////////////////
    // until here before adding stop propagation
  );
};

export default DeletePopUp;
