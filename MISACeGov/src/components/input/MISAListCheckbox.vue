<template>
    <label :class="{ 'required-information': isRequired }">{{ label }}</label>
    <div class="list-option" style="margin-top: 6px;">
        <div class="detail-option" v-for="option in listOptions">
            <m-input type="checkboxList" :value="option.value" v-model="dataValue" :disable="disable"></m-input>
            <div class="title-option" style="margin-top: 4px; margin-left: 8px">{{ option.title }}</div>
        </div>
    </div>
    <div class="warning-title-validate" v-if="invalid">{{ warningValidate }}</div>
</template>
<script>
export default {
    
    /** 
     * Chức năng của các props
     * isRequire: có phải thông tin bắt buộc hay không (true/false)
     * listOptions: các giá trị của tương ứng với từng ô checkbox
     * warningValidate: các cảnh báo khi để trống các ô bắt buộc
     * label: Tiêu đề của list checkbox
     * disable: true hoặc false
     * Author: PAQuân (08/08/2023)
    */
    props: ["modelValue", "label", "listOptions", "isRequired", "warningValidate", "disable"],
    emits: ["update:modelValue", "updateInvalidData"],
    data() {
        return {
            dataValue: [],
            invalid: false,
        }
    },

    methods: {
        /**
         * Validate dữ liệu khi nhập
         * Author: PAQuân (08/08/2023)
         */
        validateData() {
            if ((this.isRequired) && this.dataValue.length == 0) {
                this.invalid = true;
                this.$emit("updateInvalidData", true)
            } else {
                this.invalid = false
                this.$emit("updateInvalidData", false)
            }
        },
    },
    watch: {
        dataValue() {
            this.$emit("update:modelValue", this.dataValue)
            this.validateData()
            console.log(this.dataValue)
        },

        modelValue(){
            this.dataValue = this.modelValue
        }
    }
}
</script>
<style>
@import './misa-input.css';
</style>