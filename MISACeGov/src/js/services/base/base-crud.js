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
 * Thêm mới một bản ghi
 * @param {*} path : đường dẫn
 * @param {*} newItem : đối tượng cần thêm
 * @returns response
 * Author: PAQuân (26/08/2023)
 */
export const CreateNewRecord = async (path, newItem) => {
    return await axios.post(apiURL + path, newItem);
}

/**
 * Thay đổi thông tin một bản ghi
 * @param {*} path : đường dẫn
 * @param {*} id : id đối tượng cần thay đổi thông tin
 * @param {*} editItem: thông tin đối tượng sau khi thay đổi
 * @returns response
 * Author: PAQuân (26/08/2023)
 */
export const EditRecord = async (path, id, code, editItem) => {
    return await axios.put(apiURL + path + "/" + id + "?code=" + code, editItem);
}

/**
 * Xóa một bản ghi theo id
 * @param {*} path : đường dẫn
 * @param {*} id : id của đối tượng cần xóa
 * @returns response
 * Author: PAQuân (26/08/2023)
 */
export const DeleteRecordById = async (path, id) => {
    return await axios.delete(apiURL + path + "/" + id)
}


/**
 * Xóa nhiều bản ghi theo danh sách id
 * @param {*} path : đường dẫn
 * @param {*} ids : danh sách id của các đối tượng cần xóa
 * @returns response
 * Author: PAQuân (26/08/2023)
 */
export const DeleteManyRecordByListIds = async (path, ids) => {
    return await axios.delete(apiURL + path + "/delete-list", {
            data: ids
    })
}