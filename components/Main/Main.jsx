import React, { useEffect, useState } from 'react';
import Slider from './Slider';

export default function Main() {
  const [showSlider, setShowSlider] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Trigger fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Show slider after full transition (0.5s later)
    const slideTimer = setTimeout(() => {
      setShowSlider(true);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(slideTimer);
    };
  }, []);

  if (showSlider) {
    return <Slider />;
  }

  return (
    <section
      className={`bg-[#5274F6] min-h-screen flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <img src="https://nmtdevserver.com/welli/logo.png" className="w-[40%]" alt="Logo" />
    </section>
  );
}
