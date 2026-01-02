// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Auth/Auth.css";
// import logo from "../../assets/images/logo.png";

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log("Reset link sent to:", email);

//     // Later: backend email logic
//     navigate("/reset-password");
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <img src={logo} alt="TLD Atlas Logo" className="auth-logo" />
//         <h2>Forgot Password</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <button type="submit">Send Reset Link</button>
//         </form>

//         <p className="signup-link">
//           Back to{" "}
//           <span onClick={() => navigate("/login")}>Login</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth/Auth.css";
import logo from "../../assets/images/logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage("Password reset link sent to your email.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="TLD Atlas Logo" className="auth-logo" />
        <h2>Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
