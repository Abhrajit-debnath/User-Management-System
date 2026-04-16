import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login.page";
import DashboardPage from "./pages/Dashboard.page";
import UserContextProvider from "./context/User.context";
import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    { path: "/dashboard", element: <DashboardPage /> },
  ]);

  return (
    <UserContextProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;