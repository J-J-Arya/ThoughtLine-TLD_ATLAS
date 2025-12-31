import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";
import projectlogo from "../../assets/images/project-logo.png";
import companyLogo from "../../assets/images/company-logo.png";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      {/* Center logo */}
      <img
        src={projectlogo}
        alt="Project Logo"
        className="center-logo animate-center"
      />

      {/* Loading button */}
      <div className="spinner"></div>


      {/* Bottom-right logo */}
      <img
        src={companyLogo}
        alt="Company Logo Small"
        className="companyLogo"
      />

    </div>
  );
};

export default Splash;
