import { RouterView } from "vue-router"
import CargoShipping from "../views/CargoShipping.vue"
import ExpressManager from "../views/ExpressManager.vue"
import PriceManager from "../views/PriceManager.vue"
import ProductCost from "../views/ProductCost.vue"
import ProductSingle from "../views/ProductSingle.vue"

export const routes = [
    { path: "/", component: ProductSingle },
    {
        path: "/caculator",
        component: RouterView,
        children: [
            { path: "cost", component: ProductCost },
            { path: "single", component: ProductSingle },
            { path: "cargo", component: CargoShipping },
        ]
    },
    { path: "/price", component: PriceManager },
    { path: "/express", component: ExpressManager },
]