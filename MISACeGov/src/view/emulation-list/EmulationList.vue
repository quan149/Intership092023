<template>
    <div class="content">
        <div class="title-content">Danh hiệu thi đua</div>
        <div class="content_header">
            <div class="content_header-left">
                <div class="input-with-action" style="width: 280px;">
                    <input class="input-search-item" placeholder="Nhập mã hoặc tên danh hiệu..." v-model="filterData">
                    <m-icon type="search icon-with-input" style="bottom: 6px; left: 10px"></m-icon>
                </div>
                <m-icon type="exit" style="position: absolute; bottom: 6px; right: 120px" v-if="showIconDeleteData"
                    @iconClick="deleteFilterData"></m-icon>
                <div ref="filterFormRef">
                    <m-button type="btn-secondary" :hasIcon="true" :typeIcon='typeIconFilter'
                        @btnClick="handleShowFilterForm" title="Bộ lọc"></m-button>
                    <m-filter-form v-if="isVisibleFilterForm" :visibleFilterForm="isVisibleFilterForm"
                        @updateVisible="isVisibleFilterForm = $event" @updateIsFiltered="isFiltered = $event"
                        :filterLevelId="filterLevelId" @updateFilterLevelId="filterLevelId = $event"
                        :filterObjectId="filterObjectId" @updateFilterObjectId="filterObjectId = $event"
                        :filterTypeId="filterTypeId" @updateFilterTypeId="filterTypeId = $event"
                        :filterStatus="filterStatus" @updateFilterStatus="filterStatus = $event">
                    </m-filter-form>
                </div>
            </div>
            <div class="title-disable-filter" v-if="isFiltered" @click="unFiltered" style="border-left: 16px;">Bỏ lọc</div>
            <div class="content_header-space"></div>
            <m-button title="Thêm danh hiệu" type="btn-primary" typeIcon='add' :hasIcon="true"
                v-if="this.checkedCheckItem()" @btnClick="handleShowForm($resource.typeOfForm.create.name, $resource.typeOfForm.create.title, null)"></m-button>
            <div class="action-check-row" v-show="!this.checkedCheckItem()">
                <div class="number-checked-row">Đã chọn <span style="font-weight: 700;">{{
                    this.selectedItems.length }}</span></div>
                <div class="title-deselected-all" @click="deSelectedCheckbox">Bỏ chọn</div>
                <m-button type="btn-use" :disable="!this.checkedListUsed(false)" title="Sử dụng"
                    @btnClick="handleClickUseItem(true)"></m-button>
                <m-button type="btn-secondary" :disable="!this.checkedListUsed(true)" title="Ngừng sử dụng"
                    @btnClick="handleClickUseItem(false)"></m-button>
                <m-button type="btn-delete" title="Xóa"
                    @btnClick="handleShowDialog($resource.Dialog.question, $notifyResource.dialog.title.warning, [$emulationResource.QuestionDialog.delete.many], handleClickDeleteItem)"></m-button>
            </div>
            <div ref="excelRef" style="position: relative;">
                <m-button type="btn-secondary" :isOnlyIcon="true" typeIcon="more" v-if="this.checkedCheckItem()"
                    @btnClick="isVisibleExcelOption = !isVisibleExcelOption"></m-button>
                <div class="select-list-item form-more-action" v-if="isVisibleExcelOption"
                    style="display: block; width: 200px;">
                    <div class="option-select-action" @click="handleVisileImportExcel">Nhập khẩu</div>
                    <div class="option-select-action" @click="exportExcelFile">Xuất khẩu</div>
                </div>
            </div>
        </div>
        <m-table :isCheckedAllItems="isCheckedAll" @updateCheckedAll="isCheckedAll = $event" :listDataItems="listData"
            @updateVisibleDialog="isVisibleDialog = $event">
        </m-table>
        <div class="content_paging-table">
            <div class="content_paging-title">Tổng số: <span class="content_paging-number-item">{{ totalRecord }}</span>
                bản ghi</div>
            <div class="content_paging-space"></div>
            <div class="content_paging-right">
                <div class="content_paging-title right">Số bản ghi/trang: </div>
                <m-combobox :listItem="numberItemOptions" class="number-option" readonly="readonly" :data="numberItemInPage"
                    @updateData="numberItemInPage = $event" showList="above"></m-combobox>
                <div class="content_paging-title right"><span class="content_paging-number-item">{{ (numberPage - 1) *
                    numberItemInPage + 1 }} - {{ (numberPage - 1) * numberItemInPage + listData.length }}</span> bản ghi
                </div>
                <div class="content_paging-icon" style="margin-left: 16px;">
                    <m-icon type="next" v-if="(numberPage > 1)" :style="{ transform: `rotate(${180}deg)` }"
                        @iconClick="movePrePage"></m-icon>
                    <m-icon type="next-disable" v-if="(numberPage == 1 && (totalRecord != 0))"></m-icon>
                    <m-icon type="next" v-if="(numberPage < totalPage)" @iconClick="moveNextPage"></m-icon>
                    <m-icon type="next-disable" v-if="(numberPage == totalPage)"
                        :style="{ transform: `rotate(${180}deg)` }"></m-icon>
                </div>
            </div>
        </div>
    </div>
    <m-popup v-if="isVisibleForm" :title="titleForm" :type="typeForm" :selectedId="selectedId"
        @updateVisible="isVisibleForm = $event" @closeForm="handleCloseForm" @updateReloadData="isReloadData = $event">
    </m-popup>
    <m-loading-data v-if="isVisibleLoadingData">
    </m-loading-data>
    <m-toast-message v-if="isVisibleMessage" :type="typeToastMessage" :content="contentMessage" :title="titleMessage"
        @handleClick="handleCloseToastMessage">
    </m-toast-message>
    <m-dialog v-if="isVisibleDialog" :type="typeDialog" :content="contentDialog" :title="titleDialog"
        :action="confirmAction" @closeDialog="handleCloseDialog" @actionDialog="typeAction">
    </m-dialog>
    <m-excel-form v-if="isVisibleExcelForm" @handleClose="handleCloseImportExcel"
        @updateVisible="isVisibleExcelForm = $event"></m-excel-form>
</template>

<script>
import { FilterDataEmulations, UpdateStatusMultipleEmulations, ExportExcel } from '../../js/services/emulation'
import { DeleteManyRecordByListIds } from '@/js/services/base/base-crud';
import axios from 'axios'
import { ConvertObjectRewardToAPI, ConvertTypeMovementToAPI, ConvertRewardLevelToAPI, ConvertStatusToAPI } from '@/js/helpers/convert-data'
import { debounce } from 'lodash';
export default {
    name: "TheContent",

    async created() {
        this.showLoadingData();
        const response = await axios.get("https://localhost:7209/api/v1/RewardsLevel")
        this.listDataRewardLevel = response.data
        this.getDataFromAPI()
    },

    mounted() {
        //document.addEventListener("click", this.handleOutsideClick)
        this.$emitter.on('setDataToToastMessage', this.setDataToToastMessage);
        this.$emitter.on('handleShowForm', this.handleShowForm);
        this.$emitter.on('handleShowDialog', this.handleShowDialog)
        this.$emitter.on('showLoadingData', this.showLoadingData)
        this.$emitter.on('downloadFileExcel', this.downloadFileExcel)
        document.addEventListener("click", this.handleOutsideClickExcelAction)
    },

    beforeUnmount() {
        // document.removeEventListener("click", this.handleOutsideClick);
        this.$emitter.off('setDataToToastMessage', this.setDataToToastMessage);
        this.$emitter.off('handleShowForm', this.handleShowForm);
        this.$emitter.off('handleShowDialog', this.handleShowDialog)
        this.$emitter.off('showLoadingData', this.showLoadingData)
        this.$emitter.off('downloadFileExcel', this.downloadFileExcel)
        document.removeEventListener("click", this.handleOutsideClickExcelAction)
    },

    data() {
        return {
            selectedId: null,
            listRewardChecked: [],
            isVisibleListOptionNumberPage: false,
            totalNumberItem: null,
            numberItemInPage: 20,
            numberPage: 1,
            numberItemOptions: [5, 10, 20, 50],
            isVisibleFilterForm: false,
            listCriteriaFilter: [],
            listItemsChecked: [],
            isReloadData: false,
            isCheckedAll: false,
            isVisibleForm: false,
            isVisibleLoadingData: true,
            listData: [],
            totalPage: 0,
            showChange: false,
            listDataRewardLevel: null,
            totalRecord: 0,
            currentItem: 0,
            isVisibleMessage: false,
            titleMessage: '',
            contentMessage: '',
            titleForm: '',
            typeForm: '',
            optionEditPopup: null,
            contentDialog: null,
            titleDialog: null,
            isVisibleDialog: false,
            typeDialog: null,
            confirmAction: false,
            typeAction: null,
            filterData: '',
            defaultData: '',
            filterLevelId: 'Tất cả',
            typeToastMessage: null,
            filterObjectId: 'Tất cả',
            filterTypeId: 'Tất cả',
            filterStatus: 'Tất cả',
            isVisibleExcelOption: false,
            isVisibleExcelForm: false,
            isFiltered: false,
            typeIconFilter: 'filter',
            stringRewardCheckedList: '',
            showIconDeleteData: false,
        }
    },

    computed: {
        /**
         * Trả về danh sách các phần tử đang được chọn
         * Author: PAQuân (08/08/2023)
         */
        selectedItems() {
            return this.listData.filter((item) => item.checked);
        },

        /**
         * Trả về danh sách các phần tử đang sử dụng
         * Author: PAQuân (08/08/2023)
         */
        statusListItems() {
            return this.listData.filter((item) => item.status);
        },
    },

    methods: {
        /** 
         * Hiển thị icon loading data         
         * Auhoir: PAQuân (06/09/2023)
        */
        async showLoadingData() {
            this.isVisibleLoadingData = true;
            setTimeout(() => {
                this.isVisibleLoadingData = false;
            }, 500);
            await this.delay(500);
        },

        /**
         * Delay hành động trong một khoảng thời gian
         * Auhoir: PAQuân (29/08/2023)
         */
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        /**
         * Lấy data từ API
         * Author: PAQuân (08/08/2023) 
         */
        async getDataFromAPI() {
            try {
                const response = await FilterDataEmulations(this.numberPage, this.numberItemInPage, ConvertRewardLevelToAPI(this.filterLevelId, this.listDataRewardLevel), ConvertObjectRewardToAPI(this.filterObjectId),
                    ConvertTypeMovementToAPI(this.filterTypeId), ConvertStatusToAPI(this.filterStatus), this.filterData)
                if (response.status == 200) {
                    this.totalPage = response.data.TotalPage
                    this.currentItem = response.data.CurrentPageRecord
                    this.totalRecord = response.data.TotalRecord
                    this.listData = response.data.Data
                    this.listData = this.listData.map(item => {
                        return { ...item, checked: false }
                    })
                } else {
                    this.$common.setDataToToastMessage(this.$emulationResource.Notification.loadData.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
                }

            } catch (error) {
                console.log(error)
                this.$common.setDataToToastMessage(this.$emulationResource.Notification.loadData.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
            }
        },

        /** 
         * Hiển thị và đặt msg cho toast message
         * Author: PAQuân (08/08/2023)
        */
        setDataToToastMessage(msg, type, title) {
            this.isVisibleMessage = true;
            this.typeToastMessage = type;
            this.titleMessage = title,
                this.contentMessage = msg;
            setTimeout(() => {
                this.isVisibleMessage = false;
            }, 3000)
        },

        /**
         * Tắt toast message
         * Author: PAQuân (08/08/2023)
         */
        handleCloseToastMessage() {
            this.isVisibleMessage = false
        },

        /**
         * Tắt toast message
         * Author: PAQuân (08/08/2023)
         */
        handleCloseForm() {
            this.isVisibleForm = false
        },

        /**
       * Tắt dialog
       * Author: PAQuân (08/08/2023)
       */
        handleCloseDialog() {
            this.isVisibleDialog = false
        },


        /**
         * Bỏ bộ lọc
         * Author: PAQuân (26/08/2023)
         */
        async unFiltered() {
            this.isFiltered = false;
            this.isVisibleFilterForm = false;
            this.filterLevelId = 'Tất cả';
            this.filterObjectId = 'Tất cả';
            this.filterTypeId = 'Tất cả';
            this.filterStatus = 'Tất cả';
            await this.getDataFromAPI();
        },

        /**
         * Hiển thị danh sách chọn số hàng trong một trang
         * Author: PAQuân (08/08/2023)
         */
        handleIconClick() {
            this.isVisibleListOptionNumberPage = !this.isVisibleListOptionNumberPage
        },

        /**
         * Đổi trạng thái thành sử dụng cho các item được chọn
         * Author: PAQuân (08/08/2023)
         */
        async handleClickUseItem(status) {
            let listEmulationsId = [];
            for (const item of this.listData) {
                if (item.checked) {
                    if (item.EmulationStatus != status) {
                        listEmulationsId.push(item.EmulationId)
                    }
                }
            }
            await this.showLoadingData();
            try {
                const response = await UpdateStatusMultipleEmulations(listEmulationsId, status);
                if (response.status == 200) {
                    this.$common.setDataToToastMessage(this.$emulationResource.Notification.updateStatus.success, this.$resource.ToastMessage.success, this.$notifyResource.toastMessage.title.success)
                    await this.getDataFromAPI()
                }
            } catch (error) {
                this.$common.setDataToToastMessage(this.$emulationResource.Notification.updateStatus.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
            }
            this.isCheckedAll = false;
        },

        /**
         *Xóa các item được chọn
         * Author: PAQuân (08/08/2023)
         */
        async handleClickDeleteItem() {
            let arrayIdChecked = []
            this.isVisibleLoadingData = true;
            for (const item of this.listData) {
                if (item.checked) {
                    arrayIdChecked.push(item.EmulationId)
                }
            }
            this.isVisibleDialog = false;
            await this.showLoadingData();
            try {
                const response = await DeleteManyRecordByListIds(this.$resource.API.Emulation, arrayIdChecked)
                if (response.status == 200) {
                    this.$common.setDataToToastMessage(this.$emulationResource.Notification.delete.many.success, this.$resource.ToastMessage.success, this.$notifyResource.toastMessage.title.success)
                } else {
                    this.$common.setDataToToastMessage(this.$emulationResource.Notification.delete.many.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
                }
            } catch (error) {
                this.$common.setDataToToastMessage(this.$emulationResource.Notification.delete.many.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
            }
            this.$emit('updateVisibleDialog', false)
            await this.getDataFromAPI()
            this.isCheckedAll = false;
        },

        /** 
         * Chọn số hàng trong một trang
         * Author: PAQuân (08/08/2023)
        */
        handleSelectNumberOption(number) {
            this.numberItemInPage = number
        },

        /**
         * Hiển thị form lọc danh sách
         * Author: PAQuân (08/08/2023)
         */
        handleShowFilterForm() {
            this.isVisibleFilterForm = !this.isVisibleFilterForm;
            console.log(this.filterObjectId);
        },

        /**
         * Hiển thị form thêm mới danh hiệu
         * Author: PAQuân (08/08/2023)
         */
        handleShowForm(type, title, selectedId) {
            this.isVisibleForm = true;
            this.isVisibleFilterForm = false;
            this.titleForm = title;
            this.typeForm = type;
            this.selectedId = selectedId
        },

        /**
        * Hiển thị form thêm mới danh hiệu
        * Author: PAQuân (08/08/2023)
        */
        handleShowDialog(type, title, content, action) {
            this.isVisibleDialog = true;
            this.typeDialog = type;
            this.titleDialog = title;
            this.contentDialog = content;
            if (type == this.$resource.Dialog.question) {
                this.typeAction = action;
            } else {
                this.typeAction = this.handleCloseDialog
            }
            console.log(1)
        },

        /**
         * Kiểm tra xem có checkbox vào đang được chọn không
         * Author: PAQuân (08/08/2023)
         */
        checkedCheckItem() {
            if (this.selectedItems.length == 0) {
                return true;
            } else {
                return false
            }
        },

        /**
         * Bỏ chọn tất cả các checkbox (khi nhấn vào bỏ chọn)
         * Author: PAQuân (08/08/2023)
         */
        deSelectedCheckbox() {
            for (const item of this.listData) {
                item.checked = false;
            }
            this.isCheckedAll = false;
        },

        /** 
         * Xóa dữ liệu ở ô tìm kiếm khi click vào dấu x
         * Author: PAQuân (08/08/2023)
        */
        deleteFilterData() {
            this.filterData = '',
                this.showIconDeleteData = false
        },


        /** 
         * Kiểm tra trạng thái của các item được chọn
         * Author: PAQuân (08/08/2023)
        */
        checkedListUsed(value) {
            let checked = false;
            for (const item of this.selectedItems) {
                if (item.EmulationStatus === value) {
                    checked = true;
                    break;
                }
            }
            return checked;
        },

        /** 
         * Di chuyển sang trang kế tiếp         
         * Author: PAQuân (21/08/2023)
        */
        moveNextPage() {
            if (this.numberPage < this.totalPage) {
                this.numberPage = this.numberPage + 1;
            }
        },

        /** 
         * Di chuyển sang trang trước đó     
         * Author: PAQuân (21/08/2023)
        */
        movePrePage() {
            if (this.numberPage > 1) {
                this.numberPage = this.numberPage - 1;
            }
        },

        /**  
         * Ẩn danh sách chọn khi click ra khỏi phạm vi của form
         * Author: PAQuân (08/08/2023)
        */
        handleOutsideClick(event) {
            if (!this.$refs.filterFormRef.contains(event.target)) {
                this.isVisibleFilterForm = false;
            }
        },

        /**
         * Hiển thị form nhập khẩu excel
         * Author: PAQuân (08/08/2023)
         */
        handleVisileImportExcel() {
            this.isVisibleExcelForm = true;
            this.isVisibleExcelOption = false;
        },

        /**
         * Ẩn form nhập khẩu excel
         * Author: PAQuân (08/08/2023)
         */
        handleCloseImportExcel() {
            this.isVisibleExcelForm = false;
        },

        /**  
         * Ẩn danh sách chọn khi click ra khỏi phạm vi của comcobox
         * Author: PAQuân (08/08/2023)
        */
        handleOutsideClickExcelAction(event) {
            if (!this.$refs.excelRef.contains(event.target)) {
                this.isVisibleExcelOption = false;
            }
        },

        /**
         * Export excel
         * Author: PAQuân (07/09/2023)
         */
        async exportExcelFile() {
            try {
                const response = await ExportExcel(this.listData);
                this.downloadFileExcel(response, "Danh_hiệu_thi_đua.xlsx")
            } catch (error) {
                console.error('Error downloading Excel file:', error);
                this.$common.setDataToToastMessage(this.$emulationResource.Notification.excel.export.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
            }
        },

        /**
         * Tự động tải file excel khi có response trả về
         * Author: PAQuân (08/09/2023)
         */
        downloadFileExcel(response, fileName) {
            if (response.status == 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                this.$common.setDataToToastMessage(this.$emulationResource.Notification.excel.export.success, this.$resource.ToastMessage.success, this.$notifyResource.toastMessage.title.success)
            } else {
                this.$common.setDataToToastMessage(this.$emulationResource.Notification.excel.export.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
            }
        }

    },
    watch: {
        async isVisibleForm() {
            console.log(this.isReloadData)
            if (!this.isVisiblePopupForm & this.isReloadData) {
                await this.getDataFromAPI()
            }
        },

        async isVisibleDialog() {
            if (!this.isVisibleDialog) {
                await this.getDataFromAPI()
            }
        },

        async showChange() {
            await this.getDataFromAPI()

        },

        async isVisibleFilterForm() {
            if (!this.isVisibleFilterForm) {
                await this.getDataFromAPI()
            }
        },

        filterData: debounce(async function () {
            if (this.filterData.length > 0) this.showIconDeleteData = true;
            else this.showIconDeleteData = false;
            await this.getDataFromAPI()
        }, 1000),


        async numberItemInPage() {
            this.numberPage = 1,
                await this.getDataFromAPI()
        },

        async numberPage() {
            await this.getDataFromAPI()
        },

        isFiltered() {
            if (this.isFiltered) this.typeIconFilter = 'filter-active'
            else this.typeIconFilter = 'filter'
        },

        async isVisibleExcelForm() {
            if (!this.isVisibleExcelForm) {
                await this.getDataFromAPI()
            }
        }
    },
    shortkey: {
        'Ctrl+Q': 'this.handleShowAddForm'
    }
}
</script>

<style>
@import './emulation-list.css';
</style>