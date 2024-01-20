<template>
    <div class="background_popup" style="left: 0px" @keydown.esc="$emit('closeForm')">
        <div class="content_popup">
            <div class="content_popup_header" tabindex="1">
                <div class="content_popup_header-title">{{ this.title }}</div>
                <div class="content_popup_header-icon">
                    <m-icon tabindex="0" ref="helpRef" type="help" :isTooltip="true" titleTooltip="Hướng dẫn"
                        @iconClick="openHelperBlank" @clickShiftTab="$refs.btnCancelRef.focus()"
                        @clickTab="$refs.exitRef.onFocus()"></m-icon>
                    <m-icon tabindex="0" ref="exitRef" type="exit" :isTooltip="true" titleTooltip="Thoát"
                        @iconClick="closePopup" @clickShiftTab="$refs.helpRef.onFocus()"
                        @clickTab="$refs.nameTitle.onFocus()"></m-icon>
                </div>
            </div>
            <div class="content_popup_body">
                <div class="content_popup_body-content">
                    <m-input :label="$emulationResource.EmulationName.name" ref="nameTitle" :isRequired="true"
                        :placeholder="$emulationResource.EmulationName.placeholder"
                        :disable="(objectData.IsSystem == this.$enum.IsSystem.IsSystem)"
                        :warningMaxLength="$emulationResource.EmulationName.warningMaxLength" :maxLength="100"
                        :warningValidate="$emulationResource.EmulationName.warningBlankInput" type="text"
                        v-model="objectData.EmulationName">
                    </m-input>
                </div>
                <div class="content_popup_body-content flex-content">
                    <div class="content_popup_body-detail-content">
                        <m-input :label="$emulationResource.EmulationCode.name" :isRequired="true" ref="emulationCodeRef"
                            :placeholder="$emulationResource.EmulationCode.placeholder"
                            :warningValidate="$emulationResource.EmulationCode.warningBlankInput"
                            :warningConflict="$emulationResource.EmulationCode.warningConflict"
                            :invalidConflict="invalidConflict"
                            :disable="(objectData.IsSystem == this.$enum.IsSystem.IsSystem)"
                            :warningMaxLength="$emulationResource.EmulationCode.warningMaxLength" :maxLength="9" type="text"
                            v-model="objectData.EmulationCode">
                        </m-input>
                    </div>
                    <div class="content_popup_body-detail-content">
                        <m-checkbox :label="$emulationResource.RewardObject.name" :listOptions="listCheckboxObjects"
                            v-model="objectData.EmulationObjectId"
                            :disable="(objectData.IsSystem == this.$enum.IsSystem.IsSystem)"
                            :warningValidate="$emulationResource.RewardObject.warningBlankInput" :isRequired="true">
                        </m-checkbox>
                    </div>
                </div>
                <div class="content_popup_body-content flex-content">
                    <div class="content_popup_body-detail-content">
                        <m-combobox :label="$emulationResource.RewardLevel.name" isRequired="true"
                            :listItem="listRewardLevel" :disable="(objectData.IsSystem == this.$enum.IsSystem.IsSystem)"
                            showList="under" :data="RewardLevelName" @updateData="RewardLevelName = $event"
                            :isRequired="true" :placeholder="$emulationResource.RewardLevel.placeholder"
                            :warningValidate="$emulationResource.RewardLevel.warningBlankInput">
                        </m-combobox>
                    </div>
                    <div class="content_popup_body-detail-content">
                        <m-checkbox :label="$emulationResource.TypeMovement.name" :listOptions="listCheckboxTypes"
                            v-model="objectData.EmulationTypeId"
                            :disable="(objectData.IsSystem == this.$enum.IsSystem.IsSystem)"
                            :warningValidate="$emulationResource.TypeMovement.warningBlankInput" :isRequired="true">
                        </m-checkbox>
                    </div>
                </div>
                <div class="content_popup_body-content">
                    <label @click="$refs.noteInput.focus()">Ghi chú</label>
                    <textarea ref="noteInput" placeholder="Nhập ghi chú" :label="$emulationResource.EmulationNote.name"
                        v-model="objectData.EmulationNote" class="m-text-field-input">
                    </textarea>
                </div>
                <!-- <div class="content_popup_body-content" v-if="(type == this.$resource.typeOfForm.edit.name)">
                    <div class="content_popup_body-detail-content">
                        <label>{{ this.$resource.status.name }}</label>
                        <div class="list-option" style="margin-top: 6px;">
                            <div class="detail-option" v-for="option in listRadioStatus">
                                <m-input type="radio" :value="option.value" v-model="objectData.EmulationStatus"
                                    :titleRadio="option.title" name="objectStatus">
                                </m-input>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="content_popup_footer">

                <m-button ref="btnCancelRef" type="btn-secondary" tabindex="1" title="Hủy" @btnClick="closePopup"
                    @keydown.enter="closePopup" @keydown.tab.prevent="$refs.helpRef.onFocus()"
                    @keydown.shift.tab.prevent="(type == this.$resource.typeOfForm.create.name) ? $refs.btnSave.focus() : $refs.btnEdit.focus()">
                </m-button>

                <m-button type="btn-use" :title="this.$resource.typeOfForm.create.type.add" tabindex="0" ref="btnAdd"
                    v-if="(type == this.$resource.typeOfForm.create.name)"
                    @btnClick="actionToInfoEmualation(this.$resource.typeOfForm.create.name, this.$resource.typeOfForm.create.type.add)"
                    @keydown.enter="actionToInfoEmualation(this.$resource.typeOfForm.create.name, this.$resource.typeOfForm.create.type.add)"
                    @keydown.shift.tab.prevent="$refs.noteInput.focus()">
                </m-button>

                <m-button type="btn-primary" v-if="(type == this.$resource.typeOfForm.create.name)" tabindex="0"
                    ref="btnSave" :title="this.$resource.typeOfForm.create.type.save"
                    @btnClick="actionToInfoEmualation(this.$resource.typeOfForm.create.name, this.$resource.typeOfForm.create.type.save)"
                    @keydown.enter="actionToInfoEmualation(this.$resource.typeOfForm.create.name, this.$resource.typeOfForm.create.type.save)"
                    @keydown.tab.prevent="$refs.btnCancelRef.focus()" @keydown.shift.tab.prevent="$refs.btnAdd.focus()">
                </m-button>

                <m-button ref="btnEdit" type="btn-primary" v-if="(type != this.$resource.typeOfForm.create.name)"
                    tabindex="0" title="Lưu thay đổi" @btnClick="actionToInfoEmualation(this.$resource.typeOfForm.edit, '')"
                    @keydown.enter="actionToInfoEmualation(this.$resource.typeOfForm.edit, '')"
                    @keydown.tab.prevent="$refs.btnCancelRef.focus()">
                </m-button>
            </div>
        </div>
    </div>
</template>
<script>
import { CheckExistCodeEmulation, GetNewCode } from '../../../js/services/emulation'
import { GetDetail, GetAllRecord } from '../../../js/services/base/base-readonly.js'
import { CreateNewRecord, EditRecord } from '../../../js/services/base/base-crud.js'
import { ConvertObjectRewardToAPI, ConvertTypeMovementToAPI, ConvertRewardLevelToAPI, ConvertObjectRewardEnumToData, ConvertTypeMovementEnumToData } from '@/js/helpers/convert-data'
export default {
    name: "MISAPopup",
    /** 
     * Chức năng của các props
     * selectedItem: id của item đang được chọn
     * namePopup: tiêu đề của Form
     * isVisible: hiển thị Form(true, false)
     * optionEdit: hành động thực hiện đối với form: thêm mới (add), sửa (edit)
     * Author: PAQuân (08/08/2023)
    */
    props: ["title", "type", "optionEdit", "selectedId"],
    emits: ["closeForm", "updateVisible", "updateReloadData"],

    async created() {
        const response = await GetAllRecord(this.$resource.API.RewardLevel)
        this.listDataRewardLevel = response.data
        console.log(this.listDataRewardLevel)
        const responseNewCode = await GetNewCode()
        if (responseNewCode.status == 200) {
            this.objectData.EmulationCode = responseNewCode.data
        } else {
            this.$common.setDataToToastMessage(this.$emulationResource.Notification.getNewCode.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
        }

        if (this.type == this.$resource.typeOfForm.edit.name) {
            console.log(this.selectedId)
            this.isVisibleSelect = false;
            const response = await GetDetail(this.$resource.API.Emulation, this.selectedId)
            this.objectData = {
                EmulationName: response.data.EmulationName,
                EmulationCode: response.data.EmulationCode,
                EmulationObjectId: (response.data.EmulationObjectId === this.$enum.objectReward.personal) ? [this.$enum.objectReward.personal] : ((response.data.EmulationObjectId === this.$enum.objectReward.group) ? [this.$enum.objectReward.group] : [this.$enum.objectReward.personal, this.$enum.objectReward.group]),
                EmulationLevelId: response.data.EmulationLevelId,
                EmulationStatus: response.data.EmulationStatus,
                EmulationTypeId: (response.data.EmulationTypeId === this.$enum.typeMovement.frequent) ? [this.$enum.typeMovement.frequent] : ((response.data.EmulationTypeId === this.$enum.typeMovement.batched) ? [this.$enum.typeMovement.batched] : [this.$enum.typeMovement.frequent, this.$enum.typeMovement.batched]),
                EmulationNote: response.data.EmulationNote,
                IsSystem: response.data.IsSystem
            }
            this.RewardLevelName = response.data.RewardLevelName;
            this.EmulationCode = response.data.EmulationCode
        }
    },

    computed: {
        emulationNameValue() {
            return this.objectData.EmulationName;
        }
    },

    data() {
        return {
            invalidObjectData: false,
            index: 0,
            EmulationCode: null,
            rewardLevelValue: '',
            invalidConflict: false,
            listRewardLevel: [this.$emulationResource.RewardLevel.type.government, this.$emulationResource.RewardLevel.type.province, this.$emulationResource.RewardLevel.type.district, this.$emulationResource.RewardLevel.type.ward],
            isVisibleSelect: false,
            objectData: {
                EmulationName: null,
                EmulationCode: null,
                EmulationObjectId: [],
                EmulationLevelId: null,
                EmulationStatus: null,
                EmulationTypeId: [],
                EmulationNote: null,
                IsSystem: 0
            },
            isVisibleMessage: false,
            RewardLevelName: null,
            titleMessage: '',
            selectedIdItem: null,
            listDataRewardLevel: [],
            listCheckboxObjects: [{ value: 0, title: this.$emulationResource.RewardObject.type.personal }, { value: 1, title: this.$emulationResource.RewardObject.type.group }],
            listCheckboxTypes: [{ value: 0, title: this.$emulationResource.TypeMovement.type.frequent }, { value: 1, title: this.$emulationResource.TypeMovement.type.batched }],
            listRadioStatus: [{ value: true, title: this.$emulationResource.Status.type.active }, { value: false, title: this.$emulationResource.Status.type.inactive }]
        }
    },

    mounted() {
        this.$nextTick(() => {
            if (this.type == this.$resource.typeOfForm.create.name) this.$refs.nameTitle.onFocus()
            else if (this.type == this.$resource.typeOfForm.edit.name) this.$refs.noteInput.focus()
        })
    },

    methods: {
        /**
         * Mở form hiển thị các tùy chọn với input select
         * Author: PAQuân (08/08/2023)
         */
        handleShowSelectForm() {
            this.isVisibleSelect = !this.isVisibleSelect
            if (this.isVisibleSelect) this.$ref.objectName.onFocus
        },

        /**
         * Mở trang trợ giúp 
         * Author: PAQuân (08/08/2023)
         */
        openHelperBlank() {
            window.open("https://helpcegov.misa.vn/kb/khai-bao-danh-hieu-thi-dua/", "_blank")
        },

        /**
         * Đóng form
         * Author: PAQuân (08/08/2023)
         */
        closePopup() {
            this.$emit("updateVisible", false)
        },

        /** 
         * Gán giá trị cấp khen thưởng khi chọn
         * Author: PAQuân (08/08/2023)
        */
        setReWardLevelValue(name) {
            this.objectData.level = name;
        },

        /** 
         * Kiểm tra xem hành động chọn mở form thêm mới hay sửa
         * Author: PAQuân (08/08/2023)
        */
        checkedTypeForm() {
            if (this.type == this.$resource.typeOfForm.edit.name) return true;
            else return false;
        },

        /** 
         * Kiểm tra giá trị trong checkbox được chọn
         * Author: PAQuân (08/08/2023)
        */
        checkedValueInCheckbox(option, value) {
            if (option == 2) return true;
            else if (option == value) return true;
            else return false
        },

        /**
         * Thêm mới hoặc sửa thông tin danh hiệu thi đua
         * Author: PAQuân (08/08/2023)
         */
        async actionToInfoEmualation(type, option) {


            // Chuỗi string tương ứng của Guid.Empty
            let stringNewGuid = "00000000-0000-0000-0000-000000000000"

            this.objectData.EmulationObjectId = ConvertObjectRewardToAPI(this.objectData.EmulationObjectId)
            this.objectData.EmulationTypeId = ConvertTypeMovementToAPI(this.objectData.EmulationTypeId)
            this.objectData.EmulationLevelId = ConvertRewardLevelToAPI(this.RewardLevelName, this.listDataRewardLevel)
            if (this.objectData.EmulationLevelId == null || this.objectData.EmulationLevelId == "") this.objectData.EmulationLevelId = stringNewGuid


            this.objectData.IsSystem = 0;

            /**
             * Thêm danh hiệu thi đua mới
             * Author: PAQuân (08/08/2023)
             */
            if (type == this.$resource.typeOfForm.create.name) {
                this.objectData.EmulationStatus = true;
                try {
                    const response = await CreateNewRecord(this.$resource.API.Emulation, this.objectData)
                    if (response.status == 201) {
                        this.$common.showLoadingData()
                        this.$emit("updateVisible", false)
                        this.$emit("updateReloadData", true)
                        if (option == this.$resource.typeOfForm.create.type.save) {
                            this.$common.setDataToToastMessage(this.$emulationResource.Notification.create.save.success, this.$resource.ToastMessage.success, this.$notifyResource.toastMessage.title.success)
                        } else {
                            this.index = 0;
                            this.$common.setDataToToastMessage(this.$emulationResource.Notification.create.add.success, this.$resource.ToastMessage.success, this.$notifyResource.toastMessage.title.success)
                            this.objectData.EmulationCode = null;
                            this.objectData.EmulationName = null;
                            this.objectData.EmulationLevelId = null;
                            this.RewardLevelName = null;
                            this.objectData.EmulationObjectId = [this.$enum.objectReward.personal];
                            this.objectData.EmulationTypeId = [this.$enum.typeMovement.frequent];
                            this.objectData.EmulationNote = null;
                            this.$emit("updateVisible", true)
                        }
                    } else {
                        this.showValidateDataInForm(stringNewGuid, type)
                        this.$common.handleShowDialog(this.$resource.Dialog.error, this.$notifyResource.dialog.title.warning, response.response.data.UserMessage, null)
                    }
                } catch (error) {
                    if (option == this.$resource.typeOfForm.create.type.save) {
                        this.$common.setDataToToastMessage(this.$emulationResource.Notification.create.save.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
                    } else {
                        this.$common.setDataToToastMessage(this.$emulationResource.Notification.create.add.error, this.$resource.ToastMessage.success, this.$notifyResource.toastMessage.title.success)
                    }
                }
            }
            /** 
             * Sửa thông tin danh hiệu thi đua
            * Author: PAQuân (08/08/2023)
            */
            else if (type == this.$resource.typeOfForm.edit) {
                await this.$common.showLoadingData()
                try {
                    const response = await EditRecord(this.$resource.API.Emulation, this.selectedId, this.EmulationCode, this.objectData)
                    console.log(response);
                    if (response.status == 200) {
                        this.$emit("updateReloadData", true)
                        this.$common.setDataToToastMessage(this.$emulationResource.Notification.edit.success, this.$resource.ToastMessage.success, this.$notifyResource.toastMessage.title.success)
                        this.$emit("updateVisible", false)
                    } else {
                        this.showValidateDataInForm(stringNewGuid, type)
                        this.$common.handleShowDialog(this.$resource.Dialog.error, this.$notifyResource.dialog.title.warning, response.response.data.UserMessage, null)
                        if (response.response.status == 409) {
                            this.invalidConflict = true;
                        }
                    }
                } catch (error) {
                    console.log(error);
                    this.$common.setDataToToastMessage(this.$emulationResource.Notification.edit.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
                }
            }
        },

        /**
         * Hiển thị validate trên form khi dữ liệu nhập không phù hợp
         * Author: PAQuân (26/08/2023)
         */
        async showValidateDataInForm(stringNewGuid, type) {
            if (this.objectData.EmulationLevelId == stringNewGuid) this.RewardLevelName = "";
            this.objectData.EmulationObjectId = ConvertObjectRewardEnumToData(this.objectData.EmulationObjectId)
            this.objectData.EmulationTypeId = ConvertTypeMovementEnumToData(this.objectData.EmulationTypeId);
            if (this.objectData.EmulationName == null) {
                this.objectData.EmulationName = "";
                this.$refs.nameTitle.onFocus()
            }
            if (this.objectData.EmulationCode == null) this.objectData.EmulationCode = "";

        }
    },

    watch: {
        emulationNameValue(newVal, oldVal) {
            if (this.index != 0) this.objectData.EmulationCode = this.$refs.nameTitle.getCodeFromData()
            this.index++;
        }
    }

}
</script>
<style>
@import './form-detail-emulation.css';
</style>