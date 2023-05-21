import { useEffect, useState } from "react";
import usersCss from "./usersComponentCss.css";
import axios from "axios";

const UsersComonent = (props) => {
  const [checkAdmin, setCheckAdmin] = useState("");
  const [usersFirstName, setUsersFirstName] = useState(props.userFirstName);
  const [usersLastName, setUsersLastName] = useState(props.userLastName);
  const [id, setId] = useState(props.userId);
  const [email, setUserEmail] = useState(props.userEmail);

  useEffect(() => {
    props.showAllUsers();
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

    // showIfAdmin();
  };
  const deleteUserClick = () => {
    console.log("id", id);
    props.showPopUp(id, email);
  };

  return (
    <div className="user">
      <table className="table table-dark table-responsive">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">email</th>
            <th scope="col">isUserAdmin</th>
            <th scope="col">id</th>
            <th scope="col">delete user</th>
            <th scope="col">edit user</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>{props.userFirstName}</td>
            <td>{props.userLastName}</td>
            <td>{props.userEmail}</td>
            <td>{checkAdmin}</td>
            <td> {props.userId}</td>
            <td>
              <button
                onClick={deleteUserClick}
                className="btn btn-danger"
              ></button>
            </td>
            <td>
              <button
                onClick={editUserClick}
                className="btn btn-warning"
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/////////////////////////////////////////////////
//working!!!  but before adding delete pop up  -- deleting in singele click
// const UsersComonent = (props) => {
//   const [checkAdmin, setCheckAdmin] = useState("");
//   const [id, setId] = useState(props.userId);
//   const [email, setUserEmail] = useState("");

//   useEffect(() => {
//     showIfAdmin();
//   }, []);
//   useEffect(() => {
//     // editUserClick();
//     props.showAllUsers();
//   }, []);

//   const showIfAdmin = (admin) => {
//     if (props.admin === true) {
//       setCheckAdmin("true");
//     }
//     if (props.admin === false) {
//       setCheckAdmin("false");
//     }
//   };

//   const editUserClick = () => {
//     console.log("click");
//     props.showPopUp();
//   };
//   const deleteUserClick = () => {
//     console.log("id", id);

//     axios
//       .delete(`/users/removeUser?id=${id}`)
//       .then((data) => {
//         console.log(data);
//         props.showAllUsers();
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };
//   return (
//     <div className="user">
//       <table className="table table-dark table-responsive">
//         <thead>
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">First name</th>
//             <th scope="col">Last name</th>
//             <th scope="col">email</th>
//             <th scope="col">isUserAdmin</th>
//             <th scope="col">id</th>
//             <th scope="col">delete user</th>
//             <th scope="col">edit user</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <th scope="row">1</th>
//             <td>{props.userFirstName}</td>
//             <td>{props.userLastName}</td>
//             <td>{props.userEmail}</td>
//             <td>{checkAdmin}</td>
//             <td> {props.userId}</td>
//             <td>
//               <button
//                 onClick={deleteUserClick}
//                 className="btn btn-danger"
//               ></button>
//             </td>
//             <td>
//               <button
//                 onClick={editUserClick}
//                 className="btn btn-warning"
//               ></button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

/////////////////////////////////////////////////
//working!!!  but before adding delete pop up  -- deleting in singele click

export default UsersComonent;
