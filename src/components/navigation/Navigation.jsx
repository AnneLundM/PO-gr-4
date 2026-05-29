import "./Navigation.css";
import logo from "../../assets/backgrounds/logo.png";
import { Basket3 } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { useCart } from "../../hooks/useCart";

export default function Navigation() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
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
            Om
          </a>
          <a href="#contact" className="nav-link">
            Kontakt
          </a>
          <a href="#checkout" className="nav-link">
            Checkout
          </a>
        </nav>

        {/* Cart Icon */}
        <div className="header-buy">
          <button className="cart-btn" onClick={() => navigate("/checkout")} aria-label="Gå til kurv">
            <div className="cart-icon-wrapper">
              <Basket3 size={34} color="#5E9A13" />
              <span className="cart-badge">{cartCount}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
