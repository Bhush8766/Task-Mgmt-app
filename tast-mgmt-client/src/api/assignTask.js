import axiosInstance from "./axiosInstance";

export const assignTaskToUserAPI = async (payload) => {
  const res = await axiosInstance.post(
    "/assign/assign-task",
    payload
  );

  return res.data;
};