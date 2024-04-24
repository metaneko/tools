import { RouterView } from "vue-router"
import CargoShipping from "../views/CargoShipping.vue"
import ExpressManager from "../views/ExpressManager.vue"
import PriceManager from "../views/PriceManager.vue"
import ProductCost from "../views/ProductCost.vue"
import ProductOld from "../views/ProductOld.vue"

export const routes = [
    { path: "/", component: ProductOld },
    {
        path: "/caculator",
        component: RouterView,
        children: [
            { path: "cost", component: ProductCost },
            { path: "single", component: ProductOld },
            { path: "cargo", component: CargoShipping },
        ]
    },
    { path: "/price", component: PriceManager },
    { path: "/express", component: ExpressManager },
]