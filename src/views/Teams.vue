<template>
  <div class="home">
    <CardGrid :teams='teams'/>
  </div>
</template>

<script>
// @ is an alias to /src
import CardViewer from "@/components/CardCarousel.vue";
import Team from '@/components/TeamCard.vue';
import CardGrid from '@/components/CardGrid.vue';

export default {
  name: "Teams",
  components: {
    CardViewer,
    Team,
    CardGrid,
  },
  data() {
    return {
      teams: [
        "Lakers",
        "Raptors",
        "Magic",
        "Heat",
        "Warriors"
      ],
    };
  }
};
</script>

<style scoped>
.home {
  margin: 0 auto;
}
</style>
