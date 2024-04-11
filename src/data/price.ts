export interface PriceItem {
    id: string;
    name: string;
    price: number;
    unit: string;
}
export const priceList = [
    { id: "carto", name: "纸箱", price: 3.2, unit: "平方米" },
    { id: "logo_module", name: "Logo 模具", price: 70, unit: "个" },
    { id: "logo_color", name: "Logo 颜色", price: 3, unit: "色" },
    { id: "logo_side", name: "Logo 面数", price: 3, unit: "面" },
]