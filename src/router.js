import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Teams.vue';
import PlayerView from './views/Players.vue';

Vue.use(Router);

console.log('APP URL: ');
console.log(process.env.APP_URL);

export default new Router({
  mode: 'history',
  base: process.env.APP_URL,
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
