// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Auth/Auth.css";
// import logo from "../../assets/images/logo.png";
// import { toast } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (loading) return;
//     setLoading(true);

//     // ✅ Frontend-only simulation
//     setTimeout(() => {
//       toast.success("Login successful!");
//       navigate("/home");
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <img src={logo} alt="TLD Atlas Logo" className="auth-logo" />
//         <h2>Login to TLD Atlas</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           {/* 🔴 Forgot Password */}
//           <div className="forgot-password">
//             <span onClick={() => navigate("/forgot-password")}>
//               Forgot Password?
//             </span>
//           </div>
//         </form>

//         <p className="signup-link">
//           Don't have an account?{" "}
//           <span onClick={() => navigate("/signup")}>Sign Up</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth/Auth.css";
import logo from "../../assets/images/logo.png";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        setLoading(false);
        return;
      }

      toast.success("Login successful!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="TLD Atlas Logo" className="auth-logo" />
        <h2>Login to TLD Atlas</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="forgot-password">
            <span onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </span>
          </div>

        </form>

        <p className="signup-link">
          Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
