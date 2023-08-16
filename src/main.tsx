import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Home from "./pages/Home/index.tsx";
import About from "./pages/About/index.tsx";
import Login from "./pages/Login/index.tsx";
import "@douyinfe/semi-ui/dist/css/semi.min.css";
import "./useWorker";
import { AuthProvider, RequireAuth } from "./auth/index.tsx";
import NewHTMLResume from "./pages/Resume/index.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    // loader: rootLoader,
    children: [
      {
        path: "workspace",
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: "about",
        element: (
          <RequireAuth>
            <About />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "resume/:id",
    element: (
      <AuthProvider>
        <RequireAuth>
          <NewHTMLResume />
        </RequireAuth>
      </AuthProvider>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
