<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import InputNumberUnit from '../components/InputNumberUnit.vue';
import { paintList } from '../data/paint';
import { pcaList } from '../data/pca';
import { IronArtItem, materialList, pipeTypeList, plateList, pipeList } from '../data/material';
import { caculateCartonCost, caculateExpressPrice, caculateLogoPrice, getAreaList, getCityList } from '../helper/calculator';

const showDetail = ref(false);

const form = reactive({
    product: "1",
    length: 100,
    width: 30,
    height: 60,
    plateType: "1",
    plateThick: 0.6,
    pipeType: "1",
    pipeSpec: "18",
    amount: 1,
    paint: "1",
    province: "35",
    city: "",
    area: "",
    carton: "half",
    logoType: "paint",
    logoColor: 1,
    logoSide: 1
});

const volume = computed(() => form.length * form.width * form.height / 1e6)

// 铁艺
const plateMaterial = computed(() => findMaterial(form.plateType, plateList));
const plateArea = computed(() => form.length * form.width / 1e4 + form.length * form.height / 1e4 * 2 + form.width * form.height / 1e4 * 2);

const pipeMaterial = computed(() => findMaterial(form.pipeType, pipeTypeList));
const squirePipeSpec = computed(() => pipeList.find((item) => item.id == form.pipeSpec)!);
const pipeLen = computed(() => (form.length + form.width + form.height) * 4 / 100 - (squirePipeSpec.value.length + squirePipeSpec.value.width) / 2 * 16 / 1000);

const plateWeight = computed(() => plateArea.value * form.plateThick * plateMaterial.value.density);
const pipeWeight = computed(() => squirePipeSpec.value.thick * (squirePipeSpec.value.length - squirePipeSpec.value.thick) * pipeMaterial.value.density * pipeLen.value / 1000 * 4);
const totalWeight = computed(() => plateWeight.value + pipeWeight.value);

const ironArtCost = computed(() => plateWeight.value * plateMaterial.value.price + pipeWeight.value * pipeMaterial.value.price);

function findMaterial(type: string, list: IronArtItem[]) {
    const item = list.find(i => i.id == type)!;
    return materialList.find(i => i.id == item.material)!;
}

// 烤漆
const paintSelected = paintList.find((v) => v.id == form.paint)!;
const paintCost = computed(() => paintSelected.price * totalWeight.value);


// 快递
const cityList = computed(() => getCityList(form.province));
const areaList = computed(() => getAreaList(form.province, form.city));

const showArea = computed(() => form.city != "");
const express = computed(() => caculateExpressPrice(volume.value, form.province, form.city, form.area));

// 纸箱
const cartonCost = computed(() => caculateCartonCost(form));

// logo
const logoCost = computed(() => caculateLogoPrice(form.logoType, form.logoColor, form.logoSide));

const totalCost = computed(() => ironArtCost.value + paintCost.value + express.value.recomand.price + cartonCost.value + logoCost.value);

</script>

<template>
    <el-form label-width="auto" style="width: 600px;">
        <el-form-item label="定制尺寸">
            <el-row :gutter="20" justify="space-between" style="width: 100%;">
                <el-col :span="8">
                    <InputNumberUnit v-model="form.length" placeholder="长" unit="CM" />
                </el-col>
                <el-col :span="8">
                    <InputNumberUnit v-model="form.width" placeholder="宽" unit="CM" />
                </el-col>
                <el-col :span="8">
                    <InputNumberUnit v-model="form.height" placeholder="高" unit="CM" />
                </el-col>
            </el-row>
        </el-form-item>
        <!-- 铁艺 -->
        <el-form-item label="板材类型">
            <el-radio-group v-model="form.plateType">
                <el-radio v-for="item in plateList" :value="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="板材厚度">
            <InputNumberUnit v-model="form.plateThick" placeholder="板厚" unit="MM">
            </InputNumberUnit>
        </el-form-item>
        <el-form-item label="管材类型">
            <el-radio-group v-model="form.pipeType">
                <el-radio v-for="item in pipeTypeList" :value="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.pipeType == '1'" label="方管规格">
            <el-select v-model="form.pipeSpec" placeholder="请选择规格" style="max-width: 160px;">
                <el-option v-for="item in pipeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <!-- 烤漆 -->
        <el-form-item label="烤漆颜色">
            <el-radio-group v-model="form.paint">
                <el-radio v-for="item in paintList" :value="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- 快递 -->
        <el-form-item label="发货地址">
            <el-row :gutter="20" style="width: 100%;">
                <el-col :span="8">
                    <el-select v-model="form.province" placeholder="省份">
                        <el-option v-for="c in pcaList" :label="c.name" :value="c.code"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-select v-model="form.city" placeholder="请选择">
                        <el-option v-for="c in cityList" :label="c.name" :value="c.code"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-select v-model="form.area" v-show="showArea" placeholder="请选择">
                        <el-option v-for="c in areaList" :label="c.name" :value="c.code"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-form-item>
        <!-- 纸箱 -->
        <el-form-item label="纸箱类型">
            <el-radio-group v-model="form.carton">
                <el-radio value="half">半盖</el-radio>
                <el-radio value="full">全盖</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- Logo -->
        <el-form-item label="Logo">
            <el-radio-group v-model="form.logoType">
                <el-radio value="paint">喷漆</el-radio>
                <el-radio value="silk">丝印</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-show="form.logoType == 'silk'" label="颜色面数">
            <el-row :gutter="20" justify="space-between" style="width: 100%;">
                <el-col :span="8">
                    <InputNumberUnit v-model="form.logoColor" placeholder="颜色" unit="色" />
                </el-col>
                <el-col :span="8">
                    <InputNumberUnit v-model="form.logoSide" placeholder="面数" unit="面" />
                </el-col>
                <el-col :span="8"></el-col>
            </el-row>
        </el-form-item>
        <el-divider />
        <h3 @click="showDetail = !showDetail">建议零售价: {{ Math.round(totalCost * 1.4) }}, 最低价:
            {{ Math.round(totalCost * 1.4 * 0.8)
            }}</h3>
        <div v-show="showDetail">铁艺 ({{ ironArtCost.toFixed(2) }}) + 烤漆({{ paintCost.toFixed(2) }}) +
            快递({{ express.recomand.name }}: {{ express.recomand.price }}) + 纸箱({{ cartonCost.toFixed(2) }}) + Logo({{
                logoCost }}) =
            {{ totalCost.toFixed(2) }}</div>
    </el-form>
</template>

<style scoped></style>