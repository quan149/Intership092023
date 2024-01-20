import { createApp} from 'vue'
import App from './App.vue'
import MISAInput from './components/input/MISAInput.vue'
import MISAListCheckbox from './components/input/MISAListCheckbox.vue'
import MISATable from './view/table-content/TableContent.vue'
import FilterForm from './view/form/form-filter/FormFilter.vue'
import FormDetailEmualation from './view/form/form-emulation/FormDetailEmualation.vue'
import ExcelFormInput from './view/excel/ExcelFormInput.vue'
import MISAIconLoadingData from './components/loading-icon/MISALoadingIcon.vue'
import MISAToastMessage from './components/toast-message/MISAToastMessage.vue'
import MISAIcon from './components/icon/MISAIcon.vue'
import MISADialog from './components/dialog/MISADialog.vue'
import MISACombobox from './components/combobox/MISACombobox.vue'
import router from './js/router/router'
import APIEmulation from './js/services/emulation.js'
import axios from 'axios'
import MISAEnum from './js/helpers/enum.js'
import MISAResource from './js/resource/base.js'
import EmulationResource from './js/resource/emulation.js'
import MISAButton from './components/button/MISAButton.vue'
import MISANotifyTextResource from './js/resource/notify-text.js'
import emitter from 'tiny-emitter/instance'
import common from './js/helpers/common.js'

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$apiEmulation = APIEmulation;
app.config.globalProperties.$enum = MISAEnum;
app.config.globalProperties.$resource = MISAResource;
app.config.globalProperties.$emulationResource = EmulationResource;
app.config.globalProperties.$notifyResource = MISANotifyTextResource;
app.config.globalProperties.$emitter = emitter;
app.config.globalProperties.$common = common;

app.component('m-input', MISAInput)
app.component('m-button', MISAButton)
app.component('m-checkbox', MISAListCheckbox)
app.component('m-combobox', MISACombobox)
app.component('m-table', MISATable)
app.component('m-filter-form', FilterForm)
app.component('m-popup', FormDetailEmualation)
app.component('m-loading-data', MISAIconLoadingData)
app.component('m-icon', MISAIcon)
app.component('m-toast-message', MISAToastMessage)
app.component('m-dialog', MISADialog)
app.component('m-excel-form', ExcelFormInput)
app.use(router).mount('#app')
