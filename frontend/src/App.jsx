
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import LoginPage from "./pages/Login.page";
import { Toaster } from 'react-hot-toast';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage/>
    }
  ])


  return (
    <>
    <Toaster/>
    <RouterProvider router={router}/>
    </>
    
  )
}

export default App
