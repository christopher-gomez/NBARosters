<template>
  <div class="players">
	  <button style='display:flex;left:1em;' @click="$router.go(-1)"><font-awesome-icon icon="arrow-left"/></button>
    <CardCarousel :players="players"/>
  </div>
</template>

<script>
import CardCarousel from "@/components/CardCarousel.vue";
export default {
  name: "PlayerView",
  components: {
    CardCarousel
  },
  data() {
    return {
      players: [
        {
          first_name: "LeBron",
          last_name: "James",
          age: "34",
          height: "6'8",
          weight: "250",
          team: "Los Angeles Lakers",
          position: "F"
        },
        {
          first_name: "Kawhi",
          last_name: "Leonard",
          age: "28",
          height: "6'7",
          weight: "240",
          team: "Toronto Raptors",
          position: "F"
        },
        {
          first_name: "Kawhi",
          last_name: "Leonard",
          age: "28",
          height: "6'7",
          weight: "240",
          team: "Toronto Raptors",
          position: "F"
        },
        {
          first_name: "Kawhi",
          last_name: "Leonard",
          age: "28",
          height: "6'7",
          weight: "240",
          team: "Toronto Raptors",
          position: "F"
        }
      ]
    };
  },
};
</script>

<style scoped>
.players {
	margin: 0 auto;
}
</style>
