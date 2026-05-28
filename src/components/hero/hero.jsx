import { useState, useEffect } from "react";
import "./hero.css";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides = [
    "/src/assets/headerslider/01.jpg",
    "/src/assets/headerslider/02.jpg",
    "/src/assets/headerslider/03.jpg",
    "/src/assets/headerslider/04.jpg",
  ];

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500); // 4.5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(true);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(true);
  };

  return (
    <section className="hero-section">
      <div className="hero-slider-wrapper">
        {/* Slider Image */}
        <img
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="hero-slider-image"
        />

        {/* Text Overlay */}
        <div className="hero-overlay">
          <h1 className="hero-title">Gowala Farms</h1>
          <p className="hero-subtitle">The Complete Milk</p>
          <button className="hero-cta-btn">Lets visit</button>
        </div>
      </div>
    </section>
  );
}
