<template>
    <div class="menu">
        <div class="menu-list-item">
            <router-link to="/overview" class="menu-item" style="margin-top: 16px;">
                <m-icon type="overview"></m-icon>
                <div class="menu-icon-title" v-if="isVisible">Tổng quan</div>
            </router-link>
            <div class="menu-item">
                <m-icon type="emulation"></m-icon>
                <div class="menu-icon-title" v-if="isVisible">Thi đua</div>
                <m-icon type = "arrow-right" v-if="isVisible"></m-icon>
            </div>
            <div class="menu-item">
                <m-icon type="remunerative"></m-icon>
                <div class="menu-icon-title" v-if="isVisible">Khen thưởng</div>
                <m-icon type = "arrow-right" v-if="isVisible"></m-icon>
            </div>
            <div class="menu-item">
                <m-icon type="dicision"></m-icon>
                <div class="menu-icon-title" v-if="isVisible">Quyết định</div>
                <m-icon type = "arrow-right" v-if="isVisible"></m-icon>
            </div>
            <div class="menu-item">
                <m-icon type="file"></m-icon>
                <div class="menu-icon-title" v-if="isVisible">Hồ sơ</div>
                <m-icon type = "arrow-right" v-if="isVisible"></m-icon>
            </div>
            <div class="menu-item">
                <m-icon type="search"></m-icon>
                <div class="menu-icon-title" v-if="isVisible">Tra cứu</div>
                <m-icon type = "arrow-right" v-if="isVisible"></m-icon>
            </div>
            <div class="menu-item">
                <m-icon type="report"></m-icon>
                <div class="menu-icon-title" v-if="isVisible">Báo cáo</div>
            </div>
            <div class="menu-item-border"></div>
            <router-link to="/emulation-title" class="menu-item">
                <m-icon type="category"></m-icon>
                <div class="menu-icon-title" v-if="isVisible">Danh mục</div>
                <m-icon type = "arrow-right" v-if="isVisible"></m-icon>
            </router-link>
            <div class="menu-item">
                <m-icon type="setting"></m-icon>
                <div class="menu-icon-title" v-if="isVisible">Thiết lập</div>
                <m-icon type = "arrow-right" v-if="isVisible"></m-icon>
            </div>
            <div class="menu-item-border"></div>
            <div class="menu-item">
                <m-icon type="instruction"></m-icon>
                <div class="menu-icon-title" v-if="isVisible">Hướng dẫn</div>
                <m-icon type = "arrow-right" v-if="isVisible"></m-icon>
            </div>
        </div>
        <div class="menu-item menu-item-footer" @click="toggle">
            <m-icon type="collapse" :style="{ transform: `rotate(${rotation}deg)` }"></m-icon>
            <span class="menu-title-footer" v-if="isVisible">Thu gọn</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheMenu",
    components: {

    },
    data() {
        return {
            isVisible: true,
            rotation: 0
        }
    },
    methods: {
        /**
         * Quay 180 độ icon menu-collapse khi ẩn hoặc hiện chi tiết menu
         * Author: PAQuân (08/08/2023)
         */
        toggle: function () {
            this.isVisible = !this.isVisible;
            this.rotation += 180
        }
    }
}
</script>

<style>
@import './the-menu.css';
@import '../../css/main.css';
</style>