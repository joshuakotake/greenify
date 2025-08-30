import React from "react";
import { logout } from "../../firebase";

export default function Home({ user, onLogout }) {
  return (
    <div className="home-container">
      <h2>Welcome, {user?.email || "User"}!</h2>
      <button
        onClick={async () => {
          await logout();
          onLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
}
