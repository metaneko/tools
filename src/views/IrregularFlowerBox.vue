<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import InputNumberUnit from '../components/InputNumberUnit.vue';
import { commonPaintList } from '../data/paint';
import { IronArtItem, materialList, pipeTypeList, plateList, pipeList } from '../data/material';

const showDetail = ref(false);

const form = reactive({
    product: "1",
    count: 1,
    x: 100,
    y: 30,
    z: 60,
    extX: 0,
    extY: 0,
    extZ: 0,
    plateType: "1",
    plateThick: 0.6,
    pipeType: "1",
    pipeSpec: "18",
    paint: "1",
    province: "35",
    city: "",
    area: "",
    carton: "half",
    logoType: "paint",
});

// 铁艺
const plateMaterial = computed(() => findMaterial(form.plateType, plateList));
// const plateArea = computed(() => form.x * form.y / 1e4 + form.x * form.z / 1e4 * 2 + form.y * form.z / 1e4 * 2);
const plateArea = ref(0);

const pipeMaterial = computed(() => findMaterial(form.pipeType, pipeTypeList));
const squirePipeSpec = computed(() => pipeList.find((item) => item.id == form.pipeSpec)!);
// const pipeLen = computed(() => (form.x + form.y + form.z) * 4 / 100);
const pipeLen = ref(0);

const plateWeight = computed(() => plateArea.value * form.plateThick * plateMaterial.value.density);
const pipeWeight = computed(() => squirePipeSpec.value.thick * (squirePipeSpec.value.length - squirePipeSpec.value.thick) * pipeMaterial.value.density * pipeLen.value / 1000 * 4);
const totalWeight = computed(() => plateWeight.value + pipeWeight.value);

const plateCost = computed(() => plateWeight.value * plateMaterial.value.price);
const pipeCost = computed(() => pipeWeight.value * pipeMaterial.value.price)
const ironArtCost = computed(() => plateWeight.value * plateMaterial.value.price + pipeWeight.value * pipeMaterial.value.price);

function findMaterial(type: string, list: IronArtItem[]) {
    const item = list.find(i => i.id == type)!;
    return materialList.find(i => i.id == item.material)!;
}

// 烤漆
const paintSelected = computed(() => commonPaintList.find((v) => v.id == form.paint)!);
const paintCost = computed(() => paintSelected.value.price * totalWeight.value);

const totalCost = computed(() => ironArtCost.value + paintCost.value);

</script>

<template>
    <el-form class="product-single" label-width="auto">
        <el-form-item label="板材面积">
            <InputNumberUnit v-model="plateArea" placeholder="面积" unit="㎡" />
        </el-form-item>
        <!-- 铁艺 -->
        <el-form-item label="板材类型">
            <el-radio-group v-model="form.plateType">
                <el-radio v-for="item in plateList" :value="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="板材厚度">
            <InputNumberUnit v-model="form.plateThick" placeholder="板厚" unit="mm">
            </InputNumberUnit>
        </el-form-item>
        <el-form-item label="管材长度">
            <InputNumberUnit v-model="pipeLen" placeholder="长度" unit="m" />
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
                <el-radio v-for="item in commonPaintList" :value="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-divider />
        <h3 @click="showDetail = !showDetail">铁艺成本: {{ Math.round(totalCost) }}
        </h3>
        <div v-show="showDetail">铁板 ({{ plateCost.toFixed(2) }}) + 铁管 ({{ pipeCost.toFixed(2) }}) + 烤漆({{
            paintCost.toFixed(2) }}) =
            {{ totalCost.toFixed(2) }}</div>
    </el-form>
</template>

<style scoped></style>