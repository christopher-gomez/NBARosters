<template>
  <div class='players'>
    <Loader :visible='visible' :text='loadingText'/>
    <div style='width:95%;'>
      <button style='disaply:inline-block;width:1%' @click='$router.go(-1)' v-if='!visible'>
        <font-awesome-icon icon='arrow-left'/>
      </button>
      <h1 style='color:black;display:inline-block;width:94%' v-if='!visible'>{{team.full_name}}</h1>
    </div>
    <CardCarousel v-if='complete' :players='players' :team='team' @update='refresh()' />
  </div>
</template>

<script>
import CardCarousel from '@/components/CardCarousel.vue';
import Loader from '@/components/LoadingSpinner.vue';
import NBA from '@/services/NBAService.js';

export default {
  name: 'PlayerView',
  components: {
    CardCarousel,
    Loader,
  },
  data() {
    return {
      players: [],
      page: 1,
      complete: false,
      visible: true,
      loadingText: '<p>Loading...</p>',
      team: Object,
    };
  },
  created() {
    this.getTeam();
  },
  methods: {
    async getTeam() {
      this.visible = true;
      this.complete = false;
      const response = await NBA.getTeam(this.$route.query.team);
      if (response.data) {
        this.team = response.data.team;
        this.getPlayers();
      }
    },
    async getPlayers() {
      const response = await NBA.getTeamPlayers(this.team.name);
      if (response.data) {
        this.players = response.data.players;
        this.complete = true;
        this.visible = false;
      }
    },
    // Hacky
    refresh() {
      console.log('refresing');
      this.getTeam();
    },
  },
};
</script>

<style scoped>
.players {
  margin: 0 auto;
}
</style>
