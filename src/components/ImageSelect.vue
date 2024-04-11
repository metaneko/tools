<script setup lang="ts">
import { Picture } from "@element-plus/icons-vue";
import { ref, watch } from "vue";

interface ImageSelectItem {
    id: string;
    name: string;
    icon: string;
}

interface ImageSelectProps {
    width: string;
    height: string;
    images: ImageSelectItem[];
}
defineProps<ImageSelectProps>();

const model = defineModel<string>({ required: true });
const selected = ref(model.value + "");

watch(() => selected.value, () => model.value = selected.value);

</script>

<template>
    <el-radio-group v-model="selected">
        <el-radio v-for="i in images" :key="i.id" :value="i.id" border>
            <el-image :src="i.icon" :width="width" :height="height" fit="fill" :alt="i.name" class="image">
                <template #error>
                    <el-icon>
                        <Picture />
                    </el-icon>
                </template>
            </el-image>
        </el-radio>
    </el-radio-group>
</template>

<style scoped>
.image {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
