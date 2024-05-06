<script setup lang="ts">
interface TableItem {
    code: string;
    name: string;
    sf: number;
    jd: number;
    best: number;
    yimi: number;
    deppon: number;
}

const tableData: TableItem[] = [
    { code: "35", name: "名称", sf: 100, jd: 100, best: 100, yimi: 100, deppon: 100 }
];

</script>

<template>
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="sf" label="顺丰" />
        <el-table-column prop="jd" label="京东" />
        <el-table-column prop="best" label="百世" />
        <el-table-column prop="yimi" label="一米" />
        <el-table-column prop="deppon" label="德邦" />
    </el-table>
</template>

<style scoped></style>
