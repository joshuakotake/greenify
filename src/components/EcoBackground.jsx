const EcoBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Back layer - darkest hills */}
      <div className="absolute bottom-0 w-full">
        <svg
          viewBox="0 0 1200 400"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          {/* Background hills */}
          <path
            d="M0,400 C300,200 600,250 900,150 C1000,120 1100,140 1200,120 L1200,400 Z"
            fill="#065f46"
            opacity="0.3"
          />

          {/* Middle layer hills */}
          <path
            d="M0,400 C200,300 400,280 600,220 C800,160 1000,200 1200,180 L1200,400 Z"
            fill="#047857"
            opacity="0.4"
          />

          {/* Front layer hills */}
          <path
            d="M0,400 C150,350 300,320 500,280 C700,240 900,260 1200,240 L1200,400 Z"
            fill="#059669"
            opacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default EcoBackground;
