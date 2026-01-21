// // components/SignInForm.tsx  (ya app/signin/page.tsx mein daal do)

// import Link from "next/link";
// import { Mail, Lock } from "lucide-react";

// export default function SignInForm() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
//       <div className="max-w-md w-full">
//         {/* Logo or Title */}
//         <div className="text-center mb-10">
//           <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
//             Welcome Back
//           </h2>
//           <p className="mt-3 text-lg text-gray-600">
//             Sign in to access your watchlist and alerts
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
//           <form className="space-y-6">
//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="email"
//                   required
//                   placeholder=""
//                   className="w-full pl-12 pr-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent transition"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="password"
//                   required
//                   placeholder=""
//                   className="w-full pl-12 pr-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent transition"
//                 />
//               </div>
//             </div>

//             {/* Remember + Forgot */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="w-5 h-5 text-indigo-900 rounded focus:ring-indigo-900"
//                 />
//                 <span className="text-sm text-gray-600">Remember me</span>
//               </label>
//               <Link
//                 href="/forgotPassword"
//                 className="text-sm font-medium text-indigo-900 hover:text-indigo-700"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             {/* Sign In Button */}
//             <button
//               type="submit"
//               className="w-full bg-indigo-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-indigo-800 active:scale-98 transition transform shadow-lg"
//             >
//               Sign In
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="mt-8 flex items-center gap-4">
//             <div className="flex-1 h-px bg-gray-300"></div>
//             <span className="text-sm text-gray-500">or</span>
//             <div className="flex-1 h-px bg-gray-300"></div>
//           </div>

//           {/* Google Sign In */}
//           <button className="mt-6 w-full border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:border-indigo-900 hover:bg-indigo-50 transition flex items-center justify-center gap-3">
//             <svg className="w-5 h-5" viewBox="0 0 24 24">
//               <path
//                 fill="#4285F4"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="#34A853"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="#FBBC05"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="#EA4335"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Continue with Google
//           </button>

//           {/* Sign Up Link */}
//           <p className="mt-8 text-center text-sm text-gray-600">
//             Don't have an account?{" "}
//             <Link
//               href="/signup"
//               className="font-bold text-indigo-900 hover:text-indigo-700"
//             >
//               Sign up free
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

export default function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Auto-clear messages after 6 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://aggregator.omnisuiteai.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        const errMsg =
          data.message ||
          data.error ||
          data.detail ||
          "Invalid email or password. Please try again.";
        throw new Error(errMsg);
      }

      
      const token =
        data.token || data.access_token || data.accessToken || data.jwt;

      if (!token) {
        throw new Error("No authentication token received from server");
      }

      localStorage.setItem("authToken", token); 

      setSuccess("Logged in successfully! Redirecting to home...");

      // Clear form
      setEmail("");
      setPassword("");

      // Redirect to home page after short delay so user sees success message
      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Sign in to access your watchlist and alerts
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  disabled={loading}
                  className="w-full pl-12 pr-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent transition disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={loading}
                  className="w-full pl-12 pr-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-transparent transition disabled:opacity-60"
                />
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-indigo-900 rounded focus:ring-indigo-900"
                  disabled={loading}
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgotPassword"
                className="text-sm font-medium text-indigo-900 hover:text-indigo-700"
              >
                Forgot password?
              </Link>
            </div>

            {/* Feedback */}
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full 
                bg-indigo-900 
                text-white 
                font-bold 
                text-lg 
                py-4 
                rounded-xl 
                transition 
                transform 
                shadow-lg
                ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-indigo-800 active:scale-[0.98]"}
              `}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            disabled={loading}
            className={`
              mt-6 w-full border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl transition flex items-center justify-center gap-3
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:border-indigo-900 hover:bg-indigo-50"}
            `}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-indigo-900 hover:text-indigo-700"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
