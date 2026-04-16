import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login.page";
import DashboardPage from "./pages/Dashboard.page";
import UserContextProvider from "./context/User.context";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute.component";
import PublicRoute from "./components/PublicRoute.component";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login", element:
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
    },
    {
      path: "/dashboard", element:
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
    },
  ]);

  return (
    <UserContextProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;