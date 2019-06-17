<template>
  <div class='cards'>
    <vue-glide v-model='activeSlide' :per-view='1'>
      <vue-glide-slide v-for='(player, index) in playArr' :key='index'>
        <Card :player='player' :team='team' @delete='deletePlayer'/>
      </vue-glide-slide>
      <vue-glide-slide>
        <Card ref='form' :team='team' @add='addPlayer()'/>
      </vue-glide-slide>
      <template slot='control'>
        <button class='controls' @click='activeSlide = 0'>
          <font-awesome-icon icon='angle-double-left'/>
        </button>
        <button class='controls' @click='decSlide()'>
          <font-awesome-icon icon='angle-left'/>
        </button>
        <button style='display:inline-block;color:white;' @click='create()'>
          <font-awesome-icon icon='plus'/>
        </button>
        <button class='controls' @click='incSlide()'>
          <font-awesome-icon icon='angle-right'/>
        </button>
        <button class='controls' @click='activeSlide = playArr.length - 1'>
          <font-awesome-icon icon='angle-double-right'/>
        </button>
      </template>
    </vue-glide>
  </div>
</template>

<script>
import Card from '@/components/PlayerCard.vue';
import { Glide, GlideSlide } from 'vue-glide-js';

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
  },
  data() {
    return {
      playArr: Array,
      activeSlide: 0,
    };
  },
  created() {
    this.playArr = this.players;
    this.activeSlide = parseInt(this.$route.query.slide, 10);
  },
  methods: {
    create() {
      this.activeSlide = this.players.length;
      this.$router.replace({ query: { team: this.$route.query.team, slide: this.activeSlide } });
    },
    decSlide() {
      if (this.activeSlide === 0) {
        this.activeSlide = this.playArr.length - 1;
      } else {
        this.activeSlide -= 1;
      }
      this.$router.replace({ query: { team: this.$route.query.team, slide: this.activeSlide } });
    },
    incSlide() {
      if (this.activeSlide === this.playArr.length || this.activeSlide === this.playArr.length - 1) {
        this.activeSlide = 0;
      } else {
        this.activeSlide += 1;
      }
      this.$router.replace({ query: { team: this.$route.query.team, slide: this.activeSlide } });
    },
    addPlayer() {
      this.$router.replace({ query: { team: this.$route.query.team, slide: this.activeSlide} });
      this.$emit('update');
    },
    deletePlayer(player) {
      this.playArr = this.playArr.filter((obj) => {
        return obj._id !== player._id; 
      });
      if (this.activeSlide === 0) {
        this.activeSlide += 1;
        this.$router.replace({ query: { team: this.$route.query.team, slide: this.activeSlide } });
      } else {
        this.activeSlide -= 1;
        this.$router.replace({ query: { team: this.$route.query.team, slide: this.activeSlide } });
      }
    },
  },
};
</script>

<style scoped>
.cards {
  margin: 0 auto;
}
.controls {
  color: white;
}
/*
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px to 1024px
*/
@media (max-width: 768px) {
  .controls {
    display: none;
  }
}
/*
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/
@media (min-width: 481px) and (max-width: 767px) {
  .controls {
    display: none;
  }
}
/*
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/
@media (min-width: 320px) and (max-width: 480px) {
  .controls {
    display: none;
  } 
}
</style>
