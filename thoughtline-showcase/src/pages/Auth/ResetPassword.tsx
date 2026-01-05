// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Auth/Auth.css";
// import logo from "../../assets/images/logo.png";

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     console.log("Password reset successful");

//     // Later: backend reset logic
//     navigate("/login");
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <img src={logo} alt="TLD Atlas Logo" className="auth-logo" />
//         <h2>Reset Password</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="password"
//             placeholder="New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />

//           <button type="submit">Reset Password</button>
//         </form>

//         <p className="signup-link">
//           Back to{" "}
//           <span onClick={() => navigate("/login")}>Login</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

// import { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import "../Auth/Auth.css";
// import logo from "../../assets/images/logo.png";

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const token = searchParams.get("token");

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!token) {
//       setError("Invalid or missing reset token");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setMessage("");

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/users/reset-password",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             token,
//             newPassword:password,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Password reset failed");
//       }

//       setMessage("Password reset successful. Redirecting to login...");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <img src={logo} alt="TLD Atlas Logo" className="auth-logo" />
//         <h2>Reset Password</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="password"
//             placeholder="New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>
//         </form>

//         {message && <p style={{ color: "lightgreen" }}>{message}</p>}
//         {error && <p style={{ color: "salmon" }}>{error}</p>}

//         <p className="signup-link">
//           Back to{" "}
//           <span onClick={() => navigate("/login")}>Login</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;








import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../Auth/Auth.css";
import logo from "../../assets/images/logo.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token"); // get token from URL

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if token exists
    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password, // ✅ corrected field to match backend
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Password reset failed");
      }

      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="TLD Atlas Logo" className="auth-logo" />
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && <p style={{ color: "lightgreen" }}>{message}</p>}
        {error && <p style={{ color: "salmon" }}>{error}</p>}

        <p className="signup-link">
          Back to{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
