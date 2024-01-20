<template>
    <div ref="iconRef" v-if="(!isDialog)" class="nav-icon" :class="'icon-' + type + (isTooltip ? ' tooltip' : '')"
        :tabindex="tabindex" :style="style" @click="$emit('iconClick')" @keydown.tab.prevent="$emit('clickTab')"
        @keydown.shift.tab.prevent="$emit('clickShiftTab')" @keydown.enter.prevent="$emit('handleEnter')">
        <span class="tooltiptext" v-if="isTooltip" style="bottom: 24px; right: -12px">
            {{ titleTooltip }}
        </span>
    </div>
    <div v-if="isDialog" class="icon-dialog" :class="'icon-' + type"></div>
</template>
<script>

export default {
    /**
    * Chức năng của các props
    * type: loại icon 
    * isDialog: phải icon-dialog không? (true hoặc false)
    * isTooltip: có tooltip hay không? (true hoặc false)
    * titleTooltip: nội dung của tooltip
    * stye: định nghĩa thêm về style
    */
    props: ['type', 'isDialog', 'isTooltip', 'titleTooltip', 'tabindex', 'style'],
    emits: ['iconClick', 'clickTab', 'clickShiftTab', 'handleEnter'],
    methods: {
        onFocus() {
            this.$refs.iconRef.focus();
        },
    },
}
</script>
<style>
@import './misa-icon.css';
@import './misa-tooltip.css'
</style>