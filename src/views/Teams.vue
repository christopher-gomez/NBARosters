<template>
  <div id='teams' class='teams'>
    <Loader :visible='visible'/>
    <img style='height:100px;width:180px;margin:1px auto;' src='../assets/nba2.png' />
    <br>
    <h3 style='color:#0d6bb7;font-size:1.5em;font-weight:600;text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;'>2018-2019 Rosters</h3>
    <input type="text" v-model="search" placeholder="Search Teams..." class='form-styling'/>
    <hr style='background:black;width:80%'>
    <CardGrid id='grid' :teams='filteredTeams'/>
  </div>
</template>

<script>
// @ is an alias to /src
import CardGrid from '@/components/CardGrid.vue';
import NBA from '@/services/NBAService.js';
import Loader from '@/components/LoadingSpinner.vue';

export default {
  name: 'TeamView',
  components: {
    CardGrid,
    Loader,
  },
  data() {
    return {
      teams: [],
      visible: true,
      search: '',
    };
  },
  created() {
    this.getTeams();
  },
  methods: {
    async getTeams() {
      const response = await NBA.getTeams();
      if (response.data) {
        this.teams = response.data.teams;
        const self = this;
        setTimeout(() => {
          self.visible = false;
        }, 1200);
      }
    },
  },
  computed: {
    filteredTeams() {
      if(this.teams.length > 0) {
        return this.teams.filter(team => {
          return team.full_name.toLowerCase().includes(this.search.toLowerCase())
        });
      } else {
        return this.teams;
      }
    }
  }
};
</script>

<style scoped>
.form-styling {
  width: 20%;
  height: 25px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 253, 253, 0.315);
  color: black;
  text-align: center;
  display: inline-block;
}

::placeholder {
  /* Firefox, chrome, Opera */
  color: black;
  opacity: .7;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: black;
  opacity: .7;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: black;
  opacity: .7;
}

label {
  display: inline-block;
  margin-right: 0.5em;
}

:focus {
  outline: none;
}
.teams {
  margin: 0 auto;
  background-image: url('../assets/wood2.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  min-height:100vh;
}
</style>
