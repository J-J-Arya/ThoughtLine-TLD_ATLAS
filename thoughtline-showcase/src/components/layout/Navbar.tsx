import "./Navbar.css";
import logo from "../../assets/images/project-logo-cropped.png";

interface NavbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
}

const Navbar = ({ search = "", onSearchChange }: NavbarProps) => {
  return (
    <nav className="navbar">
      {/* LOGO */}
      <img
        src={logo}
        alt="TLD Atlas"
        className="navbar-logo"
      />

      {/* SEARCH */}
      {onSearchChange && (
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      )}
    </nav>
  );
};

export default Navbar;
