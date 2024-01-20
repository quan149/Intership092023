<template>
    <label :class="{ 'required-information': isRequired }" @click="onFocus">{{ label }}</label>

    <div>
        <input v-if="(type != 'radio' && type != 'checkbox' && type != 'checkboxList')" :type="type" v-model="dataValue"
            :placeholder="placeholder"
            :class="{ 'input-warning-validate': (invalid || invalidMaxLength || invalidConflictData), 'disable-input': disable }"
            style="margin-top: 8px;" :readonly="readonly" ref="inputValue" @keydown.enter="$emit('handleEnter')" @blur="$emit('handleBlur')">
    </div>

    <input v-if="(type == 'radio' || type == 'checkbox')" :type="type" :value="value" v-model="dataValue"
        :class="{ 'disable-input': disable }" style="margin-left: 8px;" @change="$emit('checkboxClick')"
        @keydown.enter="$emit('handleEnter')">

    <input v-if="(type == 'checkboxList')" type="checkbox" :name="name" :value="value" v-model="dataModelCheckbox"
        :class="{ 'disable-input': disable }" @keydown.enter="$emit('handleEnter')">

    <div v-if="(type == 'number')" class="icon-change-value">
        <m-icon type="dropdown" :style="{ transform: `rotate(${180}deg)` }" @iconClick = "increaseValue"></m-icon>
        <m-icon type="dropdown" @iconClick = "decreaseValue"></m-icon>
    </div>
    <label v-if="(type == 'radio')" style="margin-top: 3px; margin-left: 4px">{{ titleRadio }}</label>
    <div class="warning-title-validate" v-if="invalid">{{ warningValidate }}</div>
    <div v-if="invalidMaxLength" class="warning-title-validate">{{ warningMaxLength }}</div>
    <div v-if="invalidConflictData" class="warning-title-validate">{{ warningConflict }}</div>
</template>
<script>
export default {
    name: "MISAButton",

    /** 
     * Chức năng của các props
     * isRequire: có phải thông tin bắt buộc hay không (true/false)
     * placeholder: text hiển thị khi ô nhập liệu để trống
     * warningValidate: các cảnh báo khi để trống các ô bắt buộc
     * type: loại input (text, checkbox, checkboxList - dùng cho list gồm nhiều checkbox, radio, textarea)
     * readonly: chỉ định input chỉ đọc (readonly/none)
     * value: giá trị của ô input
     * label: tiêu đề của input
     * warningConflict: thông báo khi dữ liệu nhập bị trùng/đã tồn tại
     * titleRadio: nội dung của radio
     * maxLength: độ dài tối đa của dữ liệu trong input
     * hasIcon: input có icon hay không?
     * Author: PAQuân (08/08/2023)
    */
    props: ["warningConflict", "titleRadio","invalidConflict", "hasIcon", "modelValue", "label", "isRequired", "invalidData", "placeholder", "warningValidate", "type", "listOptions", "readonly", "disable", "value", "name", "warningMaxLength", "maxLength"],
    emits: ["update:modelValue", "updateInvalidData", "handleEnter", "handleBlur", "checkboxClick"],

    data() {
        return {
            dataValue: null,
            dataModelCheckbox: [],
            invalid: false,
            invalidMaxLength: false,
            hasIconDelete: true,
            invalidConflictData: false,
        }
    },

    methods: {
        /**
         * Validate dữ liệu khi nhập
         * Author: PAQuân (08/08/2023)
         */
        validateData() {
            if (this.dataValue == '' && this.isRequired) {
                this.invalid = true;
                this.$emit("updateInvalidData", true)
            } else {
                this.invalid = false
                this.$emit("updateInvalidData", false)
            }
        },

        /**
         * Set focus cho input
         * Author: PAQuân (08/08/2023)
         */
        onFocus() {
            this.$refs.inputValue.focus();
        },

        /**
         * Tạo nã viết tắt từ dữ liệu của input
         * Author: PAQuân (08/08/2023)
         */
        getCodeFromData() {
            var code = "";
            if (this.dataValue != null && this.dataValue != '') {
                var listString = this.dataValue.split(" ");
                for (const string of listString) {
                    let charCode = string.charAt(0);
                    if (["Ă", "Ắ", "Ằ", "Ẳ", "Ẵ", "Ạ", "Â", "Ấ", "Ầ", "Ẩ", "Ẫ", "Ậ", "Á", "À", "Ả", "Ã", "Ạ"].includes(charCode.toUpperCase())) {
                        charCode = "A"
                    } else if (["É", "Ẽ", "Ẻ", "Ẹ", "Ẻ", "Ê", "Ế", "Ề", "Ể", "Ễ", "Ệ"].includes(charCode.toUpperCase())) {
                        charCode = "E"
                    } else if (["Ó", "Ò", "Ỏ", "Õ", "Ọ", "Ô", "Ố", "Ồ", "Ổ", "Ỗ", "Ộ", "Ơ", "Ớ", "Ờ", "Ở", "Ỡ", "Ợ"].includes(charCode.toUpperCase())) {
                        charCode = "O"
                    } else if (["Ú", "Ù", "Ủ", "Ũ", "Ụ", "Ư", "Ứ", "Ừ", "Ử", "Ữ", "Ự"].includes(charCode.toUpperCase())) {
                        charCode = "U"
                    }
                    code += charCode
                }
            }
            if (code == "") return ""
            else return code.toUpperCase();
        },

        /**
         * Tăng giá trị của input lên 1 đơn vị (với type = number)
         * Author: PAQuân (08/08/2023)
         */
        increaseValue() {
            this.dataValue++;
        },

        /**
         * Giảm giá trị của input xuống 1 đơn vị (với type = number)
         * Author: PAQuân (08/08/2023)
         */
        decreaseValue() {
            if (this.dataValue > 1) this.dataValue-- 
        }
    },

    watch: {
        dataValue() {
            this.$emit("update:modelValue", this.dataValue)
            this.validateData();
            if (this.maxLength > 0 && (this.dataValue != "" && this.dataValue != null)) {
                if (this.dataValue.length > this.maxLength) {
                    this.invalidMaxLength = true;
                } else {
                    this.invalidMaxLength = false;
                }
            }
            this.invalidConflictData = false;
        },

        invalidData() {
            this.invalid = this.invalidData
        },

        dataModelCheckbox() {
            this.$emit("update:modelValue", this.dataModelCheckbox)
            this.validateData();
            console.log(this.dataValue)
        },

        modelValue() {
            this.dataValue = this.modelValue
            this.dataModelCheckbox = this.modelValue
        },

        invalidConflict() {
            this.invalidConflictData = this.invalidConflict
        }
    }
}
</script>
<style scoped>
@import './misa-input.css';
</style>