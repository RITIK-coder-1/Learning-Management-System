import UserProfilePic from "@/components/layout/UserProfilePic";
import {
  CommonButton,
  DeleteDialogueBox,
  Navlink,
  SpinnerCustom,
} from "../../components/index.components";
import { useDeleteUserAccountMutation, useGetUserQuery } from "@/api/index.api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  // the user info
  const { data, isLoading } = useGetUserQuery();
  const user = data?.data;
  const accountType = user?.accountType;

  // D.O.B
  const dob = user?.dateOfBirth;
  const formattedDate = dob ? new Date(dob).toLocaleDateString("en-GB") : "N/A";

  // Account Deletion
  const [deleteAccount, { isSuccess }] = useDeleteUserAccountMutation();

  // the API call to delete the account
  const deleteUserAccount = async () => {
    try {
      await deleteAccount().unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  if (isSuccess) {
    navigate("/");
  }

  return (
    <section className="w-full max-w-4xl mx-auto p-4 lg:p-8 animate-in fade-in duration-500">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <SpinnerCustom className="size-10 text-primary" />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Header Section: Profile Header */}
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-b from-white/10 to-transparent p-px">
            <div className="bg-backgroundContrast/50 backdrop-blur-md rounded-[23px] p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <UserProfilePic className="relative size-28 md:size-32 border-2 border-white/20 shadow-2xl" />
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-blue-400 font-medium px-3 py-1 bg-blue-500/10 rounded-full inline-block text-sm uppercase tracking-widest">
                  {user?.accountType || "Member"}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Email Address", value: user?.email },
              { label: "Username", value: user?.username },
              { label: "Date of Birth", value: formattedDate },
              {
                label: "Account Status",
                value: "Active",
                color: "text-green-400",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all duration-300 h-auto w-full"
              >
                <p className="text-xs uppercase tracking-widest text-foreground/50 mb-1 ">
                  {item.label}
                </p>
                <p
                  className={`text-lg font-medium ${
                    item.color || "text-yellow-50/90"
                  } wrap-break-word`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="mt-4 p-6 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-white/70 mb-4 text-center">
              Account Management
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-3">
              {/* Admin can't edit their unique details */}
              {accountType !== "Admin" && (
                <Navlink to="/app/profile/update-profile">
                  <CommonButton
                    label="Edit Profile"
                    className="px-6 py-2.5 bg-white text-black hover:bg-white/90 transition-colors"
                  />
                </Navlink>
              )}
              <Navlink to="/app/profile/update-password">
                <CommonButton
                  label="Security"
                  className="px-6 py-2.5 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30"
                />
              </Navlink>
              <div className="basis-full h-0 hidden sm:block"></div>
              <Navlink to="/app/profile/update-email">
                <CommonButton
                  label="Change Email"
                  className="px-6 py-2.5 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700"
                />
              </Navlink>
              {/* Admin can't delete their account */}
              {accountType !== "Admin" && (
                <DeleteDialogueBox
                  label="Delete Account"
                  description={
                    accountType === "Instructor"
                      ? "Deleting this account will delete all your courses and associated information."
                      : "You will lose access to all your enrolled courses."
                  }
                  triggerClass="w-auto px-9 py-2.5 text-lg font-black sm:w-auto md:w-auto md:text-lg"
                  onClick={deleteUserAccount}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;
