<template>
    <div class="excel-form-background">
        <div class="excel-form-content">
            <div style="padding: 16px 24px">
                <div class="excel-form-header">
                    <div class="excel-form-title">Nhập khẩu</div>
                    <m-icon type="exit" :isTooltip="true" titleTooltip="Thoát" @iconClick="$emit('handleClose')"></m-icon>
                </div>
                <div class="excel-form-progress">
                    <input type="radio" :class="(successRadio) ? 'custom-radio-success' : 'custom-radio'" checked>
                    <label class="progress-title">Chọn tệp nhập khẩu</label>
                    <div class="progress-bar checked" :class="{ 'success': successRadio }">
                        -------------------------------------</div>
                    <input type="radio" class="custom-radio" style="pointer-events: none;" :checked="successRadio">
                    <label class="progress-title">Nhập khẩu</label>
                </div>
                <div class="excel-sheet-input" v-if="!isVisibleValidateExcel">
                    <div class="excel-form-input" @click="onClickInputFile()">
                        <div class="excel-icon-input">
                            <div class="icon-excel-input" v-if="isVisibleIcon"></div>
                            <input ref="fileRef" type="file" multiple v-on:change="onFileChange" class="input-excel"
                                accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                hidden>
                        </div>
                    </div>
                    <div class="list-file-selected" v-if="isVisibleListSheet">
                        <div v-for="(file, index) in fileInput" class="detail-file-selected">
                            <m-icon type="dicision"></m-icon>
                            <div class="title-file">{{ file.name }}</div>
                            <div class="size-file">{{ (file.size / 1048567).toFixed(3) }} MB</div>
                            <div class="status-file">
                                <div class="status-content" v-if="checkedExtensionFile(file)">
                                    <m-icon type="success-input"></m-icon>
                                    <div class="status-title">Hợp lệ</div>
                                </div>
                                <div class="status-content" v-if="!checkedExtensionFile(file)">
                                    <m-icon type="error-input"></m-icon>
                                    <div class="status-title">Không hợp lệ</div>
                                </div>
                            </div>
                            <div class="btn-change-file" @click="changeOtherFile(index)">
                                Đổi tệp khác
                            </div>
                            <input ref="fileChangeRef" type="file" multiple v-on:change="onFileChange" class="input-excel"
                                accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                hidden>
                        </div>
                    </div>
                    <div class="input-excel-combobox" v-if="isVisibleListSheet">
                        <div style="width: 49%;">
                            <m-combobox :listItem="listSheets" label="Chọn sheet nhập khẩu"
                                :data="(listSheets[0] != undefined) ? listSheets[0] : null"
                                @updateData="selectedSheet = $event"></m-combobox>
                        </div>
                        <div style="width: 49%; position: relative;">
                            <m-input type="number" label="Dòng tiêu đề" v-model="rowTitle"></m-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="excel-validate-data" v-if="isVisibleValidateExcel">
                <div class="validate-record">
                    <div class="form-validate-info" style="border: 2px solid black;">
                        <div class="title-validate-info total" style="background-color:black;">Số bản ghi</div>
                        <div class="number-record" style="color: black">{{ totalRecord }}</div>
                    </div>
                    <div class="form-validate-info" style="border: 2px solid blue;">
                        <div class="title-validate-info" style="background-color:blue;">Hợp lệ</div>
                        <div class="number-record" style="color: blue">{{ totalValidRecord }}</div>
                    </div>
                    <div class="form-validate-info" style="border: 2px solid red;">
                        <div class="title-validate-info" style="background-color:red;">Không hợp lệ</div>
                        <div class="number-record" style="color: red">{{ totalInvalidRecord }}</div>
                    </div>
                </div>
            </div>
            <div class="excel-form-footer">
                <div class="footer-left">
                    <m-button type="btn-use" style="width: 150px; margin-left: 0;" title="Tải tệp mẫu"
                        @btnClick="downloadDefaultExcelFile()"></m-button>
                    <m-button v-if="(isVisibleValidateExcel && totalInvalidRecord > 0)" type="btn-delete"
                        style="width: 100px; margin-left: 16px;" title="Tải tệp lỗi"
                        @btnClick="btnDownloadInvalidFile"></m-button>
                </div>
                <div class="footer-right">
                    <m-button type="btn-secondary" style="width: 80px;" title="Hủy"
                        @btnClick="$emit('handleClose')"></m-button>
                    <m-button v-if="isVisibleValidateExcel" type="btn-secondary" style="width: 80px; margin-left: 16px;"
                        title="Quay lại" @btnClick="backToListFileInput"></m-button>
                    <m-button v-if="!isVisibleValidateExcel" type="btn-primary" style="width: 100px; margin-left: 16px;"
                        title="Tiếp tục" :disable="(isVisibleIcon || !isVisibleContinue)"
                        @btnClick="btnContinueClick"></m-button>
                    <m-button v-if="isVisibleValidateExcel" type="btn-primary" style="width: 100px; margin-left: 16px;"
                        title="Nhập khẩu" :disable="(totalValidRecord == 0)" @btnClick="importExcel"></m-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DownloadFileInvalidExcel, ReadFileExcel, ImportExcel } from '@/js/services/emulation';
export default {
    name: "ExcelFormInput",
    emits: ["updateVisible"],

    data() {
        return {
            checkedInputFile: false,
            fileInput: [],
            isVisibleIcon: true,
            isVisibleListSheet: false,
            isVisibleInput: true,
            isVisibleValidateExcel: false,
            isVisibleContinue: false,
            listSheets: [],
            selectedSheet: '',
            rowTitle: 0,
            successRadio: false,
            totalRecord: 0,
            totalValidRecord: 0,
            totalInvalidRecord: 0,
            listRowInvalid: [],
            selectedNumberFile: -1,
        }
    },

    emits: ['handleClose'],

    methods: {
        /**
         * Mở giao diện chọn file khi click vào khu vực tương ứng
         * Author: PAQuân (08/09/2023)
         */
        onClickInputFile() {
            if (this.isVisibleInput) this.$refs.fileRef.click();
        },

        /**
         * Lấy danh sách file nhập vào input
         * @param {*} e: Sự kiện 
         * Author: PAQuân (08/08/2023)
         */
        onFileChange(e) {
            const { files } = e.target;
            console.log(files)
            console.log(this.selectedNumberFile);
            if (this.selectedNumberFile == -1) {
                this.fileInput = Array.from(files);
            } else {
                this.fileInput.splice(this.selectedNumberFile, 1, files[0])
            }
            this.listSheets = [];
            for (let i = 0; i < this.fileInput.length; i++) {
                if (this.checkedExtensionFile(this.fileInput[i])) this.listSheets.push(this.fileInput[i].name)
            }
        },

        /**
         * Mở giao diện chọn file khi chọn đổi tệp
         * Author: PAQuân (08/08/2023)
         */
        changeOtherFile(index) {
            if (this.isVisibleListSheet) this.$refs.fileRef.click();
            this.selectedNumberFile = index;
        },

        /**
         * Lấy dữ liệu khi bấm vào tiếp tục
         * Author: PAQuân (08/08/2023)
         */
        async btnContinueClick() {
            for (let i = 0; i < this.fileInput.length; i++) {
                if (this.selectedSheet == this.fileInput[i].name) this.selectedNumberFile = i;
            }
            this.isVisibleListSheet = false;
            this.isVisibleValidateExcel = true;
            let formData = new FormData()
            formData.append("excelFile", this.fileInput[this.selectedNumberFile])
            this.successRadio = true;
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
            try {
                const response = await ReadFileExcel(this.rowTitle, formData, config)
                console.log(response);
                if (response.status == 200) {
                    this.totalRecord = response.data.TotalRecord
                    this.totalValidRecord = response.data.TotalValidRecord
                    this.totalInvalidRecord = response.data.TotalInvalidRecord
                    this.listRowInvalid = response.data.ListRowInvalid
                    // if (this.totalInvalidRecord > 0) {
                    //     this.$common.handleShowDialog(this.$resource.Dialog.error, this.$notifyResource.dialog.title.warning, response.data.NotifyRowInvalid, null)
                    // }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Kiểm tra phần mở rộng của file có phải 'xlsx' hay 'xls' không?
         * @param {*} file: file
         * Author: PAQuân (08/08/2023)
         */
        checkedExtensionFile(file) {
            var fileName = file.name;
            var fileExtension = fileName.split('.').pop().toLowerCase();
            console.log(fileExtension)
            if (fileExtension == 'xlsx' || fileExtension == 'xls') {
                this.isVisibleContinue = true;
                return true;
            }
            else {
                this.isVisibleContinue = false;
                return false
            }
        },

        /**
         * Tải file dữ liệu chứa các hàng không hợp lệ
         * Author: PAQuân (08/08/2023)
         */
        async btnDownloadInvalidFile() {
            let formData = new FormData()
            formData.append("excelFile", this.fileInput[0])
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
            try {
                let formData = new FormData()
                formData.append("excelFile", this.fileInput[this.selectedNumberFile]);
                let invalidRow = this.listRowInvalid.join(",")
                const response = await DownloadFileInvalidExcel(this.rowTitle, formData, invalidRow)
                console.log(response)
                this.$common.downloadFileExcel(response, "Danh_sách_dữ_liệu_lỗi.xlsx")
            } catch (error) {
                console.log(error)
            }
        },

        /**
         * Thêm dữ liệu từ file excel
         * Author: PAQuân (08/08/2023)
         */
        async importExcel() {
            let formData = new FormData()
            formData.append("excelFile", this.fileInput[0])
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
            this.$common.showLoadingData()
            try {
                let formData = new FormData()
                formData.append("excelFile", this.fileInput[this.selectedNumberFile]);
                let invalidRow = ''
                if (this.listRowInvalid.length > 0) invalidRow = this.listRowInvalid.join(",")
                else invalidRow = String(this.rowTitle)
                const response = await ImportExcel(this.rowTitle, formData, invalidRow, config)
                if (response.status == 200) {
                    this.$common.setDataToToastMessage(this.$emulationResource.Notification.excel.import.success, this.$resource.ToastMessage.success, this.$notifyResource.toastMessage.title.success)
                } else {
                    this.$common.setDataToToastMessage(this.$emulationResource.Notification.excel.import.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
                }

            } catch (error) {
                console.log(error)
                this.$common.setDataToToastMessage(this.$emulationResource.Notification.excel.import.error, this.$resource.ToastMessage.error, this.$notifyResource.toastMessage.title.error)
            }
            this.$emit("updateVisible", false)
        },


        /**
         * Tải file tệp mẫu
         * Author: PAQuân (08/08/2023)
         */
        downloadDefaultExcelFile() {
            const filePath = '../../../assets/File_mẫu.xlsx';
            const link = document.createElement('a');
            link.href = filePath;
            link.download = filePath.substring(filePath.lastIndexOf('/') + 1);
            link.click();
        },

        /**
         * Thực thi hành động khi chọn quay lại
         * Author: PAQuân (08/08/2023)
         */
        backToListFileInput() {
            this.isVisibleValidateExcel = false,
                this.isVisibleInput = true,
                this.isVisibleListSheet = true
            this.successRadio = false
        }

    },

    watch: {
        fileInput() {
            if (this.fileInput.length > 0) {
                this.isVisibleIcon = false;
                this.isVisibleInput = false;
                this.isVisibleListSheet = true;
            }
            else {
                this.isVisibleIcon = true;
                this.isVisibleInput = true;
                this.isVisibleListSheet = false;
            }
        }
    }
}
</script>

<style scoped>
@import './excel-form-input.css';
</style>