import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Home from "./pages/Home/index.tsx";
import About from "./pages/About/index.tsx";
import Login from "./pages/Login/index.tsx";
import "@douyinfe/semi-ui/dist/css/semi.min.css";
import NewHTMLResume from "./pages/New/index.tsx";
import "./useWorker";
import NewMarkdown from "./pages/newMarkdown/index.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "newhtml",
    element: <NewHTMLResume />,
  },
  {
    path: "newmarkdown",
    element: <NewMarkdown />,
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
