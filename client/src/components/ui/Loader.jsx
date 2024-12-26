import React, { useEffect, useRef } from 'react';
import lottie from "lottie-web";
import animationData from "./loader.json";

// const Loader = () => {
//   return (
//     <div className="relative w-24 h-24">
//       <div
//         className="absolute box-border w-8 h-8 bg-primary-100 top-1/2 left-1/2"
//         style={{
//           animation: "up 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite",
//         }}
//       ></div>
//       <div
//         className="absolute box-border w-8 h-8 bg-white top-[calc(50%-2rem)] left-[calc(50%-2rem)]"
//         style={{
//           animation: "down 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite",
//         }}
//       ></div>
//     </div>
//   );
// };

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



  return <div ref={containerRef} style={{ width: '400px',height: '400px' ,overflow: "hidden"}} />;
};

export default Loader;
