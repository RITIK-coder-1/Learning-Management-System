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
  SpinnerCustom,
} from "@/components/index.components";
import { toast } from "sonner";
import { TrashIcon } from "lucide-react";

function UpdateProfile() {
  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const [update, { isLoading: isUpdateLoading }] =
    useUpdateUserDetailsMutation();
  const { data, isLoading: isUserLoading } = useGetUserQuery();
  const user = data?.data;
  const [deleteProfilePic, { isLoading: isDeleteProfileLoading }] =
    useDeleteUserProfilePicMutation();
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
        const { data, message } = await update(userDetails).unwrap();
        dispatch(setUser(data));
        toast.success(message, { position: "top-right" });
      } else {
        // else upload a form data
        const formData = getFormData(userDetails);
        const { data, message } = await update(formData).unwrap();
        dispatch(setUser(data));
        toast.success(message, { position: "top-right" });
      }
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    }
  };

  /* ---------------------------------------------------------------------------------------
  The API call to delete the profile pic 
  ------------------------------------------------------------------------------------------ */
  const deletePicFunction = async () => {
    try {
      const { data, message } = await deleteProfilePic().unwrap();
      dispatch(setUser(data));
      toast.success(message, { position: "top-right" });
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    }
  };

  return (
    <>
      {isUserLoading ? (
        <SpinnerCustom className="size-9" />
      ) : (
        <>
          <UserProfilePic />
          <Form onSubmit={updateDetails} className="mb-3">
            {/* The profile pic */}
            <InputFile
              description="Update Your Profile Pic"
              required={false}
              name="profilePic"
              onChange={updateProfilePic}
              accept="image/*"
            />

            {/* Only students can delete the profile pics */}
            {user?.accountType === "Student" && user?.profilePic !== "" && (
              <span className="w-full">
                <CommonButton
                  label={
                    isDeleteProfileLoading ? (
                      <SpinnerCustom />
                    ) : (
                      <div className="flex items-center gap-2">
                        <TrashIcon className="w-4 h-4" />{" "}
                        <span>Delete Pic</span>
                      </div>
                    )
                  }
                  onClick={deletePicFunction}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-200 active:scale-95 disabled:opacity-50 w-32 text-sm"
                  title="Delete Pic"
                  disabled={isDeleteProfileLoading}
                />
              </span>
            )}

            <hr className="border-b border-white/10 w-full" />

            {/* The username */}
            <FieldInput
              label="Username"
              name="username"
              value={userDetails.username}
              onChange={changeValue}
              required={false}
            />

            {/* The first name */}
            <FieldInput
              label="First Name"
              name="firstName"
              value={userDetails.firstName}
              onChange={changeValue}
              required={false}
            />

            {/* The last name */}
            <FieldInput
              label="Last Name"
              name="lastName"
              value={userDetails.lastName}
              onChange={changeValue}
              required={false}
              placeholder="lastname"
            />

            {/* The button */}
            <CommonButton
              type="submit"
              label={isUpdateLoading ? <SpinnerCustom /> : "Update"}
              title="Update Details"
            />
          </Form>
        </>
      )}
    </>
  );
}

export default UpdateProfile;
