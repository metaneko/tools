<script lang="ts" setup>
import {
    Iphone,
    PriceTag,
    Van,
} from '@element-plus/icons-vue'

</script>

<template>
    <el-container class="home-page">
        <el-header>
            <el-menu mode="horizontal" class="el-menu-vertical" :ellipsis="false" default-active="1" router>
                <el-menu-item class="logo" index="0" route="/">
                    <img style="width: 200px;" src="/logo.png" alt="Element logo" />
                </el-menu-item>
                <div class="flex-grow"></div>
                <el-sub-menu index="/caculator" route="/caculator">
                    <template #title>
                        <el-icon>
                            <Iphone />
                        </el-icon>
                        <span>计算器</span>
                    </template>
                    <el-menu-item index="/caculator/cost">
                        花箱成本
                    </el-menu-item>
                    <el-menu-item index="/caculator/single">
                        花箱成本 (旧)
                    </el-menu-item>
                    <el-menu-item index="/caculator/cargo">
                        集装箱
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item index="2" route="/price">
                    <el-icon>
                        <PriceTag />
                    </el-icon>
                    <template #title>价格管理</template>
                </el-menu-item>
                <el-menu-item index="3" route="/express">
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
.home-page {
    height: 100vh;
    background-color: aliceblue;
}

.el-header {
    background-color: white;
}

.el-main {
    width: 720px;
    margin: auto;
    background-color: white;
}

@media only screen and (max-width: 720px) {
    .logo {
        display: none;
    }

    .el-main {
        width: 100%;
    }
}

.flex-grow {
    flex-grow: 1;
}
</style>