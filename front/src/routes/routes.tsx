import { createBrowserRouter, Navigate } from "react-router";
import App from "@/App";
import { SignupForm } from "@/components/forms/signup-form";
import LandingPage from "@/components/landing-page";
import { RedirectIfAuthenticated } from "@/components/auth/RedirectIfAuthenticated";
import { ProtectedRoute } from "@/components/auth/protectedRoute";
import TodosPage from "@/components/todos";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    element: (
      <RedirectIfAuthenticated>
        <App />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/signup",
    element: (
      <RedirectIfAuthenticated>
        <SignupForm />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/todos",
    element: (
      <ProtectedRoute>
        <TodosPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/todos" />,
  },
]);

export default router;
