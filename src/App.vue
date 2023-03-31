<template>
  <div id='app'>
    <Loading :visible='loading' :text="loadingText"/>
    <router-view v-if='visible'/>
  </div>
</template>

<script>
import NBA from '@/services/NBAService.js';
import Loading from '@/components/LoadingSpinner.vue';

export default {
  name: 'app',
  components: {
    Loading,
  },
  data() {
    return {
      players: [],
      page: 1,
      visible: false,
      loading: true,
      loadingText: '<p>Loading...<br>This should only take a while the very first time this is opened</p>',
    };
  },
  created() {
    this.checkPlayersExist();
  },
  methods: {
    async checkPlayersExist() {
      const response = await NBA.checkPlayersExist();
      if (response.data) {
        if (response.data.exist === true) {
          let self = this;
          setTimeout(() => {
            self.visible = true;
            self.loading = false;
          }, 1000);
          return;
        } else {
          this.downloadPlayers();
        }
      }
    },
    async downloadPlayers() {
      const response = await NBA.downloadPlayers(this.page);
      if (response.data) {
        if (response.data.meta.total_pages !== this.page) {
          this.page += 1;
          this.downloadPlayers();
        } else {
          this.loading = false;
          this.visible = true;
        }
      }
    }
  },
}
</script>


<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
button {
  background: none;
  border: none;
  font-size: 2em;
  margin: 20px 20px;
  outline: none !important;
}
button:hover {
  cursor: pointer;
}
</style>
