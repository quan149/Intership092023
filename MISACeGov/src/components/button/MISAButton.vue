<template>
    <div ref="btnRef" class="btn" :class="type, {'btn-disable': disable}, {'btn-with-action': (hasIcon || isOnlyIcon)}, {'btn-only-icon': isOnlyIcon}" style="margin-left: 12px;" @click="$emit('btnClick')"> 
        <m-icon :type="typeIcon" :isTooltip="isTooltip" :titleTooltip="titleTooltip" v-if="(hasIcon || isOnlyIcon)"></m-icon>
        <div style="margin-left: 4px;" v-if="hasIcon"></div>
        <div class="title-btn" v-if="!isOnlyIcon">{{ title }}</div>
    </div>
</template>
<script>
export default {
    /** 
     * Chức năng của các props
     * title: tiêu đề của button
     * type: loại button (primary, secondary, use, delete)
     * typeIcon: loại icon (với button có icon)
     * hasIcon: có icon hay không (true hoặc false)
     * isOnlyIcon: button chỉ gồm icon mà không có title (true hoặc false)
     * isTooltip: có tooltip hay không (true hoặc false)
     * titleTooltip: nội dung tooltip
     * Author: PAQuân (08/08/2023)
    */
    props: ["title", "type", "disable", "typeIcon", "hasIcon", "isOnlyIcon","isTooltip","titleTooltip"],
    emits: ['btnClick'],
    methods: {
        /**
         * Focus vào button
         * Author: PAQuân (26/08/2023)
         */
        focus() {
            this.$refs.btnRef.focus();
        }
    }
}
</script>
<style scoped>
@import './misa-button.css' 
</style>