import MISAEnum from './enum'
import EmulationResource from '../resource/emulation'

/**
 * Chuyển dữ liệu của đối tượng khen thưởng sang dạng lưu trữ trên database
 * @param {*} objectReward: Đối tượng khen thưởng
 * @returns: Đối tượng khen thưởng
 * Author: PAQuân (08/08/2023)
 */
export const ConvertObjectRewardToAPI = (objectReward) => {
    if (objectReward.length == []) return MISAEnum.objectReward.none;
    else if (objectReward == MISAEnum.objectReward.personal || objectReward == EmulationResource.RewardObject.type.personal) return MISAEnum.objectReward.personal;
    else if (objectReward == MISAEnum.objectReward.group || objectReward == EmulationResource.RewardObject.type.group) return MISAEnum.objectReward.group;
    else  if (objectReward.length == 2 || objectReward == EmulationResource.RewardObject.type.groupAndPersonal) return MISAEnum.objectReward.groupAndPersonal;
    else return null;
}

/**
 * Chuyển dữ liệu của đối tượng khen thưởng từ enum sang data
 * @param {*} objectReward: Đối tượng khen thưởng
 * @returns: Đối tượng khen thưởng
 * Author: PAQuân (08/08/2023)
 */
export const ConvertObjectRewardEnumToData = (objectReward) => {
    if (objectReward.length == MISAEnum.objectReward.none) return [];
    else if (objectReward == MISAEnum.objectReward.personal) return [MISAEnum.objectReward.personal];
    else if (objectReward == MISAEnum.objectReward.group) return [MISAEnum.objectReward.group];
    else  if (objectReward == MISAEnum.objectReward.groupAndPersonal) return [MISAEnum.objectReward.personal, MISAEnum.objectReward.group];
    else return [];
}

/**
 * Chuyển dữ liệu của loại phong trào sang dạng lưu trữ trên database
 * @param {*} objectReward: Loại phong trào
 * @returns: Loại phong trào
 * Author: PAQuân (08/08/2023)
 */
export const ConvertTypeMovementToAPI = (typeMovement) => {
    if (typeMovement.length == []) return MISAEnum.typeMovement.none;
    else if (typeMovement == MISAEnum.typeMovement.frequent || typeMovement == EmulationResource.TypeMovement.type.frequent) return 0;
    else if (typeMovement == MISAEnum.typeMovement.batched || typeMovement == EmulationResource.TypeMovement.type.batched) return 1;
    else if (typeMovement.length == 2 || typeMovement == EmulationResource.TypeMovement.type.all) return 2;
    else return null
}

/**
 * Chuyển dữ liệu của loại phong trào từ enum sang data
 * @param {*} objectReward: Loại phong trào
 * @returns: Loại phong trào
 * Author: PAQuân (08/08/2023)
 */
export const ConvertTypeMovementEnumToData = (typeMovement) => {
    if (typeMovement == MISAEnum.objectReward.none) return [];
    else if (typeMovement == MISAEnum.typeMovement.frequent) return [MISAEnum.typeMovement.frequent];
    else if (typeMovement == MISAEnum.typeMovement.batched) return [MISAEnum.typeMovement.batched];
    else if (typeMovement == MISAEnum.typeMovement.all) return [MISAEnum.typeMovement.frequent, MISAEnum.typeMovement.batched];
    else return [];
}

/**
 * Chuyển dữ liệu của cấp khen thưởng từ tên sang id 
 * @param {*} objectReward: Tên cấp khen thưởng
 * @returns: Id cấp khen thưởng
 * Author: PAQuân (08/08/2023)
 */
export const ConvertRewardLevelToAPI = (rewardLevelName, rewardLevelList) => {
    for (const rewardLevel of rewardLevelList) {
        if (rewardLevel.RewardLevelName == rewardLevelName) {
            return rewardLevel.RewardLevelId;
        }
    }
    return null;
}

/**
 * Chuyển dữ liệu của trạng thái sử dụng từ string sang boolean
 * @param {*} status: Trạng thái  
 * @returns: Trạng thái
 * Author: PAQuân (08/08/2023)
 */
export const ConvertStatusToAPI = (status) => {
    if (status == EmulationResource.Status.type.active) return true;
    else if (status == EmulationResource.Status.type.inactive) return false;
    else return null;
}

/**
 * Chuyển dữ liệu đối tượng khen thưởng từ dạng enum sang resource
 * @param {*} objectReward Đối tượng khen thưởng (enum)
 * @returns Đối tượng khen thưởng (resource)
 * Author: PAQuân (08/08/2023)
 */
export const ConvertObjectRewardToString = (objectReward) => {
    if (objectReward == MISAEnum.objectReward.personal) return EmulationResource.RewardObject.type.personal
    else if (objectReward == MISAEnum.objectReward.group) return EmulationResource.RewardObject.type.group
    else if (objectReward == MISAEnum.objectReward.groupAndPersonal) return EmulationResource.RewardObject.type.groupAndPersonal
    else return null;
}

/**
 * Chuyển dữ liệu loại phong trào từ enum sang resource
 * @param {*} typeMovement: Loại phong trào (enum)
 * @returns: Loại phong trào (resource)
 * Author: PAQuân (08/08/2023)
 */
export const ConvertTypeMovementToString = (typeMovement) => {
    if (typeMovement == MISAEnum.typeMovement.frequent) return EmulationResource.TypeMovement.type.frequent;
    else if (typeMovement == MISAEnum.typeMovement.batched) return EmulationResource.TypeMovement.type.batched;
    else if (typeMovement = MISAEnum.typeMovement.all) return EmulationResource.TypeMovement.type.all;
    else return null
}

/**
 * Chuyển dữ liệu trạng thái sử dụng từ enum sang resource
 * @param {*} status: Trạng thái (enum)
 * @returns: Trạng thái (resource)
 * Author: PAQuân (08/08/2023)
 */
export const ConvertStatusToString = (status) => {
    if (status == MISAEnum.status.active) return EmulationResource.status.type.active;
    else if (status == MISAEnum.status.inactive) return EmulationResource.status.type.inactive;
    else return null;
}