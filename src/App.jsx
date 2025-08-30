import React, { useState, useEffect } from "react";
import { onUserStateChange } from "./firebase";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Home from "./components/Home/Home";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  useEffect(() => {
    const unsubscribe = onUserStateChange((u) => {
      setUser(u);
      if (u) setPage("home");
      else setPage("login");
    });
    return () => unsubscribe();
  }, []);

  if (user && page === "home") {
    return <Home user={user} onLogout={() => setPage("login")} />;
  }

  return (
    <div className="auth-wrapper">
      {page === "login" ? (
        <>
          <Login onLogin={() => setPage("home")} />
          <p>
            Don't have an account?{" "}
            <button onClick={() => setPage("register")}>Register</button>
          </p>
        </>
      ) : (
        <>
          <Register onRegister={() => setPage("home")} />
          <p>
            Already have an account?{" "}
            <button onClick={() => setPage("login")}>Login</button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
