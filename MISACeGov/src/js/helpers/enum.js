const MISAEnum = {

    /**
     * Đối tượng khen thưởng: Cá nhân - 0, Tập thể - 1, Tất cả - 2
     * Author: PAQuân (08/08/2023)
     */
    objectReward: {
        group: 1,
        personal: 0,
        groupAndPersonal: 2,
        none: -1
    },

    /**
     * Loại phong trào: Thường xuyên - 0, Theo đợt - 1, Tất cả -2
     * Author: PAQuân (08/08/2023)
     */
    typeMovement: {
        all: 2,
        frequent: 0,
        batched: 1,
        none: -1
    },

    /**
     * Trạng thái sử dụng: Đang sử dụng và ngừng sử dụng
     * Author: PAQuân (08/08/2023)
     */
    status: {
        inactive: false,
        active: true
    },

    /**
     * Loại dialog
     * Author: PAQuân (08/08/2023)
     */
    formDialog: {
        success: 0,
        error: 1,
        warning: 2,
        question: 3,
    },

    /**
     * Loại toast message
     * Author: PAQuân (08/08/2023)
     */
    typeToastMessage: {
        success: 0,
        error: 1,
        warning: 2,
        question: 3,
    },

    /** 
     * Danh hiệu hệ thống
     * Author: PAQuân (08/08/2023) 
     * */
    IsSystem: {
        IsNotSystem: 0,
        IsSystem: 1
    }
}

export default MISAEnum;