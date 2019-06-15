<template>
  <div class="home">
    <Card :isCurrent='true'/>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue';

export default {
  name: 'home',
  components: {
    Card,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  margin: auto auto 100px;
}
</style>
