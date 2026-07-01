import axiosInstance from "./axiosInstance";

/* ===========================
   Get Logged In User Profile
=========================== */

export const getProfileAPI = async () => {
  const res = await axiosInstance.get("/user/profile");
  return res.data;
};

/* ===========================
   Get Logged In User Info
=========================== */

export const getUserInfoAPI = async () => {
  const res = await axiosInstance.get("/user/getUserInfo");
  return res.data;
};

/* ===========================
   Get All Users (Admin)
=========================== */

export const getAllUsersAPI = async () => {
  const res = await axiosInstance.get("/user/getAllUsers");
  return res.data;
};

/* ===========================
   Update Profile
=========================== */

// export const updateProfileAPI = async (formData) => {
//   const res = await axiosInstance.put(
//     "/user/updateProfile",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return res.data;
// };

export const updateProfileAPI = async (formData) => {
  const res = await axiosInstance.put(
    "/user/updateProfile",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

// /* ===========================
//    Change Password
// =========================== */

// export const changePasswordAPI = async (payload) => {
//   const res = await axiosInstance.put(
//     "/user/changePassword",
//     payload
//   );

//   return res.data;
// };


export const changePasswordAPI = async (data) => {
  const res = await axiosInstance.put(
    "/user/changePassword",
    data
  );

  return res.data;
};


/* ===========================
   Delete User (Admin)
=========================== */

export const deleteUserAPI = async (id) => {
  const res = await axiosInstance.delete(
    `/user/deleteUser/${id}`
  );

  return res.data;
};