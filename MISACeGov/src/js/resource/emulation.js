const EmulationResource = {

    EmulationName: {
        name: "Tên danh hiệu thi đua",
        warningBlankInput: 'Tên danh hiệu thi đua không được để trống',
        warningMaxLength: 'Tên danh hiệu thi đua không được vượt quá 100 kí tự',
        placeholder: 'Nhập tên danh hiệu thi đua'
    },

    EmulationCode: {
        name: "Mã danh hiệu",
        warningBlankInput: 'Mã danh hiệu thi đua không được để trống',
        warningMaxLength: 'Mã danh hiệu thi đua không được vượt quá 10 kí tự',
        warningConflict: 'Mã danh hiệu thi đua đã tồn tại',
        placeholder: 'Nhập mã danh hiệu thi đua'
    },

    RewardLevel: {
        name: "Cấp khen thường",
        type: {
            government: 'Cấp nhà nước',
            province: 'Cấp tỉnh/tương đương',
            district: 'Cấp huyện/tương đương',
            ward: 'Cấp xã/tương đương'
        },
        warningBlankInput: 'Cấp khen thưởng không được để trống',
        placeholder: 'Chọn cấp khen thưởng'
    },

    RewardObject: {
        name: "Đối tượng khen thưởng",
        type: {
            group: 'Tập thể',
            personal: 'Cá nhân',
            groupAndPersonal: 'Cá nhân, tập thể'
        },
        warningBlankInput: 'Đối tượng khen thưởng không được để trống',
    },

    TypeMovement: {
        name: "Loại phong trào",
        type: {
            all: 'Thường xuyên, Theo đợt',
            frequent: 'Thường xuyên',
            batched: 'Theo đợt'
        },
        warningBlankInput: 'Loại phong trào không được để trống',
    },

    EmulationNote: {
        name: "Ghi chú",
        placeholder: 'Nhập ghi chú'
    },

    Status: {
        name: 'Trạng thái',
        type: {
            inactive: 'Ngừng sử dụng',
            active: 'Sử dụng'
        }
    },

    Notification: {

        loadData: {
            success: 'Tải dữ liệu thành công',
            error: 'Tải dữ liệu không thành công'
        },

        delete: {
            only: {
                success: 'Xóa danh hiệu thi đua thành công',
                error: 'Xóa danh hiêu thi đua không thành công'
            },
            many: {
                success: 'Xóa các danh hiệu thi đua thành công',
                error: 'Xóa các danh hiêu thi đua không thành công'
            }
        },

        create: {
            add: {
                success: 'Cất và thêm danh hiệu thi đua thành công',
                error: 'Cất và thêm danh hiêu thi đua không thành công'
            },
            save: {
                success: 'Cất và lưu danh hiệu thi đua thành công',
                error: 'Cất và lưu danh hiêu thi đua không thành công'
            }
        },

        edit: {
            success: 'Cập nhật thông tin danh hiệu thi đua thành công',
            error: 'Cập nhật thông tin danh hiêu thi đua không thành công'
        },

        updateStatus: {
            success: 'Thay đổi trạng thái sử dụng của danh hiệu thi đua thành công',
            error: 'Thay đổi trạng thái sử dụng của danh hiệu thi đua không thành công'
        },

        getNewCode: {
            error: 'Sinh tự động mã danh hiệu thi đua không thành công'
        },

        excel: {
            import: {
                success: 'Nhập khẩu dữ liệu thành công',
                error: 'Nhập khẩu dữ liệu không thành công'
            },
            export: {
                success: 'Xuất khẩu dữ liệu thành công',
                error: 'Xuất khẩu dữ liệu không thành công'
            }
        }
    },

    QuestionDialog: {
        delete: {
            only: 'Bạn có chắc chắn muốn xóa danh hiệu thi đua: ',
            many: 'Bạn có chắc chắn muốn xóa các danh hiệu thi đua được chọn?'
        }

    }

}

export default EmulationResource;