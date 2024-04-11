export interface MaterialItem {
    id: string
    name: string;
    density: number;
    price: number;
}

export interface IronArtItem {
    id: string;
    name: string;
    material: string;
}

export interface PipeListItem {
    id: string;
    type: string;
    name: string;
    length: number;
    width: number;
    thick: number;
}

export const materialList: MaterialItem[] = [
    { id: "iron", name: "铁", density: 7.85, price: 14 },
    { id: "steel", name: "不锈钢", density: 7.93, price: 18 },
]

export const plateList: IronArtItem[] = [
    { id: "1", name: "铁板", material: "iron" },
    { id: "2", name: "不锈钢板", material: "steel" },
]

export const pipeTypeList: IronArtItem[] = [
    { id: "1", name: "方管", material: "iron" },
    { id: "2", name: "圆管", material: "iron" },
    { id: "3", name: "不锈钢方管", material: "steel" },
    { id: "4", name: "不锈钢圆管", material: "steel" },
]

export const pipeList: PipeListItem[] = [
    { id: "1", type: "1", name: "6 x 6 x 0.6", length: 6, width: 6, thick: 0.6 },
    { id: "2", type: "1", name: "6 x 6 x 0.7", length: 6, width: 6, thick: 0.7 },
    { id: "3", type: "1", name: "8 x 8 x 0.6", length: 8, width: 8, thick: 0.6 },
    { id: "4", type: "1", name: "8 x 8 x 0.7", length: 8, width: 8, thick: 0.7 },
    { id: "5", type: "1", name: "8 x 8 x 0.8", length: 8, width: 8, thick: 0.8 },
    { id: "6", type: "1", name: "10 x 10 x 0.6", length: 10, width: 10, thick: 0.6 },
    { id: "7", type: "1", name: "10 x 10 x 0.7", length: 10, width: 10, thick: 0.7 },
    { id: "8", type: "1", name: "10 x 10 x 0.8", length: 10, width: 10, thick: 0.8 },
    { id: "9", type: "1", name: "10 x 10 x 1", length: 10, width: 10, thick: 1 },
    { id: "10", type: "1", name: "13 x 13 x 0.6", length: 13, width: 13, thick: 0.6 },
    { id: "11", type: "1", name: "13 x 13 x 0.7", length: 13, width: 13, thick: 0.7 },
    { id: "12", type: "1", name: "13 x 13 x 0.8", length: 13, width: 13, thick: 0.8 },
    { id: "13", type: "1", name: "13 x 13 x 1", length: 13, width: 13, thick: 1 },
    { id: "14", type: "1", name: "16 x 16 x 0.6", length: 16, width: 16, thick: 0.6 },
    { id: "15", type: "1", name: "16 x 16 x 0.7", length: 16, width: 16, thick: 0.7 },
    { id: "16", type: "1", name: "16 x 16 x 0.8", length: 16, width: 16, thick: 0.8 },
    { id: "17", type: "1", name: "16 x 16 x 1", length: 16, width: 16, thick: 1 },
    { id: "18", type: "1", name: "20 x 20 x 0.6", length: 20, width: 20, thick: 0.6 },
    { id: "19", type: "1", name: "20 x 20 x 0.7", length: 20, width: 20, thick: 0.7 },
    { id: "20", type: "1", name: "20 x 20 x 0.8", length: 20, width: 20, thick: 0.8 },
    { id: "21", type: "1", name: "20 x 20 x 1", length: 20, width: 20, thick: 1 },
    { id: "22", type: "1", name: "20 x 20 x 1.2", length: 20, width: 20, thick: 1.2 },
    { id: "23", type: "1", name: "25 x 25 x 0.7", length: 25, width: 25, thick: 0.7 },
    { id: "24", type: "1", name: "25 x 25 x 0.8", length: 25, width: 25, thick: 0.8 },
    { id: "25", type: "1", name: "25 x 25 x 1", length: 25, width: 25, thick: 1 },
    { id: "26", type: "1", name: "25 x 25 x 1.2", length: 25, width: 25, thick: 1.2 },
    { id: "27", type: "1", name: "30 x 30 x 0.7", length: 30, width: 30, thick: 0.7 },
    { id: "28", type: "1", name: "30 x 30 x 0.8", length: 30, width: 30, thick: 0.8 },
];
