<template>
  <div id='teams' class='teams'>
    <Loader :visible='visible'/>
    <img style='height:100px;width:180px;margin:1px auto;' src='../assets/nba2.png' />
    <h3 style='color:#0d6bb7;font-size:1.5em;'>2018-2019 Rosters</h3>
    <hr style='background:black;width:80%'> 
    <CardGrid id='grid' :teams='teams'/>
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
        const self = this;
        setTimeout(() => {
          self.visible = false;
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.teams {
  margin: 0 auto;
}
</style>
