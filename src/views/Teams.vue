<template>
  <div class='home'>
    <Loader :visible='visible'/>
    <h1 style='padding-top:1em;color:black;'>National Basketball Association</h1><h3 style='color:black'>2018-2019</h3>
    <hr style='background:black;width:80%'> 
    <CardGrid :teams='teams'/>
  </div>
</template>

<script>
// @ is an alias to /src
import CardGrid from '@/components/CardGrid.vue';
import NBA from '@/services/NBAService.js';
import Loader from '@/components/LoadingSpinner.vue';

export default {
  name: 'Teams',
  components: {
    CardGrid,
    Loader,
  },
  data() {
    return {
      teams: [],
      visible: true,
    };
  },
  created() {
    this.getTeams();
  },
  methods: {
    async getTeams() {
      const response = await NBA.getTeams();
      if (response.data) {
        this.teams = response.data.teams;
        this.visible = false;
      }
    },
  },
};
</script>

<style scoped>
.home {
  margin: 0 auto;
}
</style>
