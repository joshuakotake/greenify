import React, { useEffect } from "react";
import "./LeafParticles.css";

const NUM_LEAVES = 12;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

const LeafParticles = () => {
  useEffect(() => {
    // Optionally, you could randomize animation delays here if needed
  }, []);

  return (
    <div className="leaf-particles">
      {Array.from({ length: NUM_LEAVES }).map((_, i) => (
        <svg
          key={i}
          className="leaf"
          style={{
            left: `${random(0, 100)}vw`,
            animationDuration: `${random(8, 16)}s`,
            animationDelay: `${random(0, 8)}s`,
            transform: `scale(${random(0.5, 1.2)}) rotate(${random(0, 360)}deg)`,
          }}
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M16 2C10 10 2 18 16 30C30 18 22 10 16 2Z"
            fill="#22c55e"
            stroke="#16a34a"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
};

export default LeafParticles;