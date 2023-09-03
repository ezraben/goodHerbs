import { useEffect, useState } from "react";
// import usersCss from "./usersComponentCss.css";
import axios from "axios";
import { Pencil, Trash } from "react-bootstrap-icons";

const UsersComonent = (props) => {
  const [checkAdmin, setCheckAdmin] = useState("");
  const [usersFirstName, setUsersFirstName] = useState(props.userFirstName);
  const [usersLastName, setUsersLastName] = useState(props.userLastName);
  const [id, setId] = useState(props.userId);
  const [email, setUserEmail] = useState(props.userEmail);
  const [totalUsers, setTotalUsers] = useState(props.numOfUsers);
  const [userNum, setUserNum] = useState();

  useEffect(() => {
    props.showAllUsers();
  }, []);
  useEffect(() => {}, [userNum]);

  useEffect(() => {
    handleUserNum();
  }, []);
  useEffect(() => {
    showIfAdmin();
  }, [props.admin]);
  useEffect(() => {
    showIfAdmin();
  }, []);

  const showIfAdmin = () => {
    if (props.admin === true) {
      setCheckAdmin("true");
    }
    if (props.admin === false) {
      setCheckAdmin("false");
    }
  };

  const editUserClick = () => {
    props.showEditPopUp(id, email, checkAdmin, usersFirstName, usersLastName);
  };
  const deleteUserClick = () => {
    console.log("id", id);
    props.showPopUp(id, email);
  };
  const handleUserNum = () => {};

  return (
    <div className="product ">
      <div className="mb-3 ">
        <h1>
          First name:{" "}
          <span className="text-primary">{props.userFirstName}</span>
        </h1>
        <hr />
        <h1>
          Last name: <span className="text-primary">{props.userLastName}</span>
        </h1>
        <hr />
        <h1>
          email: <span className="text-primary">{props.userEmail}</span>
        </h1>
        <hr />
        <h1>
          isUserAdmin:{" "}
          {checkAdmin === "true" ? (
            <span className="text-primary">{checkAdmin}</span>
          ) : (
            <span className="text-danger">{checkAdmin}</span>
          )}
        </h1>
        <hr />
        <div className=" d-flex justify-content-around">
          <button onClick={deleteUserClick} className="btn btn-danger">
            Delete user <Trash />
          </button>
          <button onClick={editUserClick} className="btn btn-warning">
            Edit user <Pencil />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersComonent;
