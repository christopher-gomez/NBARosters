<template>
  <div class='home'>
    <CardGrid :teams='teams'/>
  </div>
</template>

<script>
// @ is an alias to /src
import CardGrid from '@/components/CardGrid.vue';
import NBA from '@/services/NBAService.js';

export default {
  name: 'Teams',
  components: {
    CardGrid,
  },
  data() {
    return {
      teams: [],
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
