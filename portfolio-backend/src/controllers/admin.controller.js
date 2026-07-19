import {
  createAdminToken,
  createOtpRequest,
  validateAdminCredentials,
  verifyOtpRequest
} from "../services/admin-auth.service.js";

export async function requestOtp(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required."
    });
  }

  if (!validateAdminCredentials(email, password)) {
    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials."
    });
  }

  const { requestId, emailResult, devOtp } = await createOtpRequest(email);

  return res.status(200).json({
    success: true,
    data: {
      requestId,
      devOtp,
      message: emailResult.sent
        ? "OTP sent to your email."
        : "OTP generated. Configure EmailJS on the backend to deliver it by email."
    }
  });
}

export async function verifyOtp(req, res) {
  const { email, requestId, otp } = req.body;

  if (!email || !requestId || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email, requestId, and OTP are required."
    });
  }

  const verification = verifyOtpRequest({ email, requestId, otp });

  if (!verification.success) {
    return res.status(401).json({
      success: false,
      message: verification.message
    });
  }

  const token = createAdminToken(email);
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

  return res.status(200).json({
    success: true,
    data: {
      token,
      expiresAt,
      message: "Admin verified successfully."
    }
  });
}
