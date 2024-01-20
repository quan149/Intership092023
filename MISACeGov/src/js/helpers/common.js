import emitter from 'tiny-emitter/instance';
import MISAResourse from '../resource/base'
import MISANotifyResource from '../resource/notify-text'

const common = {
    setDataToToastMessage(type, title, content) {
        emitter.emit('setDataToToastMessage', type, title, content)
    },

    handleShowForm(type, title, selectedId) {
        emitter.emit('handleShowForm', type, title, selectedId)
    },

    handleShowDialog(type, title, content, action) {
        emitter.emit('handleShowDialog', type, title, content, action)
    },

    showLoadingData() {
        emitter.emit('showLoadingData')
    },

    handleError(res) {
        this.handleShowDialog(MISAResourse.Dialog.error, MISANotifyResource.dialog.title.warning, res.response.data.UserMessage, null)
    },

    downloadFileExcel(res, name) {
        emitter.emit('downloadFileExcel', res, name)
    },

};

export default common;
