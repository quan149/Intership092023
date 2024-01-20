<template>
    <div class="example-content-message">
        <div class="content-message">
            <m-icon :type="type"></m-icon>
            <div class="message-text message-primary" :class="'notify-' + type">{{ title }}</div>
            <div class="message-text message-secondary">{{ content }}</div>
        </div>
        <div class="message-space"></div>
        <div class="content-message">
            <div class="nav-icon icon-exit" @click="$emit('handleClick')"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "MISAToastMessage",

    /** 
     * Chức năng của các props
     * contentToastMessage: nội dung của Toast Message
     * titleToastMessage: tiêu đề của Toast Message
     * isShowSuccessToastMessage: hiển thị Toast Message (true, false)
     * Author: PAQuân (08/08/2023)
    */
    props: ["content", "title", "type"],
    emits: ["handleClick"],
}
</script>
<style>
@import './misa-toast-message.css';
</style>