<template>
    <div class="example-content-dialog">
        <div class="content-dialog">
            <div class="content-dialog-header">
                <div class="content-dialog-title">{{ title }}</div>
                <m-icon type="exit" @iconClick="$emit('closeDialog')" :isTooltip="true" titleTooltip="Thoát"></m-icon>
            </div>
            <div class="content-dialog-body">
                <m-icon :isDialog="true" :type="type"></m-icon>
                <div class="content-dialog-text" style="margin-left: 16px;">
                    <div v-for="data in content" v-if="(content.length > 1)"><li>{{ data }}</li></div>
                    <div v-for="data in content" v-if="(content.length == 1)">{{ data }}</div>
                </div>
            </div>
            <div class="content-dialog-button">
                <m-button v-if="(type == $resource.Dialog.question)" ref="btnClose" type="btn-secondary"
                    @btnClick="$emit('closeDialog')" title="Hủy" tabindex="0" @keydown.tab.prevent="$refs.btnAccept.focus()"
                    @keydown.enter.prevent="$emit('closeDialog')"></m-button>
                <m-button ref="btnAccept" autofocus type="btn-primary" @btnClick="$emit('actionDialog')" title="Xác nhận"
                    tabindex="0" @keydown.tab.prevent="(type == $resource.Dialog.question) ? $refs.btnClose.focus() : null"
                    @keydown.enter.prevent="$emit('actionDialog')"></m-button>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'MISADialog',

    /** 
     * Chức năng của các props
     * type: loại của dialog (success, error, warnign hay question) 
     * title: tiêu đề của dialog
     * content: nội dung của dialog
     * action: hành động thực hiện khi xác nhận dialog
     * Author: PAQuân (08/08/2023)
    */
    props: ['content', "title", "action", "type"],
    emits: ['closeDialog', 'actionDialog'],

}
</script>
<style>
@import './misa-dialog.css';
</style>