<script lang="ts" setup>
import {
    Minus,
    Plus
} from '@element-plus/icons-vue'
import { Ref, computed, onMounted, ref } from 'vue';
import ImageSelect from '../components/ImageSelect.vue';
import InputNumberUnit from '../components/InputNumberUnit.vue';
import { productList } from '../data/product';
import { paintList } from '../data/paint';
import { pcaList } from '../data/pca';
import { pipeTypeList, plateList, pipeList } from '../data/material';
import { ExpressItem, ProductParamItem, ResultTableItem, caculateCartonCost, caculatePaintCost, caculatePipeCost, caculatePlateCost, getAreaList, getCityList, getRecomandExpress } from '../helper/calculator';
import { caculateExpressPrice } from '../helper/calculator';
import { TableColumnCtx } from 'element-plus';

const activeName = ref("1");

const productTable: Ref<ProductParamItem[]> = ref([]);
const resultTable: Ref<ResultTableItem[]> = ref([]);

const province = ref("35");
const city = ref("");
const area = ref("");
const showCaculator = ref(true);
const totalCost = ref(0);
const expressList: Ref<ExpressItem[]> = ref([]);
const expressRecommand: Ref<ExpressItem> = ref({ id: "", name: "", price: 0 });

const cityList = computed(() => getCityList(province.value));
const areaList = computed(() => getAreaList(province.value, city.value));
const showArea = computed(() => city.value != "");

onMounted(() => {
    addInitItem();
})

function addItem(index: number) {
    productTable.value.push(Object.assign({}, productTable.value[index]));
}

function deleteItem(index: number) {
    productTable.value.splice(index, 1);
}

function clearItem() {
    productTable.value.splice(1);
}

function addInitItem() {
    productTable.value.push({
        product: "1",
        count: 1,
        length: 100,
        width: 30,
        height: 60,
        plateType: "1",
        plateThick: 0.6,
        pipeType: "1",
        pipeSpec: "18",
        paint: "1",
        amount: 1,
    })
}

function caculateCost() {
    resultTable.value = productTable.value.map((item) => {
        const product = productList.find(p => p.id == item.product)!;
        const name = product.name;
        const plate = caculatePlateCost(item);
        const pipe = caculatePipeCost(item);
        const ironArt = plate + pipe;
        const paint = caculatePaintCost(item);
        const carton = caculateCartonCost(item);
        const count = item.count;
        const express = caculateExpressPrice(item, province.value, city.value, area.value);
        // express must caculator special, not in total 
        const total = (plate + pipe + paint + carton) * item.count;
        const resultItem = { name, ironArt, plate, pipe, paint, carton, count, total, express }
        return resultItem;
    });

    totalCost.value = resultTable.value.map(i => i.total).reduce((accumulator, currentValue) => accumulator + currentValue);
    expressList.value = resultTable.value.map(i => i.express).reduce((accumulator: ExpressItem[], currentValue: ExpressItem[]) => {
        const list = [];
        for (let i = 0; i < accumulator.length; i++) {
            const acc = accumulator[i];
            const cur = currentValue[i];
            list.push({ id: acc.id, name: acc.name, price: acc.price + cur.price })
        }
        return list;
    })
    expressRecommand.value = getRecomandExpress(expressList.value);

    showCaculator.value = false;
    console.log(expressRecommand.value)
}

function formatNumber(row: any, col: TableColumnCtx<ResultTableItem>) {
    const key = col["property"];
    return row[key].toFixed(2);
}

</script>

<template>
    <div v-if="showCaculator" class="caculator">
        <div class="header">
            <span>已添加产品 ({{ productTable.length }}) 件</span>
            <el-space warp>
                <el-button @click="addInitItem">添加</el-button>
                <el-button type="danger" @click="clearItem">清空</el-button>
                <el-button type="primary" @click="caculateCost">计算</el-button>
            </el-space>
        </div>
        <el-scrollbar class="scrollbar">
            <el-collapse accordion v-model="activeName">
                <el-collapse-item v-for="(item, index) in productTable" :name="index">
                    <template #title>
                        <div class="title">
                            <span>标准花箱 ({{ item.length }} x {{ item.width }} x {{ item.height }})</span>
                            <div class="opration-group">
                                <el-link :underline="false" class="opration" size="small" :icon="Plus"
                                    @click.stop="addItem(index)"></el-link>
                                <el-link v-if="index > 0" :underline="false" class="opration" size="small" :icon="Minus"
                                    @click.stop="deleteItem(index)"></el-link>
                            </div>
                        </div>
                    </template>
                    <el-form label-width="auto" style="width: 100%">
                        <el-form-item label="产品款式">
                            <ImageSelect v-model="item.product" :images="productList" width="32px" height="32px" />
                            <InputNumberUnit v-model="item.count" placeholder="数量" unit="件"
                                style="margin-left: 10px;" />
                        </el-form-item>
                        <el-form-item label="定制尺寸">
                            <InputNumberUnit v-model="item.length" placeholder="长" unit="CM" />
                            <InputNumberUnit v-model="item.width" placeholder="宽" unit="CM" />
                            <InputNumberUnit v-model="item.height" placeholder="高" unit="CM" />
                        </el-form-item>
                        <!-- 铁艺 -->
                        <el-form-item label="板材类型">
                            <el-radio-group v-model="item.plateType">
                                <el-radio v-for="item in plateList" :value="item.id">{{ item.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="板材厚度">
                            <InputNumberUnit v-model="item.plateThick" placeholder="板厚" unit="MM" />
                        </el-form-item>
                        <el-form-item label="管材类型">
                            <el-radio-group v-model="item.pipeType">
                                <el-radio v-for="p in pipeTypeList" :value="p.id">{{ p.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="管材规格">
                            <el-select class="col-input" v-model="item.pipeSpec" placeholder="请选择规格">
                                <el-option v-for="p in pipeList.filter(i => i.type == item.pipeType)" :key="p.id"
                                    :label="p.name" :value="p.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 烤漆 -->
                        <el-form-item label="烤漆颜色">
                            <el-radio-group v-model="item.paint">
                                <el-radio v-for="item in paintList" :value="item.id">{{ item.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </el-scrollbar>

        <!-- 快递 -->
        <el-form-item label="发货地址">
            <el-select class="col-input" v-model="province" placeholder="省份">
                <el-option v-for="c in pcaList" :label="c.name" :value="c.code"></el-option>
            </el-select>
            <el-select class="col-input" v-model="city" placeholder="请选择">
                <el-option v-for="c in cityList" :label="c.name" :value="c.code"></el-option>
            </el-select>
            <el-select class="col-input" v-model="area" v-show="showArea" placeholder="请选择">
                <el-option v-for="c in areaList" :label="c.name" :value="c.code"></el-option>
            </el-select>
        </el-form-item>
    </div>
    <div class="caculator" v-else>
        <div class="header">
            <h3>计算结果</h3>
            <el-space warp>
                <el-button @click="() => showCaculator = true">返回</el-button>
            </el-space>
        </div>
        <h4>产品成本</h4>
        <el-table :data="resultTable" stripe style="width: 100%; height: 500px;">
            <el-table-column fixed prop="name" label="产品" width="180" />
            <el-table-column prop="ironArt" label="铁艺" :formatter="formatNumber" />
            <el-table-column prop="paint" label="烤漆" :formatter="formatNumber" />
            <el-table-column prop="carton" label="纸箱" :formatter="formatNumber" />
            <el-table-column prop="count" label="数量" />
            <el-table-column prop="total" label="总价" :formatter="formatNumber" />
        </el-table>
        <h4>物流成本</h4>
        <div>
            推荐物流：{{ expressRecommand.name }} ({{ expressRecommand.price }})
        </div>
        <h4>报价</h4>
        <div>
            建议报价：{{ ((totalCost + expressRecommand.price + 15) / 0.6).toFixed(2) }}，
            最低报价：{{ ((totalCost + expressRecommand.price + 15) / 0.6 * 0.8).toFixed(2) }}
        </div>
    </div>

</template>

<style lang="scss" scoped>
.caculator {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .col-input {
        max-width: 160px;
        margin-right: 10px;
    }

    .scrollbar {
        margin: 12px 0;
        flex-grow: 1;

        .title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .opration-group {
                justify-self: flex-end;

                .opration {
                    margin-right: 12px;
                }
            }
        }
    }
}
</style>