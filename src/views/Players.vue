<template>
  <div class='players'>
    <Loader :visible='visible' :text='loadingText'/>
    <div style='width:95%;'>
      <button style='disaply:inline-block;width:1%' @click='$router.go(-1)' v-if='!visible'>
        <font-awesome-icon icon='arrow-left'/>
      </button>
      <h1 style='color:black;display:inline-block;width:94%' v-if='!visible'>{{team.full_name}}</h1>
    </div>
    <CardCarousel v-if='complete' :players='players'/>
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
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      players: [],
      page: 1,
      complete: false,
      visible: true,
      loadingText: '<p>...Loading...<br>...This may take a while due to limitations with the API I found...</p>'
    };
  },
  created() {
    this.getPlayers();
  },
  methods: {
    async getPlayers() {
      const response = await NBA.getPlayers(this.page);
      if (response.data) {
        for (let i = 0; i < response.data.players.length; i+=1) {
          if (response.data.players[i].team.name === this.team.name && response.data.players[i].height_feet !== null) {
            this.players.push(response.data.players[i]);
          }
        }
        if (response.data.meta.total_pages !== this.page) {
          this.page += 1;
          this.getPlayers();
        } else {
          this.complete = true;
          this.visible = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.players {
  margin: 0 auto;
}
</style>
