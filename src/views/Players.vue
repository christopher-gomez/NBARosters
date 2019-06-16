<template>
  <div class='players'>
    <Loader :visible='visible' />
    <button style='display:flex;left:1em;' @click='$router.go(-1)'>
      <font-awesome-icon icon='arrow-left'/>
    </button>
    <CardCarousel v-if='complete' :players='players'/>
  </div>
</template>

<script>
import CardCarousel from '@/components/CardCarousel.vue';
import Loader from '@/components/LoadingSpinner.vue';
import NBA from '@/services/NBAService.js';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'PlayerView',
  components: {
    CardCarousel,
    Loading,
    Loader,
  },
  props: {
    team: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      players: [],
      page: 1,
      complete: false,
      visible: true,
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
          if (response.data.players[i].team.name === this.team && response.data.players[i].height_feet !== null) {
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
