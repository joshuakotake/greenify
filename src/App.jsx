import { BrowserRouter as Router } from "react-router";
import { AuthProvider } from "./hooks/useAuth";

import "./index.css";
import Pages from "./Pages.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Pages />
      </Router>
    </AuthProvider>
  );
}

export default App;
