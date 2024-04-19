<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

interface ImageSelectItem {
    id: string;
    name: string;
    icon: string;
}

interface ImageSelectProps {
    images: ImageSelectItem[];
}
const props = defineProps<ImageSelectProps>();

const model = defineModel<string>({ required: true });

const icon = ref("");
const name = ref("");

onMounted(() => changeSelect())

watch(() => model.value, changeSelect);

function changeSelect() {
    const selected = props.images.find(v => v.id == model.value)!;
    icon.value = selected.icon;
    name.value = selected.name;
}

</script>

<template>
    <el-select v-model="model" placeholder="请选择规格" style="max-width: 160px;">
        <el-option class="flex-center" v-for="i in images" :key="i.id" :label="i.name" :value="i.id">
            <el-popover placement="bottom" :title="i.name" :width="240" trigger="hover">
                <template #reference>
                    <el-image class="image-small" :src="i.icon" :alt="i.name" fit="contain"></el-image>
                </template>
                <el-image class="image-big" :src="i.icon" :alt="i.name" fit="contain"></el-image>
            </el-popover>
            <span class="text">{{ i.name }}</span>
        </el-option>
        <template #prefix>
            <el-popover placement="bottom" :title="name" :width="240" trigger="hover">
                <template #reference>
                    <el-image class="image-small" :src="icon" :alt="name" fit="contain"></el-image>
                </template>
                <el-image class="image-big" :src="icon" :alt="name" fit="contain"></el-image>
            </el-popover>
        </template>
    </el-select>
</template>

<style lang="scss" scoped>
.image-small {
    width: 24px;
    height: 24px;
    border-radius: 4px;
}

.image-big {
    width: 200px;
    height: 200px;
    border-radius: 10px;
}

.text {
    margin: 0 10px;
}

.flex-center {
    display: flex;
    justify-content: start;
    align-items: center;
}
</style>
