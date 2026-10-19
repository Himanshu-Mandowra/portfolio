import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestAdminOtp, verifyAdminOtp } from "../service/admin.api";
import { saveAdminSession } from "../utils/adminSession";
import { UmbrellaOctagonSVG } from "./RequiemLoader";
import { soundEngine } from "../utils/soundEngine";

function AdminLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState("credentials");
  const [form, setForm] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [requestId, setRequestId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    soundEngine.playTypewriter();
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleRequestOtp = async (event) => {
    event.preventDefault();
    soundEngine.playClick();
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      const data = await requestAdminOtp({
        email: form.email,
        password: form.password,
      });

      setRequestId(data.requestId);
      setDevOtp(data.devOtp || "");
      setMessage(data.message || "ENCRYPTED OTP TRANSMITTED TO OPERATIVE EMAIL.");
      setStep("otp");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "ACCESS DENIED // Unable to transmit OTP right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    soundEngine.playClick();
    setIsSubmitting(true);
    setError("");

    try {
      const data = await verifyAdminOtp({
        email: form.email,
        requestId,
        otp: form.otp,
      });

      saveAdminSession(data.token, data.expiresAt);
      navigate("/admin/projects", { replace: true });
    } catch (verifyError) {
      setError(
        verifyError.response?.data?.message ||
          "BIOMETRIC OTP VERIFICATION FAILED."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#050508] px-4 py-10 text-[#ece7df] sm:px-6">
      <div className="re-lattice-overlay pointer-events-none fixed inset-0 opacity-50" />
      <div className="re-vignette pointer-events-none fixed inset-0" />

      <div className="re-clip-card relative z-10 w-full max-w-xl border border-red-700/60 bg-[#09090e]/95 p-7 shadow-[0_0_90px_rgba(220,38,38,0.22)] sm:p-9">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-red-900/40 pb-5">
          <div className="flex items-center gap-3.5">
            <UmbrellaOctagonSVG className="h-12 w-12 shrink-0" spin />
            <div>
              <div className="font-mono-tech text-xs uppercase tracking-[0.24em] text-red-500">
                UMBRELLA CORPORATION // BIO-TERMINAL
              </div>
              <h1 className="mt-1 font-requiem text-2xl font-bold uppercase tracking-[0.1em] text-white sm:text-3xl">
                {step === "credentials"
                  ? "RESTRICTED ACCESS"
                  : "VERIFY CLEARANCE CODE"}
              </h1>
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono-tech text-xs uppercase leading-6 tracking-[0.15em] text-stone-400">
          AUTHORIZED PERSONNEL ONLY. AUTHENTICATE VIA MASTER CREDENTIALS AND
          SECONDARY OTP VERIFICATION TO MODIFY ARCHIVE CASE FILES.
        </p>

        {step === "credentials" ? (
          <form className="mt-6 grid gap-4" onSubmit={handleRequestOtp}>
            <div>
              <label
                className="block font-mono-tech text-xs uppercase tracking-[0.2em] text-stone-300"
                htmlFor="email"
              >
                OPERATIVE EMAIL ID
              </label>
              <input
                className="mt-1.5 w-full border border-white/15 bg-black/80 px-4 py-3 font-mono-tech text-sm text-[#ece7df] outline-none transition placeholder:text-stone-600 focus:border-red-500"
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="operative@umbrella-corp.com"
                required
              />
            </div>

            <div>
              <label
                className="block font-mono-tech text-xs uppercase tracking-[0.2em] text-stone-300"
                htmlFor="password"
              >
                SECURITY PASSKEY
              </label>
              <input
                className="mt-1.5 w-full border border-white/15 bg-black/80 px-4 py-3 font-mono-tech text-sm text-[#ece7df] outline-none transition placeholder:text-stone-600 focus:border-red-500"
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                required
              />
            </div>

            <button
              className="re-clip-btn mt-2 inline-flex items-center justify-center border border-red-500 bg-red-600 px-5 py-3.5 font-mono-tech text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "TRANSMITTING..."
                : "REQUEST SECURITY OTP [STAGE 1]"}
            </button>
          </form>
        ) : (
          <form className="mt-6 grid gap-4" onSubmit={handleVerifyOtp}>
            <div>
              <label
                className="block font-mono-tech text-xs uppercase tracking-[0.2em] text-stone-300"
                htmlFor="otp"
              >
                6-DIGIT TRANSMISSION CODE (OTP)
              </label>
              <input
                className="mt-1.5 w-full border border-red-500/60 bg-black/80 px-4 py-3 text-center font-mono-tech text-xl tracking-[0.4em] text-white outline-none transition focus:border-red-500"
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={form.otp}
                onChange={handleChange}
                placeholder="000000"
                required
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                className="re-clip-btn flex-1 border border-red-500 bg-red-600 px-5 py-3.5 font-mono-tech text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "DECRYPTING..." : "VERIFY & UNLOCK MAINFRAME"}
              </button>
              <button
                type="button"
                onClick={() => setStep("credentials")}
                className="re-clip-btn border border-white/20 bg-white/5 px-4 py-3.5 font-mono-tech text-xs uppercase tracking-[0.18em] text-stone-300 hover:text-white"
              >
                BACK
              </button>
            </div>
          </form>
        )}

        {message && (
          <div className="mt-4 border border-emerald-500/40 bg-emerald-950/30 px-4 py-3 font-mono-tech text-xs tracking-wider text-emerald-300">
            [SYSTEM]: {message}
          </div>
        )}
        {error && (
          <div className="mt-4 border border-red-500/50 bg-red-950/40 px-4 py-3 font-mono-tech text-xs tracking-wider text-red-300">
            [ALERT]: {error}
          </div>
        )}
        {devOtp && (
          <div className="mt-4 border border-amber-500/40 bg-amber-950/30 px-4 py-3 font-mono-tech text-xs tracking-wider text-amber-200">
            DEV CLEARANCE OTP FALLBACK:{" "}
            <strong className="text-sm text-white">{devOtp}</strong>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono-tech text-xs uppercase tracking-[0.18em]">
          <Link
            className="inline-flex items-center gap-2 text-red-400 transition hover:text-red-300"
            to="/"
            onClick={() => soundEngine.playClick()}
          >
            <span>← EXIT TO PUBLIC PORTFOLIO SECTOR</span>
          </Link>
          <span className="text-stone-600">UMBRELLA OS v4.2</span>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
