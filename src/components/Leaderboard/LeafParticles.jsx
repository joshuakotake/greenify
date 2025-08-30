import { useMemo } from "react";
import "./LeafParticles.css";

const NUM_LEAVES = 12;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

const LeafParticles = () => {
  // Generate leaf properties only once using useMemo
  const leafProperties = useMemo(() => {
    return Array.from({ length: NUM_LEAVES }).map((_, i) => ({
      id: i,
      left: random(0, 100),
      animationDuration: random(8, 16),
      animationDelay: random(0, 8),
      scale: random(0.5, 1.2),
      rotation: random(0, 360),
    }));
  }, []);

  return (
    <div className="leaf-particles">
      {leafProperties.map((leaf) => (
        <svg
          key={leaf.id}
          className="leaf"
          style={{
            left: `${leaf.left}vw`,
            animationDuration: `${leaf.animationDuration}s`,
            animationDelay: `${leaf.animationDelay}s`,
            transform: `scale(${leaf.scale}) rotate(${leaf.rotation}deg)`,
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
