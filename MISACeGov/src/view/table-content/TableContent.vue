<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th class="checkbox-cell"><m-input type="checkbox" v-model="checkedAll"
                            @checkboxClick="handleClickCheckedAll" @handleEnter="handleEnterToClickCheckedAll"></m-input>
                    </th>
                    <th>{{ $emulationResource.EmulationName.name }}</th>
                    <th>{{ $emulationResource.EmulationCode.name }}</th>
                    <th>{{ $emulationResource.RewardObject.name }}</th>
                    <th>{{ $emulationResource.RewardLevel.name }}</th>
                    <th>{{ $emulationResource.TypeMovement.name }}</th>
                    <th style="width: 200px">{{ $emulationResource.Status.name }}</th>
                </tr>
            </thead>
            <tbody ref="selectItemsRef">
                <tr v-for="(option, index) in listOptions" :key="option.EmulationId"
                    @mouseover="handleRowHover(option.EmulationId, true)"
                    @mouseout="handleRowHover(option.EmulationId, false)" :class="{ 'row-selected': option.checked }" class="row-table">
                    <td class="checkbox-cell"><m-input type="checkbox" v-model="option.checked"
                            @checkboxClick="clickIntoCheckbox" @handleEnter="handleEnterClickCheckbox(option)"></m-input>
                    </td>
                    <td v-on:dblclick.prevent="showEditFormPopup(option.EmulationId)">{{ option.EmulationName }}</td>
                    <td v-on:dblclick.prevent="showEditFormPopup(option.EmulationId)">{{ option.EmulationCode }}</td>
                    <td v-on:dblclick.prevent="showEditFormPopup(option.EmulationId)">{{
                        getObjectReward(option.EmulationObjectId) }}</td>
                    <td v-on:dblclick.prevent="showEditFormPopup(option.EmulationId)">{{ option.RewardLevelName }}</td>
                    <td v-on:dblclick.prevent="showEditFormPopup(option.EmulationId)">{{
                        getEmulationType(option.EmulationTypeId) }}</td>
                    <td class="table-status-column">
                        <div class="title-status" v-on:dblclick.prevent="showEditFormPopup(option.EmulationId)">
                            <div v-if="option.EmulationStatus" class="icon-image active"></div>
                            <div v-else class="icon-image disable"></div>
                            <div style="margin-left: 16px;">{{ (option.EmulationStatus) ?
                                $emulationResource.Status.type.active
                                : $emulationResource.Status.type.inactive }}</div>
                        </div>
                    </td>
                    <div class="action-in-row" :class="{ 'hovered': option.EmulationId === hoveredItemId }">
                            <div class="background-round-icon" @click.prevent="showEditFormPopup(option.EmulationId)">
                                <m-icon type="edit" :isTooltip="true" titleTooltip="Sửa"></m-icon>
                            </div>
                            <div class="background-round-icon" @click.prevent="handleShowFormMoreAction(option)">
                                <m-icon type="more" :isTooltip="true" titleTooltip="Thêm"></m-icon>
                            </div>
                        </div>
                        <div class="select-list-item more-action"
                            :class="{ 'list-show': option.EmulationId === selectedId, 'under': (index <= listOptions.length / 2), 'above': (index > listOptions.length / 2) }"
                            v-show="isVisibleMoreAction" style="width: 200px;">
                            <div class="option-select-action" :class="{ 'option-disable': option.EmulationStatus === true }"
                                @click.prevent="setValueStatus(option, true)">Sử dụng</div>
                            <div class="option-select-action"
                                :class="{ 'option-disable': option.EmulationStatus === false }"
                                @click.prevent="setValueStatus(option, false)">Ngừng sử dụng
                            </div>
                            <div class="option-select-action"
                                @click="$common.handleShowDialog($resource.Dialog.question, $notifyResource.dialog.title.warning, [$emulationResource.QuestionDialog.delete.only + option.EmulationName + '?'], handleDeleteWithId)">
                                Xóa</div>
                        </div>
                </tr>
                <div v-if="(listDataItems.length == 0)" class="empty-table-item">
                    <div>Không có dữ liệu...</div>
                </div>
            </tbody>
        </table>
    </div>
</template>
<script>
import { EditRecord , DeleteRecordById } from '@/js/services/base/base-crud';
import { ConvertTypeMovementToString, ConvertObjectRewardToString } from '@/js/helpers/convert-data';
export default {
    emits: ["updateListDataItems", "updateCheckedAll", "updateTotalPage", 'updateVisibleDialog'],
    props: ["isCheckedAllItems", "isVisibleLoading", "listDataItems", "isVisibleLoading", "numberPage", "numberItem", "totalPage"],

    mounted() {
        document.addEventListener("click", this.handleOutsideClick)
    },

    computed: {
        /**
         * Lấy danh sách các item được chọn
         * Author: PAQuân (08/08/2023)
         */
        selectedItems() {
            return this.listOptions.filter(item => item.checked);
        }
    },

    beforeUnmount() {
        document.removeEventListener("click", this.handleOutsideClick)
    },

    methods: {
        /**
         * Lấy giá trị loại phong trào để hiển thị lên bảng
         * @param {*} id: enum của loại phong trào tương ứng
         * Author: PAQuân (08/08/2023)
         */
        getEmulationType(id) {
            return ConvertTypeMovementToString(id)
        },

        /**
        * Lấy giá trị đối tượng khen thưởng để hiển thị lên bảng
        * @param {*} id: enum của đối tượng khen thưởng tương ứng
        * Author: PAQuân (08/08/2023)
        */
        getObjectReward(id) {
            return ConvertObjectRewardToString(id)
        },

        /**
        * Lấy giá trị đối tượng khen thưởng để hiển thị lên bảng
        * @param {*} id: enum của đối tượng khen thưởng tương ứng
        * Author: PAQuân (08/08/2023)
        */
        getObjectReward(id) {
            return ConvertObjectRewardToString(id)
        },

        /**  
         * Ẩn danh sách chọn khi click ra khỏi phạm vi của list
         * Author: PAQuân (08/08/2023)
        */
        handleOutsideClick(event) {
            if (!this.$refs.selectItemsRef.contains(event.target)) {
                this.selectedId = null;
            }
        },

        /** 
         * Đổi màu từng hàng khi hover vào
         * Author: PAQuân (08/08/2023)
        */
        handleRowHover(id, status) {
            if (status) {
                this.hoveredItemId = id;
            } else {
                this.hoveredItemId = null
            }
        },

        /** 
         * Hiển thị form chọn nhiều hành động khi click vào button tương ứng
         * Author: PAQuân (08/08/2023)
        */
        handleShowFormMoreAction(option) {
            if (option.EmulationId === this.selectedId) {
                this.isVisibleMoreAction = !this.isVisibleMoreAction
            } else {
                this.selectedId = option.EmulationId;
                this.isVisibleMoreAction = true;
            }
        },

        /** 
         * Chọn checkbox tất cả các hàng khi checkbox all được chọn
         * Author: PAQuân (08/08/2023)
        */
        handleClickCheckedAll() {
            if (this.checkedAll) {
                for (const item of this.listDataItems) {
                    item.checked = true;
                }
                this.$emit('updateCheckedAll', true)
            } else {
                for (const item of this.listDataItems) {
                    item.checked = false;
                }
                this.$emit('updateCheckedAll', false)
            }
            console.log(this.selectedItems)
        },

        /** 
         * Chọn hoặc bỏ chọn các hàng khi chọn checkbox all 
         * Author: PAQuân (28/08/2023)
        */
        handleEnterToClickCheckedAll() {
            this.checkedAll = !this.checkedAll;
            this.handleClickCheckedAll()
        },

        /** 
         * Chọn hoặc bỏ chọn checkbox bằng cách enter 
         * Author: PAQuân (28/08/2023)
        */
        handleEnterClickCheckbox(option) {
            option.checked = !option.checked
        },

        /** 
         * Kiểm tra khi chọn từng checkbox (nếu tất cả các checkbox được chọn thì checbox all tự động được chọn và ngược lại)
         * Author: PAQuân (08/08/2023)
        */
        clickIntoCheckbox() {
            if (this.selectedItems.length == this.listDataItems.length) {
                this.checkedAll = true
                this.$emit('updateCheckedAll', true)
            } else {
                this.checkedAll = false;
                this.$emit('updateCheckedAll', false)
            }
            console.log(this.listOptions)
        },

        /** 
         * Mở form sửa đổi khi click vào button sửa
         * Author: PAQuân (08/08/2023)
        */
        showEditFormPopup(id) {
            this.$common.handleShowForm(this.$resource.typeOfForm.edit.name, this.$resource.typeOfForm.edit.title, id)
            this.selectedId = null
        },

        /** 
         * Thay đổi giá trị của status khi chọn status tương ứng
         * Author: PAQuân (08/08/2023)
        */
        async setValueStatus(option, value) {
            this.$common.showLoadingData()
            option.EmulationStatus = value
            this.isVisibleMoreAction = false;
            const response = await EditRecord(this.$resource.API.Emulation, option.EmulationId, option)
            try {
                if (response.status == 200) {
                    this.$common.setDataToToastMessage(this.$emulationResource.Notification.updateStatus.success, this.$resource.ToastMessage.success, this.$notifyResource.toastMessage.title.success)
                } else {
                    this.$common.setDataToToastMessage(this.$emulationResource.Notification.updateStatus.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
                }
            } catch (error) {
                console.log(error);
                this.$common.setDataToToastMessage(this.$emulationResource.Notification.updateStatus.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
            }
        },

        /** 
         * Xóa phần tử có id xác định
         * Author: PAQuân (08/08/2023)
        */
        async handleDeleteWithId() {
            this.$common.showLoadingData()
            try {
                const response = await DeleteRecordById(this.$resource.API.Emulation, this.selectedId)
                if (response.status == 200) {
                    this.$common.setDataToToastMessage(this.$emulationResource.Notification.delete.only.success, this.$resource.ToastMessage.success, this.$notifyResource.toastMessage.title.success)
                } else {
                    this.$common.setDataToToastMessage(this.$emulationResource.Notification.delete.only.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
                }
            } catch (error) {
                this.$common.setDataToToastMessage(this.$emulationResource.Notification.delete.only.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
            }
            this.$emit('updateVisibleDialog', false)
        },

        /** 
         * Chọn tất cả khi click nào input checkall
         * Author: PAQuân (08/08/2023)
        */        
        clickToCheckedAll() {
            if (this.checkedAll) {
                for (let option of this.listOptions) {
                    option.checked = true
                }
            } else {
                for (let option of this.listOptions) {
                    option.checked = false
                }
            }
        },
    },

    watch: {
        checkedListItems() {
            this.clickIntoCheckbox();
        },

        listOptions() {
            this.$emit('updateListDataItems', this.listOptions)
            console.log(this.selectedItems)
            // if (this.selectedItems.length == this.listOptions.length) {
            //     this.checkedAll = true
            //     this.$emit('updateCheckedAll', true);
            // }
            // else {
            //     this.$emit('updateCheckedAll', false);
            //     this.checkedAll = true;
            // }
        },

        listDataItems() {
            this.listOptions = this.listDataItems
        },
        isCheckedAllItems() {
            this.checkedAll = this.isCheckedAllItems
        },

        numberItem() {
            this.listOptions = this.listDataItems;
        },

        numberPage() {
            this.listOptions = this.listDataItems;
        }
    },

    data() {
        return {
            listOptions: null,
            hoveredItemId: null,
            selectedId: null,
            checkedItems: [],
            checkedAll: false,
            isVisibleMoreAction: false,
            confirmAction: false,
            typeAction: null,
            EmulationType: null
        }
    },
}
</script>
<style scoped>
@import './table-content.css';
</style>