<template>
  <div class='players' :class='teamClass(team.name)'>
    <Loader :visible='visible' :text='loadingText'/>
    <div style='width:95%;'>
      <button
        style='disaply:inline-block;width:1%;color:white;'
        @click='$router.go(-1)'
        v-if='!visible'
      >
        <font-awesome-icon icon='arrow-left'/>
      </button>
      <h1 style='display:inline-block;width:94%' v-if='!visible'>{{team.full_name}}</h1>
      <hr style='background:white;width:70%;padding:0px;margin:0px auto;'>
    </div>
    <CardCarousel v-if='complete' :players='players' :team='team' @update='refresh()'/>
  </div>
</template>

<script>
import CardCarousel from '@/components/CardCarousel.vue';
import Loader from '@/components/LoadingSpinner.vue';
import NBA from '@/services/NBAService.js';

export default {
  name: 'PlayerView',
  components: {
    CardCarousel,
    Loader
  },
  data() {
    return {
      players: [],
      page: 1,
      complete: false,
      visible: true,
      loadingText: '<p>Loading...</p>',
      team: Object
    };
  },
  created() {
    this.getTeam();
  },
  methods: {
    async getTeam() {
      this.visible = true;
      this.complete = false;
      const response = await NBA.getTeam(this.$route.query.team);
      if (response.data) {
        this.team = response.data.team;
        this.getPlayers();
      }
    },
    async getPlayers() {
      const response = await NBA.getTeamPlayers(this.team.name);
      if (response.data) {
        this.players = response.data.players;
        this.complete = true;
        const self = this;
        setTimeout(() => {
          self.visible = false;
        }, 1000);
      }
    },
    // Hacky
    refresh() {
      this.getTeam();
    },
    teamClass(team) {
      const result = [];
      switch (team) {
        case 'Hawks':
          result.push(team);
          break;
        case 'Celtics':
          result.push(team);
          break;
        case 'Nets':
          result.push(team);
          break;
        case 'Hornets':
          result.push(team);
          break;
        case 'Bulls':
          result.push(team);
          break;
        case 'Cavaliers':
          result.push('Cavs');
          break;
        case 'Mavericks':
          result.push('Mavs');
          break;
        case 'Nuggets':
          result.push(team);
          break;
        case 'Pistons':
          result.push(team);
          break;
        case 'Warriors':
          result.push(team);
          break;
        case 'Rockets':
          result.push(team);
          break;
        case 'Pacers':
          result.push(team);
          break;
        case 'Clippers':
          result.push(team);
          break;
        case 'Lakers':
          result.push(team);
          break;
        case 'Grizzlies':
          result.push(team);
          break;
        case 'Heat':
          result.push(team);
          break;
        case 'Bucks':
          result.push(team);
          break;
        case 'Timberwolves':
          result.push('Wolves');
          break;
        case 'Pelicans':
          result.push('Pels');
          break;
        case 'Knicks':
          result.push(team);
          break;
        case 'Thunder':
          result.push(team);
          break;
        case 'Magic':
          result.push(team);
          break;
        case '76ers':
          result.push('Sixers');
          break;
        case 'Suns':
          result.push(team);
          break;
        case 'Trail Blazers':
          result.push('Blazers');
          break;
        case 'Kings':
          result.push(team);
          break;
        case 'Spurs':
          result.push(team);
          break;
        case 'Raptors':
          result.push(team);
          break;
        case 'Jazz':
          result.push(team);
          break;
        case 'Wizards':
          result.push(team);
          break;
        default:
          result.push('');
      }
      return result;
    }
  }
};
</script>

<style lang='scss' scoped>
@import '../styles/index.scss';

.Hawks {
  background: $hawks;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($hawks, 10%),
    $hawks
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($hawks, 10%), $hawks 20%);
}
.Celtics {
  background: $celtics;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($celtics, 10%),
    $celtics
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($celtics, 10%), $celtics);
}
.Nets {
  background: $nets;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($nets, 10%),
    $nets
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($nets, 10%), $nets);
}
.Hornets {
  background: $hornets;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($hornets, 10%),
    $hornets
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($hornets, 10%), $hornets);
}
.Bulls {
  background: $bulls;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($bulls, 10%),
    $bulls
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($bulls, 10%), $bulls);
}
.Cavs {
  background: $cavs;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($cavs, 10%),
    $cavs
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($cavs, 10%), $cavs);
}
.Mavs {
  background: $mavs;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($mavs, 10%),
    $mavs
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($mavs, 10%), $mavs);
}
.Nuggets {
  background: $nuggets;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($nuggets, 10%),
    $nuggets
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($nuggets, 10%), $nuggets);
}
.Pistons {
  background: $pistons;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($pistons, 10%),
    $pistons
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($pistons, 10%), $pistons);
}
.Warriors {
  background: $warriors;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($warriors, 10%),
    $warriors
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($warriors, 10%), $warriors);
}
.Rockets {
  background: $rockets;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($rockets, 10%),
    $rockets
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($rockets, 10%), $rockets);
}
.Pacers {
  background: $pacers;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($pacers, 10%),
    $pacers
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($pacers, 10%), $pacers);
}
.Clippers {
  background: $clippers;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($clippers, 10%),
    $clippers
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($clippers, 10%), $clippers);
}
.Lakers {
  background: $lakers;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($lakers, 10%),
    $lakers
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($lakers, 10%), $lakers);
}
.Grizzlies {
  background: $grizzlies;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($grizzlies, 10%),
    $grizzlies
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($grizzlies, 10%), $grizzlies);
}
.Heat {
  background: $heat;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($heat, 10%),
    $heat
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($heat, 10%), $heat);
}
.Bucks {
  background: $bucks;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($bucks, 10%),
    $bucks
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($bucks, 10%), $bucks);
}
.Wolves {
  background: $wolves;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($wolves, 10%),
    $wolves
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($wolves, 10%), $wolves);
}
.Pels {
  background: $pels;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($pels, 10%),
    $pels
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($pels, 10%), $pels);
}
.Knicks {
  background: $knicks;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($knicks, 10%),
    $knicks
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($knicks, 10%), $knicks);
}
.Thunder {
  background: $thunder;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($thunder, 10%),
    $thunder
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($thunder, 10%), $thunder);
}
.Magic {
  background: $magic;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($magic, 10%),
    $magic
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($magic, 10%), $magic);
}
.Sixers {
  background: $sixers;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($sixers, 10%),
    $sixers
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($sixers, 10%), $sixers);
}
.Suns {
  background: $suns;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($suns, 10%),
    $suns
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($suns, 10%), $suns);
}
.Blazers {
  background: $blazers;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($blazers, 10%),
    $blazers
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($blazers, 10%), $blazers);
}
.Kings {
  background: $kings;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($kings, 10%),
    $kings
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($kings, 10%), $kings);
}
.Spurs {
  background: $spurs;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($spurs, 10%),
    $spurs
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($spurs, 10%), $spurs);
}
.Raptors {
  background: $raptors;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($raptors, 10%),
    $raptors
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($raptors, 10%), $raptors);
}
.Jazz {
  background: $jazz;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($jazz, 10%),
    $jazz
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($jazz, 10%), $jazz);
}
.Wizards {
  background: $wizards;
  background: -webkit-linear-gradient(
    to bottom,
    lighten($wizards, 10%),
    $wizards
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, lighten($wizards, 10%), $wizards);
}
.players {
  margin: 0 auto;
  color: white !important;
}
</style>
