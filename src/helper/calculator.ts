import { expressGate, expressMap } from "../data/express";
import { IronArtItem, materialList, pipeList, pipeTypeList, plateList } from "../data/material";
import { paintList } from "../data/paint";
import { pcaList } from "../data/pca";
import { priceList } from "../data/price";
import { productList } from "../data/product";

export interface ProductParamItem {
    product: string;
    length: number;
    width: number;
    height: number;
    plateType: string;
    plateThick: number;
    pipeType: string;
    pipeSpec: string;
    paint: string;
    amount: number;
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
    return item.length * item.width * item.height / 1e6;
}

export function caculatePlateArea(item: ProductParamItem) {
    if (item.product == "1") {
        return item.length * item.width / 1e4 + item.length * item.height / 1e4 * 2 + item.width * item.height / 1e4 * 2
    }

    return 0;
}

export function caculatePlateWeight(item: ProductParamItem) {
    const area = caculatePlateArea(item);
    const material = findMaterial(item.plateType, plateList);
    if (item.product == "1") {
        return area * item.plateThick * material.density;
    }
    return 0;
}

export function caculatePlateCost(item: ProductParamItem) {
    const weight = caculatePlateWeight(item);
    const material = findMaterial(item.plateType, plateList);
    return weight * material.price;
}

export function caculatePipeLength(item: ProductParamItem) {
    if (item.product == "1") {
        return (item.length + item.width + item.height) * 4 / 100
    }

    return 0;
}

export function caculatePipeWeight(item: ProductParamItem) {
    const length = caculatePipeLength(item);
    const material = findMaterial(item.pipeType, pipeTypeList);
    const spec = pipeList.find((p) => p.id == item.pipeSpec)!;
    if (item.product == "1") {
        return spec.thick * (spec.length - spec.thick) * material.density * length / 1000 * 4;
    }
    return 0;
}

export function caculatePipeCost(item: ProductParamItem) {
    const weight = caculatePipeWeight(item);
    const material = findMaterial(item.pipeType, pipeTypeList);
    return weight * material.price;
}

export function caculatePaintCost(item: ProductParamItem) {
    const paint = paintList.find((p) => p.id == item.paint)!;
    const weight = caculatePlateWeight(item) + caculatePipeWeight(item);
    return weight * paint.price;
}

export function caculateCartonSize(item: ProductParamItem) {
    const product = productList.find(p => p.id == item.product)!;

    if (product.carton == "half") {
        return (item.length / 100 + item.width / 100 + 0.05) * (item.width / 100 + item.height / 100 + 0.03) * 2;
    }

    if (product.carton == "full") {
        return (item.length / 100 + item.width / 100 + 0.05) * (item.width / 100 * 2 + item.height / 100 + 0.03) * 2;
    }

    return 0;
}

export function caculateCartonCost(item: ProductParamItem) {
    const size = caculateCartonSize(item);
    const carton = priceList.find(p => p.id == "carto")!;
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
export function caculateExpressPrice(volume: number, province: string, city: string, area: string) {
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
        { id: "sf", name: "顺丰", price: sf },
        { id: "jd", name: "京东", price: jd },
        { id: "best", name: "百世", price: best },
        { id: "yimi", name: "一米", price: yimi },
        { id: "deppon", name: "德邦", price: deppon },
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

export function caculateLogoPrice(type: string, color: number, side: number) {
    if (type == "paint") {
        return 15;
    }

    if (type == "silk") {
        return 70 + (color + side) * 3;
    }

    return 0;
}