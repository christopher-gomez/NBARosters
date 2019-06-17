<template>
  <div class='cards'>
    <vue-glide v-model='activeSlide'>
      <vue-glide-slide v-for='(player, index) in playArr' :key='index'>
        <Card :player='player' :team='team' @delete='deletePlayer'/>
      </vue-glide-slide>
      <vue-glide-slide>
        <Card ref='form' :team='team' @add='addPlayer()'/>
      </vue-glide-slide>
      <template slot='control'>
        <button @click='decSlide()'>
          <font-awesome-icon icon='arrow-left'/>
        </button>
        <button style='display:inline-block' @click='create()'>
          <font-awesome-icon icon='plus'/>
        </button>
        <button @click='incSlide()'>
          <font-awesome-icon icon='arrow-right'/>
        </button>
      </template>
    </vue-glide>
  </div>
</template>

<script>
import Card from '@/components/PlayerCard.vue';
import { Glide, GlideSlide } from 'vue-glide-js';
import { EventBus } from '@/services/EventBus.js';

export default {
  name: 'Stack',
  components: {
    Card,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
  props: {
    players: {
      type: Array,
      required: true,
    },
    team: {
      type: Object,
      required: true,
    },
    activeSlide: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      playArr: Array,
    };
  },
  created() {
    this.playArr = this.players;
    this.activeSlide = parseInt(this.$route.query.slide, 10);
  },
  methods: {
    create() {
      this.activeSlide = this.players.length - 1;
      this.$router.replace({query: {team: this.$route.query.team, slide: this.activeSlide }});
    },
    decSlide() {
      if (this.activeSlide === 0) {
        this.activeSlide = this.playArr.length - 1;
      } else {
        this.activeSlide -= 1;
      }
      this.$router.replace({query: {team: this.$route.query.team, slide: this.activeSlide }});
    },
    incSlide() {
      if(this.activeSlide === this.playArr.length - 1) {
        this.activeSlide = 0;
      } else {
        this.activeSlide += 1;
      }
      this.$router.replace({query: {team: this.$route.query.team, slide: this.activeSlide }});
    },
    addPlayer() {
      this.$router.replace({query: {team: this.$route.query.team, slide: this.activeSlide += 1 }});
      this.$emit('update');
    },
    deletePlayer(player) {
      this.playArr = this.playArr.filter((obj) => {
        return obj.first_name !== player.first_name && obj.last_name !== player.last_name;
      });
      if (this.activeSlide === 0) {
        this.activeSlide += 1;
        this.$router.replace({query: {team: this.$route.query.team, slide: this.activeSlide }});
      } else {
        this.activeSlide -= 1;
        this.$router.replace({query: {team: this.$route.query.team, slide: this.activeSlide }});
      }
    }
  },
};
</script>

<style scoped>
.cards {
  margin: 0 auto;
}
</style>
