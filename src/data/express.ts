const expressOrigin = `代码,名称,顺丰,京东,百世,一米,德邦
35,福建,110,100,110,120,110
44,广东,135,135,135,140,135
31,上海,135,135,140,140,135
33,浙江,135,135,135,140,135
32,江苏,135,145,145,155,135
34,安徽,185,155,160,155,175
36,江西,185,145,150,155,175
42,湖北,185,155,175,155,175
43,湖南,185,155,175,155,175
45,广西,190,170,200,175,180
41,河南,185,165,190,175,175
37,山东,185,168,180,175,175
11,北京,190,180,260,240,180
12,天津,190,180,200,220,180
13,河北,190,185,200,220,180
14,山西,235,180,220,220,235
50,重庆,230,180,220,220,235
51,四川,230,190,230,220,235
52,贵州,230,190,240,240,235
61,陕西,235,190,210,220,235
53,云南,230,210,280,300,235
22,吉林,255,220,280,300,240
21,辽宁,255,220,280,300,240
23,黑龙江,255,230,280,300,240
46,海南,210,170,350,400,235
62,甘肃,255,230,500,450,250
63,青海,255,250,600,450,250
64,宁夏,255,250,500,450,250
15,内蒙古,255,220,650,450,250
65,新疆,550,0,750,800,550
54,西藏,0,0,850,800,600
3509,宁德市,,,130,,
3507,南平市,,,,130,
350982,福鼎市,,,,130,`;

interface ExpressPrice {
    sf: number,
    jd: number,
    best: number,
    yimi: number,
    deppon: number,
}

export function parseExpress(origin: string) {
    const map = new Map<string, ExpressPrice>()
    const lines = origin.split("\n");
    for (const line of lines) {
        const [code, _, col3, col4, col5, col6, col7] = line.split(",");
        const sf = col3 ? parseInt(col3) : 0;
        const jd = col4 ? parseInt(col4) : 0;
        const best = col5 ? parseInt(col5) : 0;
        const yimi = col6 ? parseInt(col6) : 0;
        const deppon = col7 ? parseInt(col7) : 0;
        map.set(code, { sf, jd, best, yimi, deppon });
    }

    return map;
}

export const expressMap = parseExpress(expressOrigin);

export const expressGate: Record<string, number> = {
    sf: 0,
    jd: 90,
    best: 90,
    yimi: 90,
    deppon: 90
}