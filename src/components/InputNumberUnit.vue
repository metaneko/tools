<script setup lang="ts">
import { ref, watch } from 'vue';

interface InputNumberUnitProps {
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
            {{ unit }}
        </template>
    </el-input>
</template>

<style scoped>
.input {
    max-width: 160px;
    min-width: 100px;
    margin-right: 10px;
}
</style>
