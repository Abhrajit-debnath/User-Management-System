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
          <UserContextProvider>
            <DashboardPage />
          </UserContextProvider>
        </ProtectedRoute>

    },
  ]);


  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>






  );

}

export default App;