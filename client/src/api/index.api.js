/* ----------------------------------------------------------------------------------------------
index.api.js
Exporting every single API call 
------------------------------------------------------------------------------------------------- */

import {
  useRegisterOtpMutation,
  useRegisterMutation,
  useLoginMutation,
  useLoginOtpMutation,
  useLogoutMutation,
  useNewTokenMutation,
} from "./auth/authApi";

export {
  useRegisterOtpMutation,
  useRegisterMutation,
  useLoginMutation,
  useLoginOtpMutation,
  useLogoutMutation,
  useNewTokenMutation,
};
