export interface PriceItem {
    id: string;
    name: string;
    price: number;
    unit: string;
}
export const priceList = [
    { id: "carton", name: "纸箱", price: 3.2, unit: "平方米" },
    { id: "wood", name: "木板", price: 10, unit: "米" },
]