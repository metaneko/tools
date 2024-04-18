import CargoShipping from "../views/CargoShipping.vue"
import ProductCost from "../views/ProductCost.vue"
import ProductSingle from "../views/ProductSingle.vue"

export const routes = [
    { path: "/cost", component: ProductCost },
    { path: "/cargo", component: CargoShipping },
    { path: "/single", component: ProductSingle },
]