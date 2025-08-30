// src/dev/StandalonePlannerApp.jsx
import React from "react";
import Planner from "../components/Planner/Planner";
import "../components/Planner/Planner.css";

export default function StandalonePlannerApp() {
  return (
    <div style={{minHeight:"100vh", background:"#f7f8f9"}}>
      <header style={{
        position:"sticky", top:0, display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"16px 20px", background:"#fff", borderBottom:"1px solid #e5e7eb"
      }}>
        <div style={{fontWeight:800, color:"#1f9d53"}}>🌿 <span>Greenify</span></div>
        <div style={{opacity:.65}}>Auth bypass (dev)</div>
      </header>
      <main style={{maxWidth:1100, margin:"0 auto", padding:"24px 20px"}}>
        <Planner />
      </main>
    </div>
  );
}
