// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Auth/Auth.css";
// import logo from "../../assets/images/logo.png";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [showOtp, setShowOtp] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ SIGNUP + SEND OTP
//   const handleSignupSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     if (loading) return; // prevent double submit
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/users/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username: name, email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error || "Signup failed");
//         setLoading(false);
//         return;
//       }

//       alert("OTP sent to your email");
//       setShowOtp(true); // show OTP input only after successful signup
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ VERIFY OTP
//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (loading) return; // prevent double submit
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/users/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.error || "OTP verification failed");
//         setLoading(false);
//         return;
//       }

//       alert("Account verified successfully!");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <img src={logo} alt="TLD Atlas Logo" className="auth-logo" />

//         {!showOtp ? (
//           <>
//             <h2>Create your account</h2>
//             <form onSubmit={handleSignupSubmit}>
//               <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
//               <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//               <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
//               <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
//               <button type="submit" disabled={loading}>{loading ? "Sending OTP..." : "Send Verification Code"}</button>
//             </form>
//           </>
//         ) : (
//           <>
//             <h2>Verify your Email</h2>
//             <p>OTP sent to <strong>{email}</strong></p>
//             <form onSubmit={handleVerifyOtp}>
//               <input
//                 type="text"
//                 placeholder="Enter 6-digit OTP"
//                 maxLength={6}
//                 value={otp}
//                 onChange={e => setOtp(e.target.value)}
//                 required
//                 style={{ textAlign: "center", letterSpacing: "4px" }}
//               />
//               <button type="submit" disabled={loading}>{loading ? "Verifying..." : "Verify & Sign Up"}</button>
//             </form>
//           </>
//         )}

//         <p className="signup-link">
//           Already have an account? <span onClick={() => navigate("/login")}>Login</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth/Auth.css";
import logo from "../../assets/images/logo.png";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // SIGNUP + SEND OTP
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      toast.success("OTP sent to your email!");
      setShowOtp(true);
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "OTP verification failed");
        setLoading(false);
        return;
      }

      toast.success("Account verified successfully!");
      navigate("/login");
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

        {!showOtp ? (
          <>
            <h2>Create your account</h2>
            <form onSubmit={handleSignupSubmit}>
              <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
              <button type="submit" disabled={loading}>{loading ? "Sending OTP..." : "Send Verification Code"}</button>
            </form>
          </>
        ) : (
          <>
            <h2>Verify your Email</h2>
            <p>OTP sent to <strong>{email}</strong></p>
            <form onSubmit={handleVerifyOtp}>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
                style={{ textAlign: "center", letterSpacing: "4px" }}
              />
              <button type="submit" disabled={loading}>{loading ? "Verifying..." : "Verify & Sign Up"}</button>
            </form>
          </>
        )}

        <p className="signup-link">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
