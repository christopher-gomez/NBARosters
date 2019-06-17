<template>
  <b-container>
	  <b-row>
		  <b-col v-for='(team, index) in teams' :key='index'>
			  <TeamCard :team='team'></TeamCard>
		  </b-col>
	  </b-row>
  </b-container>
</template>

<script>
import TeamCard from '@/components/TeamCard.vue';

export default {
  name: 'CardGrid',
  props: {
	  teams: {
		  type: Array,
			required: true,
		},
	},
  components: {
    TeamCard,
  },
};
</script>

<style>
</style>
