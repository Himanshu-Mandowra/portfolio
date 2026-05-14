import axios from "axios";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      process.env.GROQ_BASE_URL,
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
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    return res.status(200).json({
      success: true,
      reply:
        response.data.choices[0].message.content,
    });
  } catch (error) {
    console.log(error.response?.data || error);

    return res.status(500).json({
      success: false,
      message: "AI request failed",
    });
  }
};