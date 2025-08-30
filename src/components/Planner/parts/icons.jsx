import React from "react";

export function IconMapPin(props){
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10Z"/>
      <circle cx="12" cy="11" r="2.5"/>
    </svg>
  );
}
export function IconBuilding(props){
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="13" height="18" rx="1" />
      <path d="M16 8h5v13H8" />
      <path d="M7 7h2M7 11h2M7 15h2" />
    </svg>
  );
}
