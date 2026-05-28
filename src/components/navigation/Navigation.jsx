import "./Navigation.css";
import logo from "../../assets/backgrounds/logo.png";

export default function Navigation() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <img src={logo} alt="Gowala Logo" className="logo-image" />
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <a href="#shop" className="nav-link">
            Shop
          </a>
          <a href="#services" className="nav-link">
            Services
          </a>
          <a href="#our" className="nav-link">
            Our
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
          <a href="#checkout" className="nav-link">
            Checkout
          </a>
        </nav>

        {/* User Icon */}
        <div className="header-buy">
          <button className="user-icon-btn"></button>
        </div>
      </div>
    </header>
  );
}
