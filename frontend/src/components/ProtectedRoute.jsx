import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return children;
}
