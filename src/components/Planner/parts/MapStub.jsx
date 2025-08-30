import React from "react";

export function MapStub({ polyline }) {
  return (
    <div className="map">
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <rect x="0" y="0" width="100" height="100" fill="#eef2f6" />
        <g stroke="#d1e3d4" fill="none">
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={i * 18} y={(i * 13) % 90} width="14" height="14" />
          ))}
        </g>
        <polyline
          points={polyline.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none" stroke="#2563eb" strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round"
        />
        {polyline.length > 0 && (
          <>
            <circle cx={polyline[0].x} cy={polyline[0].y} r="3.8" fill="#16a34a" />
            <circle cx={polyline[polyline.length - 1].x} cy={polyline[polyline.length - 1].y} r="3.8" fill="#ef4444" />
          </>
        )}
      </svg>
    </div>
  );
}
