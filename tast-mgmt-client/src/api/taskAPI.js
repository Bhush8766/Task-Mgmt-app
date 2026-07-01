import axiosInstance from "./axiosInstance";

export const createTASK = async (payload) => {
  const res = await axiosInstance.post("/task/create", payload);
  return res.data;
};

export const getAllTASKS = async () => {
  const res = await axiosInstance.get("/task/getAll");
  return res.data;
};

export const deleteTASK = async (id) => {
  const res = await axiosInstance.delete(`/task/delete/${id}`);
  return res.data;
};

export const getTasksByUSer = async () => {
  const res = await axiosInstance.get("/assign/get-tasks-by-user");
  return res.data;
};


export const updateTaskStatus = async (taskID, status) => {
  const res = await axiosInstance.patch(
    `/task/update-status/${taskID}`,
    { status }
  );

  return res.data;
};