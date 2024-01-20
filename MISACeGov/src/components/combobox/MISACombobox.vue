<template>
    <div class="misa-combobox" ref="combobox" @click="handleShowOptionList" @keydown.enter="handleShowOptionList"
        @keydown.arrow-down="handleKeyDown" @keydown.arrow-up="handleKeyUp">

        <label :class="{ 'required-information': isRequired }" @click="focusInput">{{ label }}</label>

        <div style="position: relative;">
            <m-input type="text" :readonly="readonly" v-model="dataValue" :placeholder="placeholder" ref="inputCombobox"
                :disable="disable" :invalidData="invalid" :value="dataValue">
            </m-input>
            <div class="icon-dropdown-combobox">
                <m-icon type="dropdown"></m-icon>
            </div>
        </div>

        <div v-if="invalid" class="warning-title-validate">{{ warningValidate }}</div>

        <div v-if="(isVisible)" class="select-list-item list-show"
            :class="{ 'invalid-show': invalid, 'show-above': showList == 'above' }" :listItem="listItem">
            <div class="option-select" v-for="item in defaultListOption" @click="clickSetData(item)"
                :class="{ 'selected': dataValue == item }">
                {{ item }}
                <m-icon v-if="(dataValue == item)" type="selected"></m-icon>
            </div>

        </div>

    </div>
</template>
<script>

export default {
    /** 
     * Chức năng của các props
     * isRequire: có phải thông tin bắt buộc hay không (true/false)
     * placeholder: text hiển thị khi ô nhập liệu để trống
     * WarningValidate: các cảnh báo khi để trống các ô bắt buộc
     * data: giá trị ban đầu
     * disable: chỉ định input chỉ đọc (readonly/none)
     * listItem: danh sách các lựa chọn
     * showList: vị trí hiển thị danh sách lựa chọn ở dưới (under) hay trên (above) ô input
     * Author: PAQuân (08/08/2023)
    */
    props: ["readonly", "label", "listItem", "data", "showList", "disable", "isRequired", "warningValidate", "placeholder", "name", "value"],
    emits: ["updateData", "updateVisibleCombobox"],

    mounted() {
        this.dataValue = this.data
        this.defaultListOption = this.listItem
        document.addEventListener("click", this.handleOutsideClick)
    },

    beforeUnmount() {
        document.removeEventListener("click", this.handleOutsideClick);
    },

    data() {
        return {
            dataValue: null,
            isVisible: false,
            defaultListOption: null,
            invalid: false,
            invalidValidate: false,
            checkedInputData: false,
        }
    },

    methods: {
        /**  
         * Ẩn danh sách chọn khi click ra khỏi phạm vi của comcobox
         * Author: PAQuân (08/08/2023)
        */
        handleOutsideClick(event) {
            if (!this.$refs.combobox.contains(event.target)) {
                this.isVisible = false;
                if (this.defaultListOption.length == 0) this.dataValue = ''
            }
        },

        /**
         * Hiển thị danh sách chọn
         * Author: PAQuân (08/08/2023)
         */
        handleShowOptionList() {
            if (!this.disable) {
                this.isVisible = !this.isVisible;
                this.defaultListOption = this.listItem
            }
        },

        /**
        * Di chuyển bằng mũi tên xuống 
        * Author: PAQuân (06/09/2023) 
        */
        handleKeyDown() {
            if (this.dataValue == null || this.dataValue == "") this.dataValue = this.listItem[0]
            else {
                let position;
                for (let i = 0; i < this.listItem.length; i++) {
                    if (this.dataValue == this.listItem[i]) {
                        position = i;
                    }
                }
                if (position == this.listItem.length - 1) this.dataValue = this.listItem[0]
                else this.dataValue = this.listItem[position + 1]
            }
        },

        /**
         * Di chuyển bằng mũi tên lên
         * Author: PAQuân (06/09/2023) 
         */
        handleKeyUp() {
            if (this.dataValue == null || this.dataValue == "") this.dataValue = this.listItem[this.listItem.length - 1]
            else {
                let position;
                for (let i = 0; i < this.listItem.length; i++) {
                    if (this.dataValue == this.listItem[i]) {
                        position = i;
                    }
                }
                if (position == 0) this.dataValue = this.listItem[this.listItem.length - 1]
                else this.dataValue = this.listItem[position - 1]
            }
        },

        /** 
         * Thay đổi data khi chọn vào một option bất kỳ
         * Author: PAQuân (08/08/2023)
        */
        clickSetData(data) {
            this.dataValue = data
            this.isVisible = false;
        },
    },
    watch: {
        dataValue() {
            console.log(this.dataValue)
            if (this.dataValue !== '' && this.dataValue !== this.data && (!this.disable) && this.readonly != 'readonly') this.isVisible = true
            if (this.dataValue == '') {
                this.invalid = true;
            }
            else this.invalid = false
            this.$emit('updateData', this.dataValue)
        },
        data() {
            this.dataValue = this.data

        },
        isVisible() {
            this.$emit('updateVisibleCombobox', this.isVisible)
        }
    }
}
</script>
<style scope>
@import './misa-combobox.css'
;
</style>