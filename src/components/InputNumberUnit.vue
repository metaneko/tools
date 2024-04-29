<script setup lang="ts">
import { ref, watch } from 'vue';

interface InputNumberUnitProps {
    code?: string;
    unit: string;
    placeholder: string;
}
defineProps<InputNumberUnitProps>();

const model = defineModel<number>({ required: true });

const inputText = ref(model.value + "");

watch(() => inputText.value, () => {
    model.value = parseFloat(inputText.value);
})

</script>

<template>
    <el-input class="input" v-model="inputText" :placeholder="placeholder">
        <template #suffix v-if="unit">
            <span class="unit">{{ unit }}</span><span v-if="code" class="small"> ({{ code }}) </span>
        </template>
    </el-input>
</template>

<style lang="scss" scoped>
.input {
    max-width: 160px;
    min-width: 100px;
    margin-right: 10px;

    .unit {
        font-size: 12px;
    }

    .small {
        margin-left: 4px;
        font-size: 10px;
    }
}
</style>
