import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "products",
                element: <Products />
            }
        ]
    }
])

export default router