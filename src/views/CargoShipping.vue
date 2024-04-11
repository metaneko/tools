<script setup lang="ts">
import { computed, ref } from 'vue';
import { cargoList } from "../data/cargo";

const length = ref(100);
const width = ref(30);
const height = ref(60);
const cargo = ref("1");

const count = computed(() => {
    const cd = cargoList.find((c) => c.id == cargo.value)!;
    const res1 = counter(cd.length, cd.width, cd.height, length.value, width.value, height.value);
    const res2 = counter(cd.length, cd.width, cd.height, length.value, height.value, width.value);
    const res3 = counter(cd.length, cd.width, cd.height, width.value, length.value, height.value);
    const res4 = counter(cd.length, cd.width, cd.height, width.value, height.value, length.value);
    const res5 = counter(cd.length, cd.width, cd.height, height.value, width.value, length.value);
    const res6 = counter(cd.length, cd.width, cd.height, height.value, length.value, width.value);
    return Math.max(res1, res2, res3, res4, res5, res6);
});

function counter(cl: number, cw: number, ch: number, pl: number, pw: number, ph: number) {
    const lc = Math.floor(cl * 100 / pl);
    const wc = Math.floor(cw * 100 / pw);
    const hc = Math.floor(ch * 100 / ph);
    return lc * wc * hc;
}
</script>

<template>
    <el-form label-width="auto" style="width: 600px;">
        <el-form-item label="产品尺寸">
            <el-row :gutter="20" justify="space-between" style="width: 100%;">
                <el-col :span="8">
                    <InputNumberUnit v-model="length" placeholder="长" unit="CM" />
                </el-col>
                <el-col :span="8">
                    <InputNumberUnit v-model="width" placeholder="宽" unit="CM" />
                </el-col>
                <el-col :span="8">
                    <InputNumberUnit v-model="height" placeholder="高" unit="CM" />
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="货箱类型">
            <el-select v-model="cargo" placeholder="请选择">
                <el-option v-for="c in cargoList" :label="c.name" :value="c.id"></el-option>
            </el-select>
        </el-form-item>
        预计可以装 {{ count }} 个产品
    </el-form>
</template>

<style scoped></style>
