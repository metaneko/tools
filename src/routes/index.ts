import { RouterView } from "vue-router"
import CargoShipping from "../views/CargoShipping.vue"
import ExpressManager from "../views/ExpressManager.vue"
import PriceManager from "../views/PriceManager.vue"
import FlowerBoxCost from "../views/FlowerBoxCost.vue"
import ProductOld from "../views/ProductOld.vue"

export const routes = [
    { path: "/", component: FlowerBoxCost },
    {
        path: "/caculator",
        component: RouterView,
        children: [
            { path: "flowerbox", component: FlowerBoxCost },
            { path: "old", component: ProductOld },
            { path: "cargo", component: CargoShipping },
        ]
    },
    { path: "/price", component: PriceManager },
    { path: "/express", component: ExpressManager },
]