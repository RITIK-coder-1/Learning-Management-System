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
  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const [update] = useUpdateUserDetailsMutation();
  const { data, isLoading } = useGetUserQuery();
  const user = data?.data;

  /* ---------------------------------------------------------------------------------------
  The user details 
  ------------------------------------------------------------------------------------------ */
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });

  const [profilePic, setProfilePic] = useState(null);

  // setting the current value for better UX
  useEffect(() => {
    setUserDetails({
      firstName: user?.firstName || "", // || "" for avoiding the uncontrolled to controller bug
      lastName: user?.lastName || "",
      username: user?.username || "",
    });
  }, [user]);

  /* ---------------------------------------------------------------------------------------
  The method to change the value of the fields 
  ------------------------------------------------------------------------------------------ */

  // text value
  const changeValue = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // the profile pic
  const updateProfilePic = (e) => {
    setProfilePic(e.target.files[0]); // set the value of the profile pic as the file object
    setUserDetails({ ...userDetails, profilePic: e.target.files[0] });
  };

  /* ---------------------------------------------------------------------------------------
  The API call to update the details 
  ------------------------------------------------------------------------------------------ */
  const updateDetails = async (e) => {
    e.preventDefault();

    try {
      // upload the simple object if the profile pic isn't updated
      if (!profilePic) {
        await update(userDetails).unwrap();
      } else {
        // else upload a form data 
        const formData = new FormData();

        Object.keys(userDetails).forEach((field) => {
          formData.append(field, userDetails[field]);
        });
        await update(formData).unwrap();
      }
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
            <label htmlFor="profilePic">Update your profile: </label>
            <input
              type="file"
              id="profilePic"
              className="outline cursor-pointer"
              onChange={updateProfilePic}
            />
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
