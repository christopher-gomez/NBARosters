import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShare, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'vue-glide-js/dist/vue-glide.css';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

library.add(faShare);
library.add(faArrowRight);
library.add(faArrowLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  render(h) { return h(App); },
}).$mount('#app');
