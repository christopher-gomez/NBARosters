<template>
  <div class="cards">
    <vue-glide>
      <vue-glide-slide v-for="(player, index) in players" :key="index">
        <Card :player="player"/>
      </vue-glide-slide>
      <template slot="control">
        <button data-glide-dir="<"><font-awesome-icon icon="arrow-left"/></button>
        <button data-glide-dir=">"><font-awesome-icon icon="arrow-right"/></button>
      </template>
    </vue-glide>
  </div>
</template>

<script>
import Card from "@/components/PlayerCard.vue";
import { Glide, GlideSlide } from "vue-glide-js";

export default {
  name: "Stack",
  components: {
    Card,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide
  },
  props: {
    players: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      current: 0
    };
  },
};
</script>

<style scoped>
.cards {
  margin: 0 auto;
}
</style>
