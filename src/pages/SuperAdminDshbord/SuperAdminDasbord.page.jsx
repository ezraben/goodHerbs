import axios from "axios";
import { useEffect, useState } from "react";
import UsersComonent from "../../componenets/UsersComponent/Users.Component";
import DeletePopUp from "../../componenets/deletePopUp/DeletePopUp.componet";
import EditPopUp from "../../componenets/superAdminEdit/AdminEditPopUp";

const SupeAdminDashBordPage = () => {
  useEffect(() => {
    getAllUsers();
  }, []);

  const [showDeleteComp, setShowDeleteComp] = useState(false);
  const [showEditeComp, setShowEditeComp] = useState(false);

  const [userId, setUserId] = useState();
  const [userFirstName, setUerFirstName] = useState();
  const [usersLastName, setUsersLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [isUserAdmin, setIsUserAdmin] = useState();

  const [arrOfUsers, setArrOfUsers] = useState([]);
  const [rowNumber, setRowNumber] = useState("");

  const handleShowPopUp = (id, email) => {
    setShowDeleteComp(true);
    setUserId(id);

    setUserEmail(email);
  };
  const handleShowEditPopUp = (id, email, admin, firstName, lastName) => {
    setShowEditeComp(true);
    // setShowEditeComp(true);
    setUserId(id);
    setIsUserAdmin(admin);
    setUerFirstName(firstName);
    setUsersLastName(lastName);
    setUserEmail(email);
  };
  const hideDeletePopUp = () => {
    setShowDeleteComp(false);
  };
  const hideEditPopUp = () => {
    setShowEditeComp(false);
  };

  const getAllUsers = () => {
    axios("/users")
      .then((data) => {
        setArrOfUsers(data.data);
        console.log("data", data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const confirmDeleteUser = (ev) => {
    console.log("click");
    axios
      .delete(`/users/removeUser?id=${userId}`)
      .then((data) => {
        axios
          .delete(`products/deleteProductsByUserForDelete?email=${userEmail}`)

          .then((data) => {})
          .catch((err) => {
            console.log("err", err);
          });
        getAllUsers();
        console.log(data);
        hideDeletePopUp();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div>
      <h1>Admin Dashbord</h1>
      {arrOfUsers.map((arr) => (
        <UsersComonent
          userFirstName={arr.firstName}
          userLastName={arr.lastName}
          userEmail={arr.email}
          admin={arr.isAdmin}
          userId={arr._id}
          showPopUp={handleShowPopUp}
          showEditPopUp={handleShowEditPopUp}
          showAllUsers={getAllUsers}
          key={arr._id}
        />
      ))}
      {showDeleteComp && (
        <DeletePopUp
          hidePopUp={hideDeletePopUp}
          deleteOnPopUpClick={confirmDeleteUser}
          id={userId}
          refreshAllUsers={getAllUsers}
          emailToDelete={userEmail}
        />
      )}
      {showEditeComp && (
        <EditPopUp
          hideEdit={hideEditPopUp}
          id={userId}
          refreshAllUsers={getAllUsers}
          admin={isUserAdmin}
          firstName={userFirstName}
          lastName={usersLastName}
          email={userEmail}
        />
      )}
    </div>
  );
};
export default SupeAdminDashBordPage;
