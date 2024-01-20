import axios from 'axios';
import config from '../../config/config'

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
 * Gọi API lấy tất cả các bản ghi
 * @param {*} path: đường dẫn
 * @returns response
 * Author: PAQuân (05/09/2023)
 */
export const GetAllRecord = async (path) => {
    return await axios.get(apiURL + path);
}

/**
 * Gọi API phân trang tất cả các bản ghi
 * @param {*} path : đường dẫn
 * @param {*} pageNumber : trang hiện tại
 * @param {*} pageSize : số bản ghi mỗi trang
 * @returns response
 * Author: PAQuân (05/09/2023)
 */
export const PaginationAllRecord = async (path, pageNumber, pageSize) => {
    const params = {
        pageNumber: pageNumber,
        pageSize: pageSize
    }
    return await axios.get(apiURL + path + "/pagination", { params });
}

/**
 * Lấy thông tin một bản ghi theo id
 * @param {*} id: id của bản ghi
 * @returns response
 * Author: PAQuân (05/09/2023) 
 */
export const GetDetail = async (path, id) => {
    return await axios.get(apiURL + path + "/" + id);
}

/**
 * Tìm kiếm thông tin bản ghi theo id
 * @param {*} id: id của bản ghi
 * @returns response
 * Author: PAQuân (05/09/2023)
 */
export const FindDetailById = async (path, id) => {
    return await axios.get(apiURL + path + "/find/id/" + id);
}

/**
 * Tìm kiếm thông tin bản ghi theo code
 * @param {*} code: code của bản ghi
 * @returns response
 * Author: PAQuân (05/09/2023)
 */
export const FindDetailByCode = async (path, code) => {
    return await axios.get(apiURL + path + "/find/code/" + code);
}