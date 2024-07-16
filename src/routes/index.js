import Search from "~/pages/Search";
import Home from "~/pages/Home";
import Product from "~/pages/Product";
import Watch from "~/pages/Watch";
import Filter from "~/pages/Filter";
import Favorite from "~/pages/Favorite";

const publicRoutes = [
    {path: "/", component: Home},
    {path: "/product", component: Product},
    {path: "/search/:query", component: Search},
    {path: "/watch/:movieSlug", component: Watch},
    {path: "/filter", component: Filter},
    {path: "favorite", component: Favorite}
]

const privateRoutes = []

export { publicRoutes, privateRoutes }