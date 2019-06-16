<template>
  <div class="home">
    <CardViewer :players="players"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CardViewer from "@/components/CardCarousel.vue";

export default {
  name: "home",
  components: {
    CardViewer
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
          position: "F",
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
        },
      ]
    };
  }
};
</script>

<style scoped>
.home {
  margin: 0 auto;
}
</style>
