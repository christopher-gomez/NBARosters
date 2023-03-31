import Vue from 'vue';
import Router, { createMemoryHistory } from 'vue-router'
import Home from './views/Teams.vue';
import PlayerView from './views/Players.vue';

Vue.use(Router);

export default new Router({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'Teams',
      component: Home,
    },
    {
      path: '/players',
      name: 'PlayerView',
      component: PlayerView,
      props: true,
    },
    {
      path: '*',
      component: Home,
    },
  ],
});
