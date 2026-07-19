import authClient from "../api/authClient";

export const getSummary = async () => {
  try {
    const res = await authClient.get("/resume/get/summary");
    return res.data;
  } catch (error) {
    return null;

  }
};
