import React, { useEffect, useRef } from 'react';
import lottie from "lottie-web";
import animationData from "./loader.json";

const Loader = ({  loop = true, autoplay = true }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    // Initialize the Lottie animation
    const animation = lottie.loadAnimation({
      container: containerRef.current, // Reference to the container element
      renderer: 'svg', // Render as SVG
      loop: loop, // Loop animation
      autoplay: autoplay, // Autoplay animation
      animationData: animationData, // Animation data (JSON)
    });
    
    animation.addEventListener('DOMLoaded', () => {
      const svgElement = containerRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.style.scale = 2; // Add stroke
      }
    });

    // Clean up on component unmount
    return () => {
      animation.destroy();
    };
  }, [ loop, autoplay]);



  return <div ref={containerRef} style={{ width: '300px',height: '300px' ,overflow: "visible"}} />;
};

export default Loader;
