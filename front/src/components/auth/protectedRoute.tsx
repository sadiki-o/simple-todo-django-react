import AuthContext from "@/context/authContext";
import api from "@/lib/axios";
import { useContext, useEffect, useState } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const user = await api.get("/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("user: ", user.data);
        setUser(user.data);
      } catch (error) {
        console.error("Token invalid or expired", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return <div className="mt-10 text-center">Checking authentication...</div>;
  }

  return <>{children}</>;
}
