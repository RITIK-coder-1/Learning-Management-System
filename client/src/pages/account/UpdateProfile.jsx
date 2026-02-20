/* ----------------------------------------------------------------------------------------------
UpdateProfile.jsx
The page to update the user profile 
------------------------------------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import {
  useDeleteUserProfilePicMutation,
  useUpdateUserDetailsMutation,
  useGetUserQuery,
} from "../../api/index.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authSlice";
import getFormData from "../../utils/getFormData";
import {
  CommonButton,
  FieldInput,
  Form,
  InputFile,
  UserProfilePic,
} from "@/components/index.components";
function UpdateProfile() {
  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const [update] = useUpdateUserDetailsMutation();
  const { data } = useGetUserQuery();
  const user = data?.data;
  const [deleteProfilePic] = useDeleteUserProfilePicMutation();
  const dispatch = useDispatch();

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
        const { data } = await update(userDetails).unwrap();
        dispatch(setUser(data));
      } else {
        // else upload a form data
        const formData = getFormData(userDetails);
        const { data } = await update(formData).unwrap();
        dispatch(setUser(data));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  /* ---------------------------------------------------------------------------------------
  The API call to delete the profile pic 
  ------------------------------------------------------------------------------------------ */
  const deletePicFunction = async () => {
    try {
      const { data } = await deleteProfilePic().unwrap();
      dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UserProfilePic />
      <Form onSubmit={updateDetails}>
        {/* The profile pic */}
        <InputFile
          description="Update Your Profile Pic"
          required={false}
          name="profilePic"
          onChange={updateProfilePic}
        />

        {/* Only students can delete the profile pic */}
        {user?.accountType === "Student" && user?.profilePic !== "" && (
          <span className="w-full">
            <CommonButton
              label="Delete Pic"
              onClick={deletePicFunction}
              className="bg-red-900 hover:bg-red-950 w-24 text-md"
              title="Delete Pic"
            />
          </span>
        )}

        <hr className="border-b border-white/10 w-full" />

        {/* The username */}
        <FieldInput
          label="Username"
          name="username"
          placeholder={userDetails.username}
          onChange={changeValue}
          required={false}
        />

        {/* The first name */}
        <FieldInput
          label="First Name"
          name="firstName"
          placeholder={userDetails.firstName}
          onChange={changeValue}
          required={false}
        />

        {/* The last name */}
        <FieldInput
          label="Last Name"
          name="lastName"
          placeholder={userDetails.lastName}
          onChange={changeValue}
          required={false}
        />

        {/* The button */}
        <CommonButton type="submit" label="Update" title="Update Details" />
      </Form>
    </>
  );
}

export default UpdateProfile;
