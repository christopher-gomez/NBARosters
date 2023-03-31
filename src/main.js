import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue';
import './plugins/bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShare, faArrowLeft, faAngleRight, faAngleDoubleRight, faAngleLeft, faAngleDoubleLeft, faPlus,
  faReply, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-glide-js/dist/vue-glide.css';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

library.add(faShare);
library.add(faTrash);
library.add(faReply);
library.add(faArrowLeft);
library.add(faAngleRight);
library.add(faAngleDoubleRight);
library.add(faAngleLeft);
library.add(faAngleDoubleLeft);
library.add(faPlus);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);

new Vue({
  router,
  render(h) { return h(App); },
}).$mount('#app');
