<script lang="ts" setup>
import {
    Iphone,
    PriceTag,
    Van,
} from '@element-plus/icons-vue'

</script>

<template>
    <el-container>
        <el-header>
            <el-menu mode="horizontal" class="el-menu-vertical" :ellipsis="false" default-active="1" router>
                <el-menu-item index="0">
                    <img style="width: 100px;" src="https://element-plus.org/images/element-plus-logo.svg"
                        alt="Element logo" />
                </el-menu-item>
                <div class="flex-grow"></div>
                <el-menu-item index="1" route="cost">
                    <el-icon>
                        <Iphone />
                    </el-icon>
                    <span>计算器</span>
                </el-menu-item>
                <el-menu-item index="2" route="single">
                    <el-icon>
                        <PriceTag />
                    </el-icon>
                    <template #title>价格管理</template>
                </el-menu-item>
                <el-menu-item index="3" route="cargo">
                    <el-icon>
                        <Van />
                    </el-icon>
                    <template #title>物流管理</template>
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<style lang="scss" scoped>
.flex-grow {
    flex-grow: 1;
}
</style>