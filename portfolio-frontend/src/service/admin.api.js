import authClient from "../api/authClient";

export async function requestAdminOtp(payload) {
  const response = await authClient.post("/admin/request-otp", payload);
  return response.data.data;
}

export async function verifyAdminOtp(payload) {
  const response = await authClient.post("/admin/verify-otp", payload);
  return response.data.data;
}
