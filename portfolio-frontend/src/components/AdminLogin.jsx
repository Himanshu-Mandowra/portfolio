import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestAdminOtp, verifyAdminOtp } from "../service/admin.api";
import { saveAdminSession } from "../utils/adminSession";

function AdminLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState("credentials");
  const [form, setForm] = useState({
    email: "",
    password: "",
    otp: ""
  });
  const [requestId, setRequestId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleRequestOtp = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      const data = await requestAdminOtp({
        email: form.email,
        password: form.password
      });

      setRequestId(data.requestId);
      setDevOtp(data.devOtp || "");
      setMessage(data.message || "OTP sent to your email.");
      setStep("otp");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to send OTP right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const data = await verifyAdminOtp({
        email: form.email,
        requestId,
        otp: form.otp
      });

      saveAdminSession(data.token, data.expiresAt);
      navigate("/admin/projects", { replace: true });
    } catch (verifyError) {
      setError(
        verifyError.response?.data?.message || "OTP verification failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6">
      <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-neutral-900/90 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-400/10 px-4 py-2 text-sm uppercase tracking-[0.05em] text-amber-400">
          Admin
        </div>
        <h1 className="mt-4 font-['Arsenal_SC'] text-4xl leading-tight text-[#f6f1e8]">
          {step === "credentials" ? "Secure Sign In" : "Verify OTP"}
        </h1>
        <p className="mt-4 leading-7 text-stone-400">
          Manage project cards with a simple protected flow using your password
          and email OTP.
        </p>

        {step === "credentials" ? (
          <form className="mt-6 grid gap-3" onSubmit={handleRequestOtp}>
            <label className="text-sm text-stone-300" htmlFor="email">Admin email</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#f6f1e8] outline-none transition placeholder:text-stone-500 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            <label className="text-sm text-stone-300" htmlFor="password">Password</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#f6f1e8] outline-none transition placeholder:text-stone-500 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
            />

            <button
              className="mt-2 inline-flex items-center justify-center rounded-2xl border border-amber-400 bg-amber-400 px-4 py-3 font-semibold text-neutral-950 transition hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form className="mt-6 grid gap-3" onSubmit={handleVerifyOtp}>
            <label className="text-sm text-stone-300" htmlFor="otp">Email OTP</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[#f6f1e8] outline-none transition placeholder:text-stone-500 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20"
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={form.otp}
              onChange={handleChange}
              placeholder="6 digit code"
              required
            />

            <button
              className="mt-2 inline-flex items-center justify-center rounded-2xl border border-amber-400 bg-amber-400 px-4 py-3 font-semibold text-neutral-950 transition hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify and continue"}
            </button>
          </form>
        )}

        {message ? (
          <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            {message}
          </div>
        ) : null}
        {error ? (
          <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}
        {devOtp ? (
          <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            Dev OTP fallback: <strong>{devOtp}</strong>
          </div>
        ) : null}

        <Link className="mt-5 inline-flex text-sm font-medium text-amber-400 transition hover:text-amber-300" to="/">
          Back to portfolio
        </Link>
      </div>
    </div>
  );
}

export default AdminLogin;
