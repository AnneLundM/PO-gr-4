import "./Navigation.css";
import logo from "../../assets/backgrounds/logo.png";

export default function Navigation() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <a
            href="/"
            className="logo-link"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img src={logo} alt="Gowala Logo" className="logo-image" />
          </a>
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

        {/* Cart Icon */}
        <div className="header-user">
          <button className="user-icon-btn" aria-label="Cart">
            🛒
          </button>
        </div>
      </div>
    </header>
  );
}
