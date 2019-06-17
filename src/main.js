import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShare, faArrowRight, faArrowLeft, faPlus, faReply, faTrash,
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
library.add(faArrowRight);
library.add(faArrowLeft);
library.add(faPlus);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);

new Vue({
  router,
  render(h) { return h(App); },
}).$mount('#app');
