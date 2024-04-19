<script lang="ts" setup>
import {
    Minus
} from '@element-plus/icons-vue'
import { Ref, computed, onMounted, ref } from 'vue';
import ImageSelect from '../components/ImageSelect.vue';
import { productList } from '../data/product';
import { paintList } from '../data/paint';
import { pcaList } from '../data/pca';
import { pipeTypeList, plateList, pipeList } from '../data/material';
import { ProductParamItem, caculateCartonCost, caculatePaintCost, caculatePipeCost, caculatePlateCost, caculateVolume, getAreaList, getCityList } from '../helper/calculator';
import { caculateExpressPrice } from '../helper/calculator';

const activeName = ref("1");

const tableData: Ref<ProductParamItem[]> = ref([]);
const province = ref("35");
const city = ref("");
const area = ref("");

onMounted(() => {
    addItem();
})

function addItem() {
    tableData.value.push({
        product: "1",
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

function deleteItem(index: number) {
    tableData.value.splice(index, 1);
}

function caculateCost() {
    const list = tableData.value.map((item) => {
        const product = productList.find(p => p.id == item.product)!;
        const name = product.name;
        const volume = caculateVolume(item);
        const plate = caculatePlateCost(item);
        const pipe = caculatePipeCost(item);
        const paint = caculatePaintCost(item);
        const carton = caculateCartonCost(item);
        const express = caculateExpressPrice(volume, province.value, city.value, area.value);
        return { name, plate, pipe, paint, carton, express };
    });
    console.log(list);
}

const cityList = computed(() => getCityList(province.value));
const areaList = computed(() => getAreaList(province.value, city.value));

const showArea = computed(() => city.value != "");
</script>

<template>
    <div class="product-cost">
        <div class="header">
            <span>请添加产品 ({{ tableData.length }})</span>
            <el-space warp>
                <el-button type="primary" @click="addItem">添加</el-button>
                <el-button @click="caculateCost">调试</el-button>
                <el-button type="danger">清空</el-button>
            </el-space>
        </div>
        <el-scrollbar class="scrollbar" height="460px">
            <el-collapse accordion v-model="activeName">
                <el-collapse-item v-for="(item, index) in tableData" :name="index">
                    <template #title>
                        <div class="title">
                            <span>标准花箱 ({{ item.length }} x {{ item.width }} x {{ item.height }})</span>
                            <el-link :underline="false" class="delete-button" size="small" :icon="Minus"
                                @click.stop="deleteItem(index)"></el-link>
                        </div>
                    </template>
                    <el-form label-width="auto" style="width: 100%">
                        <el-form-item label="产品款式">
                            <ImageSelect v-model="item.product" :images="productList" width="200px" height="80px" />
                        </el-form-item>
                        <el-form-item label="定制尺寸">
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <InputNumberUnit v-model="item.length" placeholder="长" unit="CM" />
                                </el-col>
                                <el-col :span="8">
                                    <InputNumberUnit v-model="item.width" placeholder="宽" unit="CM" />
                                </el-col>
                                <el-col :span="8">
                                    <InputNumberUnit v-model="item.height" placeholder="高" unit="CM" />
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <!-- 铁艺 -->
                        <el-form-item label="板材类型">
                            <el-radio-group v-model="item.plateType">
                                <el-radio v-for="item in plateList" :value="item.id">{{ item.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="板材厚度">
                            <InputNumberUnit v-model="item.plateThick" placeholder="板厚" unit="MM">
                            </InputNumberUnit>
                        </el-form-item>
                        <el-form-item label="管材类型">
                            <el-radio-group v-model="item.pipeType">
                                <el-radio v-for="p in pipeTypeList" :value="p.id">{{ p.name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="管材规格">
                            <el-select v-model="item.pipeSpec" placeholder="请选择规格" style="max-width: 160px;">
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
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-select v-model="province" placeholder="省份" style="max-width: 160px;">
                        <el-option v-for="c in pcaList" :label="c.name" :value="c.code"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-select v-model="city" placeholder="请选择" style="max-width: 160px;">
                        <el-option v-for="c in cityList" :label="c.name" :value="c.code"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-select v-model="area" v-show="showArea" placeholder="请选择" style="max-width: 160px;">
                        <el-option v-for="c in areaList" :label="c.name" :value="c.code"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-form-item>
    </div>

</template>

<style lang="scss" scoped>
.product-cost {
    max-width: 720px;
    margin: auto;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .scrollbar {
        margin: 12px 0;

        .title {
            width: 100vw;
            margin-right: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>