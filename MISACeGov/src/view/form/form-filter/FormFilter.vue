<template>
    <div class="content_filter">
        <div class="content_filter-header">
            <div class="content_filter-header-title">Lọc danh hiệu</div>
            <m-icon ref="exitRef" type="exit" tabindex="0" :isTooltip="true" titleTooltip="Thoát"
                @iconClick="handleHiddenFilterForm" @clickShiftTab="$refs.cancelRef.focus()"
                @handleEnter="handleHiddenFilterForm"
               >
            </m-icon>
        </div>
        <div class="content_filter-body" ref="bodyRef">
            <div class="filter-criteria" v-for="(item, index) in listFilterCriteria">
                <m-combobox 
                    :label="item.name" 
                    :listItem="item.listOptions" 
                    showList="under" 
                    :data="valueCriteria[index]"
                    @updateData="valueCriteria[index] = $event" 
                >
                </m-combobox>
            </div>
        </div>
        <div class="content_filter-footer">
            <m-button type="btn-secondary" ref="cancelRef" title="Hủy" tabindex="1" @btnClick="handleHiddenFilterForm"
                @keydown.enter="handleHiddenFilterForm" @keydown.tab.prevent="$refs.exitRef.onFocus()" @keydown.shift.tab.prevent="$refs.filterRef.focus()"></m-button>
            <m-button type="btn-primary" ref="filterRef" title="Áp dụng" tabindex="0" @btnClick="handleFilterData"
                @keydown.enter="handleFilterData" @keydown.tab.prevent="$refs.cancelRef.focus()"></m-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { GetAllRecord } from '@/js/services/base/base-readonly';
export default {
    name: "TheFilterForm",
    props: ["data", "defaultData", 'visibleFilterForm', 'listCriteria', 'pageNumber', 'pageSize', "filterLevelId", "filterObjectId", "filterTypeId", "filterStatus", "isFiltered"],
    emits: ["updateData", "updateListCriteria", "updateVisible", "updateFilterLevelId", "updateFilterObjectId", "updateFilterTypeId", "updateFilterStatus", "updateIsFiltered"],

    async created() {
        this.listData = this.data
        const response = await GetAllRecord(this.$resource.API.RewardLevel)
        this.listDataRewardLevel = response.data
        this.isVisibleCombobox = false
        this.valueCriteria = [this.filterObjectId, this.filterLevelId, this.filterTypeId, this.filterStatus]
    },


    data() {
        return {
            isVisibleCombobox: false,
            isVisibleListCriteriaFilter: false,
            listDataRewardLevel: [],
            isVisibleFilterForm: false,
            valueCriteria: [],
            idCriteriaFilter: null,
            listFilterCriteria: [
                { id: 0, name: this.$emulationResource.RewardObject.name, listOptions: ["Tất cả", this.$emulationResource.RewardObject.type.group, this.$emulationResource.RewardObject.type.personal, this.$emulationResource.RewardObject.type.groupAndPersonal] },
                { id: 1, name: this.$emulationResource.RewardLevel.name, listOptions: ["Tất cả", this.$emulationResource.RewardLevel.type.government, this.$emulationResource.RewardLevel.type.province, this.$emulationResource.RewardLevel.type.district, this.$emulationResource.RewardLevel.type.ward] },
                { id: 2, name: this.$emulationResource.TypeMovement.name, listOptions: ["Tất cả", this.$emulationResource.TypeMovement.type.frequent, this.$emulationResource.TypeMovement.type.batched, this.$emulationResource.TypeMovement.type.all] },
                { id: 3, name: this.$emulationResource.Status.name, listOptions: ["Tất cả", this.$emulationResource.Status.type.active, this.$emulationResource.Status.type.inactive] }
            ],
            listData: null,
        }
    },
    methods: {
        /**
         * Ẩn form lọc
         * Author: PAQuân (08/08/2023)
         */
        handleHiddenFilterForm() {
            //this.isVisibleFilterForm = false;
            this.$emit("updateVisible", false)
        },

        /**
         * Lấy dữ liệu lọc từ form lọc khi chọn áp dụng
         * Author: PAQuân (08/08/2023)
         */
        async handleFilterData() {
            this.$emit("updateFilterLevelId", this.valueCriteria[1]);
            this.$emit("updateFilterObjectId", this.valueCriteria[0]);
            this.$emit("updateFilterTypeId", this.valueCriteria[2]);
            this.$emit("updateFilterStatus", this.valueCriteria[3]);
            this.$emit("updateIsFiltered", true);
            this.handleHiddenFilterForm();
        },

        /** 
         * Lấy id của option được chọn
         * Author: PAQuân (08/08/2023)
        */
        handleFilterClick(id) {
            if (this.isVisibleListCriteriaFilter) {
                this.isVisibleListCriteriaFilter = !this.isVisibleListCriteriaFilter;
                this.idCriteriaFilter = id;
            } else {
                this.isVisibleListCriteriaFilter = !this.isVisibleListCriteriaFilter;
                this.idCriteriaFilter = null
            }
        },

        /** 
         * Lưu giá trị của option được chọn
         * Author: PAQuân (08/08/2023)
        */
        handleSelectValueCriteriaOption(option, id) {
            this.valueCriteria[id] = option;
        }
    },

    watch: {
        isVisibleCombobox() {
           
        }
    }

    

}
</script>
<style>@import './form-filter.css';</style>