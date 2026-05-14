import axios from "axios";

export const PostMessage = async (message) => {
  const res = await axios.post(
    process.env.REACT_APP_GROQ_BASE_URL,
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
      },
    }
  );

  return res.data;
};