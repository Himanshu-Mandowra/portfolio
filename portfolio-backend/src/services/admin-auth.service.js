import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "./email.service.js";

const otpStore = new Map();
const OTP_EXPIRY_MS = 10 * 60 * 1000;
const SESSION_EXPIRY = "2h";

function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "himanshu.mandowra1234@gmail.com",
    password: process.env.ADMIN_PASSWORD || "Admin@12345"
  };
}

export function validateAdminCredentials(email, password) {
  const admin = getAdminCredentials();
  return email === admin.email && password === admin.password;
}

export async function createOtpRequest(email) {
  const requestId = crypto.randomUUID();
  const otp = String(Math.floor(100000 + Math.random() * 900000));

  otpStore.set(requestId, {
    email,
    otp,
    expiresAt: Date.now() + OTP_EXPIRY_MS
  });

  const emailResult = await sendOtpEmail({ email, otp });

  return {
    requestId,
    emailResult,
    devOtp: emailResult.sent ? undefined : otp
  };
}

export function verifyOtpRequest({ email, requestId, otp }) {
  const record = otpStore.get(requestId);

  if (!record) {
    return { success: false, message: "OTP request not found." };
  }

  if (record.email !== email) {
    return { success: false, message: "OTP email does not match this request." };
  }

  if (record.expiresAt < Date.now()) {
    otpStore.delete(requestId);
    return { success: false, message: "OTP has expired. Please request a new one." };
  }

  if (record.otp !== otp) {
    return { success: false, message: "Incorrect OTP." };
  }

  otpStore.delete(requestId);
  return { success: true };
}

export function createAdminToken(email) {
  const secret = process.env.ADMIN_JWT_SECRET || "portfolio-admin-secret";
  return jwt.sign({ email, role: "admin" }, secret, { expiresIn: SESSION_EXPIRY });
}

export function verifyAdminToken(token) {
  const secret = process.env.ADMIN_JWT_SECRET || "portfolio-admin-secret";
  return jwt.verify(token, secret);
}
