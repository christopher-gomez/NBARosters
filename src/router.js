import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Teams.vue';
import PlayerView from './views/Players.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
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
