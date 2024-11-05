import { parser } from "mathjs";
import { expressGate, expressMap } from "../data/express";
import { IronArtItem, materialList, pipeList, pipeTypeList, plateList } from "../data/material";
import { commonPaintList, paintTypeList, pantonePaintList } from "../data/paint";
import { pcaList } from "../data/pca";
import { priceList } from "../data/price";
import { productList } from "../data/product";

export interface ProductParamItem {
    product: string;
    count: number;
    x: number;
    y: number;
    z: number;
    extX: number;
    extY: number;
    extZ: number;
    plateType: string;
    plateThick: number;
    pipeType: string;
    pipeSpec: string;
    paintType: string;
    commonPaint: string;
    pantonePaint: string;
}

export interface ResultTableItem {
    name: string;
    ironArt: number;
    plate: number;
    pipe: number;
    wood: number;
    paint: number;
    carton: number;
    count: number;
    total: number;
    express: ExpressItem[]
}

export interface ExpressItem {
    id: string;
    name: string;
    price: number;
}

export function findMaterial(type: string, list: IronArtItem[]) {
    const item = list.find(i => i.id == type)!;
    return materialList.find(i => i.id == item.material)!;
}

export function caculateVolume(item: ProductParamItem) {
    return item.x * item.y * item.z / 1e6;
}

export function caculatePlateArea(item: ProductParamItem) {
    /*
    if (item.product == "1") {
        return item.x * item.y / 1e4 + item.x * item.z / 1e4 * 2 + item.y * item.z / 1e4 * 2
    }

    if (item.product == "3") {
        return item.x * item.y / 1e4 + item.x * item.z / 1e4 * 2 + item.x * item.extZ / 1e4 + (item.y * item.z - item.extY * (item.z - item.extZ)) / 1e4 * 2;
    }
    */
    const product = productList.find((p) => p.id == item.product)!;

    return caculateExpression(item, product.plate);
}

export function caculatePlateWeight(item: ProductParamItem) {
    const area = caculatePlateArea(item);
    const material = findMaterial(item.plateType, plateList);
    return area * item.plateThick * material.density;
}

export function caculatePlateCost(item: ProductParamItem) {
    const weight = caculatePlateWeight(item);
    const material = findMaterial(item.plateType, plateList);
    return weight * material.price;
}

export function caculatePipeLength(item: ProductParamItem) {
    const product = productList.find(p => p.id == item.product)!;
    return caculateExpression(item, product.pipe)
}

export function caculatePipeWeight(item: ProductParamItem) {
    const length = caculatePipeLength(item);
    const material = findMaterial(item.pipeType, pipeTypeList);
    const spec = pipeList.find((p) => p.id == item.pipeSpec)!;
    return spec.thick * (spec.length - spec.thick) * material.density * length / 1000 * 4;
}

export function caculatePipeCost(item: ProductParamItem) {
    const weight = caculatePipeWeight(item);
    const material = findMaterial(item.pipeType, pipeTypeList);
    return weight * material.price;
}

export function caculateWoodCost(item: ProductParamItem) {
    const wood = priceList.find((p) => p.id == "wood")!;
    if (item.product == "3") {
        return Math.ceil(item.x / 5) * item.extY / 100 * wood.price;
    }

    return 0
}

export function caculatePaintCost(item: ProductParamItem) {
    const paintType = paintTypeList.find((p) => p.id == item.paintType)!;
    if (paintType.id == "1") {
        const commonPaint = commonPaintList.find((p) => p.id == item.commonPaint)!;
        const weight = caculatePlateWeight(item) + caculatePipeWeight(item);
        return weight * commonPaint.price;
    }

    if (paintType.id == "2") {
        const pantonePaint = pantonePaintList.find((p) => p.id == item.pantonePaint)!;
        const weight = caculatePlateWeight(item) + caculatePipeWeight(item);
        if (pantonePaint.id == "1") {
            return weight * pantonePaint.price;
        }
        if (pantonePaint.id == "2") {
            return weight * pantonePaint.price;
        }

        return weight * pantonePaint.price
    }

    if (paintType.id == "3") {
        const weight = caculatePlateWeight(item) + caculatePipeWeight(item);
        return weight * paintType.price;
    }

    if (paintType.id == "4") {
        const area = item.x * item.z / 1e4 * 2 + item.y * item.z / 1e4 * 2;
        return area * paintType.price;
    }

    return 0
}

export function caculateCartonSize(item: ProductParamItem) {
    const product = productList.find(p => p.id == item.product)!;

    if (product.carton == "half") {
        return (item.x / 100 + item.y / 100 + 0.05) * (item.y / 100 + item.z / 100 + 0.03) * 2;
    }

    if (product.carton == "full") {
        return (item.x / 100 + item.y / 100 + 0.05) * (item.y / 100 * 2 + item.z / 100 + 0.03) * 2;
    }

    return 0;
}

export function caculateCartonCost(item: ProductParamItem) {
    const size = caculateCartonSize(item);
    const carton = priceList.find(p => p.id == "carton")!;
    return size * carton.price;
}

export function getCityList(province: string) {
    return pcaList.find((val) => val.code == province)?.children;
}

export function getAreaList(province: string, city: string) {
    const cityList = getCityList(province);
    return cityList?.find((val: any) => val.code == city)?.children;
}

// 计算 快递价格
export function caculateExpressPrice(item: ProductParamItem, province: string, city: string, area: string) {
    const volume = caculateVolume(item);
    let sf = 0;
    let jd = 0;
    let best = 0;
    let yimi = 0;
    let deppon = 0;

    if (expressMap.has(province)) {
        const p = expressMap.get(province)!;
        sf = p["sf"] * volume;
        jd = p["jd"] * volume;
        best = p["best"] * volume;
        yimi = p["yimi"] * volume;
        deppon = p["deppon"] * volume;

        if (expressMap.has(city)) {
            const c = expressMap.get(city)!;
            if (c["best"] > 0) {
                best = c["best"] * volume;
            }
            if (c["yimi"] > 0) {
                yimi = c["yimi"] * volume;
            }
        }

        if (expressMap.has(area)) {
            const a = expressMap.get(area)!;
            if (a["best"] > 0) {
                best = a["best"] * volume;
            }

            if (a["yimi"] > 0) {
                yimi = a["yimi"] * volume;
            }
        }
    }

    const list: ExpressItem[] = [
        { id: "sf", name: "顺丰", price: sf * item.count },
        { id: "jd", name: "京东", price: jd * item.count },
        { id: "best", name: "百世", price: best * item.count },
        { id: "yimi", name: "一米", price: yimi * item.count },
        { id: "deppon", name: "德邦", price: deppon * item.count },
    ];

    return list;
}

export function getRecomandExpress(list: ExpressItem[]) {
    const formatList = list.map((item) => {
        item.price = Math.max(item.price, expressGate[item.id])
        return item;
    }).sort((a, b) => a.price - b.price);
    return formatList.length > 0 ? formatList[0] : { id: "error", name: "", price: 0 };
}

export function caculateLogoPrice(type: string, count: number) {
    if (type == "paint") {
        return 15 * count;
    }

    if (type == "silk1") {
        return 70 + count * 3;
    }

    if (type == "silk2") {
        return 70 + count * 6;
    }

    if (type == "silk3") {
        return 70 + count * 9;
    }

    return 0;
}

function caculateExpression(item: ProductParamItem, expression: string) {
    const p = parser();
    p.evaluate(`A1 = ${item.x / 100}`);
    p.evaluate(`B1 = ${item.y / 100}`);
    p.evaluate(`C1 = ${item.z / 100}`);
    p.evaluate(`A2 = ${item.extX / 100}`);
    p.evaluate(`B2 = ${item.extY / 100}`);
    p.evaluate(`C2 = ${item.extZ / 100}`);

    return p.evaluate(expression);
}