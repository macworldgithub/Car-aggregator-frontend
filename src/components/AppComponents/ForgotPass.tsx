"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Success State */}
          {isSubmitted ? (
            <div className="text-center py-10">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Check Your Email
              </h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                We've sent a password reset link to
              </p>
              <p className="text-indigo-900 font-bold text-lg">{email}</p>
              <p className="text-sm text-gray-500 mt-6">
                The link will expire in 30 minutes.
              </p>

              <Link
                href="/signin"
                className="mt-8 inline-block bg-indigo-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-800 transition"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                  Forgot Password?
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  No worries! Just enter your email and we'll send you a reset
                  link.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent transition disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-indigo-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-indigo-800 active:scale-98 transition transform shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              {/* Help Text */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link
                    href="/signin"
                    className="font-bold text-indigo-900 hover:text-indigo-700"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
