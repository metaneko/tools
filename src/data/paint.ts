export interface PaintTypeListItem {
    id: string;
    name: string;
    price: number;
}

export const paintTypeList: PaintTypeListItem[] = [
    { id: "1", name: "普通", price: 2.5 },
    { id: "2", name: "潘通色卡漆", price: 3.5 },
    { id: "3", name: "水磨石", price: 5.75 },
    { id: "4", name: "木纹漆", price: 100 },
]

export const pantonePaintList = [
    { id: "1", name: "调漆", color: "", price: 3.5 },
    { id: "2", name: "自有色卡", color: "", price: 3.5 },
]

export const commonPaintList = [
    { id: "1", name: "黑白", color: "", price: 1.5 },
    { id: "2", name: "彩色", color: "", price: 2.5 },
    { id: "3", name: "金色", color: "", price: 2.5 }
]