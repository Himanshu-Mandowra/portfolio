import authClient from "../api/authClient";

export const PostMessage = async (message) => {
 const res = await authClient.post(
  "/ai/chat",
  {
    message,
  }
);

  return res.data;
};