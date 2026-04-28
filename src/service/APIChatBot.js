import axios from "axios";

export const PostMessage = async (message) => {
  const res = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
    {
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": process.env.REACT_APP_GEMINI_API_KEY,
      },
    }
  );

  return res;
};