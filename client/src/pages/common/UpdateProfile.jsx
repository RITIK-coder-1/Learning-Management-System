/* ----------------------------------------------------------------------------------------------
UpdateProfile.jsx
The page to update the user profile 
------------------------------------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import {
  useGetUserQuery,
  useUpdateUserDetailsMutation,
} from "../../api/index.api";

function UpdateProfile() {
  const [update] = useUpdateUserDetailsMutation();
  const { data, isLoading } = useGetUserQuery();
  const user = data?.data;

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });

  useEffect(() => {
    setUserDetails({
      firstName: user?.firstName || "", // || "" for avoiding the uncontrolled to controller bug
      lastName: user?.lastName || "",
      username: user?.username || "",
    });
  }, [user]);

  const changeValue = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const updateDetails = async (e) => {
    e.preventDefault();

    try {
      await update(userDetails).unwrap();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <img src={user?.profilePic} className="w-12 h-12" />
          <form className="flex flex-col gap-2" onSubmit={updateDetails}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userDetails.username}
              className="outline"
              onChange={changeValue}
              required
            />
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userDetails.firstName}
              className="outline"
              onChange={changeValue}
              required
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userDetails.lastName}
              className="outline"
              onChange={changeValue}
            />
            <button type="submit" className="border">
              Update
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default UpdateProfile;
