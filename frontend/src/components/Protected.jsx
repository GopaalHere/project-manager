import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Protected({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3200/api/auth/me", { withCredentials: true })
      .then(res => setAuthenticated(true))
      .catch(err => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/login" replace />;
  return children;
}
