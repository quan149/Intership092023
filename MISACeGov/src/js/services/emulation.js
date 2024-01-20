import axios from 'axios';
import MISACommon from '../helpers/common'
import MISAEnum from '../helpers/enum'
import MISAResource from '../resource/base'
import MISANotifyResource from '../resource/notify-text'
import config from '../config/config'

const apiURL = config.API_URL;

// Config interceptor like middleware in BE C#
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return error;
    }
);

/**
 * Lọc danh hiệu id theo điều kiện
 * @param {*} numberPage: trang hiện tại 
 * @param {*} numberItem: số bản ghi của một tranh
 * @param {*} id : id của cấp khen thưởng
 * @param {*} objectId : đối tượng khen thưởng
 * @param {*} typeId : loại phong trào
 * @param {*} status : trạng thái
 * @param {*} codeNameFilter : tìm kiếm theo tên hoặc code
 * @returns danh sách danh hiệu thi đua
 * Author: PAQuân (26/08/2023) 
 */
export const FilterDataEmulations = async (numberPage, numberItem, id, objectId, typeId, status, codeNameFilter) => {
    let params = ""
    if (numberPage != null) params = params + "pageNumber=" + numberPage;
    if (numberItem != null) params = params + "&pageSize=" + numberItem;
    if (id != null) params = params + "&rewardLevelId=" + id;
    if (objectId != null) params = params + "&rewardObjectId=" + objectId;
    if (typeId != null) params = params + "&typeMovementId=" + typeId;
    if (status != null) params = params + "&status=" + status;
    if (codeNameFilter != null && codeNameFilter != "") params = params + "&codeNameFilter=" + codeNameFilter;
    return await axios.get(apiURL + MISAResource.API.Emulation + "/filter?" + params);
}

/**
 * Cập nhật trạng thái nhiều danh hiệu thi đua theo danh sách ids
 * @param {*} ids Danh sách ids
 * @param {*} status Trạng thái sau khi cập nhật
 * Author: PAQuân (26/08/2023) 
 */
export const UpdateStatusMultipleEmulations = async (ids, status) => {
    MISACommon.showLoadingData();
    return await axios.put(apiURL + MISAResource.API.Emulation + "/update-status?status=" + status, ids);
}

/**
 * Kiểm tra trùng code khi tạo mới danh hiệu thi đua
 * @param {*} code Mã danh hiệu thi đua
 * @returns 
 * Author: PAQuân (26/08/2023) 
 */
export const CheckExistCodeEmulation = async (code) => {
    return await axios.get(apiURL + MISAResource.API.Emulation + "/exist-code?code=" + code);
}

/**
 * Lấy mã danh hiệu thi đua mới
 * Author: PAQuân (26/08/2023) 
 * @returns Mã danh hiệu thi đua mới
 */
export const GetNewCode = async () => {
    return await axios.get(apiURL + MISAResource.API.Emulation + "/newCode");
}

/** Đọc dữ liệu từ file excel
 * Author: PAQuân (08/09/2023)
 */
export const ReadFileExcel = async (numberTitleRow, formData, config) => {
    return await axios.post(apiURL + MISAResource.API.Emulation + "/readFileExcel?rowNumber=" + numberTitleRow, formData, config)
}

/** Tải tệp chứa dữ liệu lỗi
 * Author: PAQuân (08/09/2023)
 */
export const DownloadFileInvalidExcel = async (numberTitleRow, formData, invalidRow) => {
    return await axios.post(apiURL + MISAResource.API.Emulation + "/downloadInvalidExcel?invalidRow=" + invalidRow + '&rowNumber=' + numberTitleRow, formData, { 
        responseType: 'blob' 
    })
}

/** Xuất khẩu excel
 * Author: PAQuân (08/09/2023)
 */
export const ExportExcel = async (listData) => {
    return await axios.post(apiURL + MISAResource.API.Emulation + "/exportExcel", listData, {
        responseType: 'blob'
    });
}

/** Nhập khẩu khẩu excel
 * Author: PAQuân (08/09/2023)
 */
export const ImportExcel = async (numberTitleRow, formData, invalidRow, config) => {
    return await axios.post(apiURL + MISAResource.API.Emulation + "/importExcel?invalidRow=" + invalidRow + '&rowNumber=' + numberTitleRow, formData, config)
}