import { Navigate } from "react-router";

export function RedirectIfAuthenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  return localStorage.getItem("access_token") ? (
    <Navigate to="/todos" replace />
  ) : (
    <>{children}</>
  );
}
