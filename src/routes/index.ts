import { RouterView } from "vue-router"
import CargoShipping from "../views/CargoShipping.vue"
import ExpressManager from "../views/ExpressManager.vue"
import PriceManager from "../views/PriceManager.vue"
import FlowerBoxCost from "../views/FlowerBoxCost.vue"
import IrregularFlowerBox from "../views/IrregularFlowerBox.vue"

export const routes = [
    { path: "/", component: FlowerBoxCost },
    {
        path: "/caculator",
        component: RouterView,
        children: [
            { path: "flowerbox", component: FlowerBoxCost },
            { path: "irregular", component: IrregularFlowerBox },
            { path: "cargo", component: CargoShipping },
        ]
    },
    { path: "/price", component: PriceManager },
    { path: "/express", component: ExpressManager },
]