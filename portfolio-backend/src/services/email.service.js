import axios from "axios";

export async function sendOtpEmail({ email, otp }) {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return {
      sent: false,
      reason: "Email service is not configured."
    };
  }

  try {
    await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          email,
          passcode: otp,
          otp,
          message: `Your portfolio admin OTP is ${otp}. It will expire in 10 minutes.`
        }
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return { sent: true };
  } catch (error) {
    console.error("OTP email failed:", error.response?.data || error.message);
    return {
      sent: false,
      reason: "OTP email could not be delivered."
    };
  }
}
