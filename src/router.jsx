import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout"; // #15-adjacent — checkout route


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
            },
            {
                path: "checkout", // #15-adjacent — checkout route
                element: <Checkout />
            }
        ]
    }
])

export default router