<template>
  <div class='card' :class=cardClass(team) @click='navigate()'>
    <div class='front card-face'>
      <h1>{{team}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamCard',
  props: {
    team: {
      type: String,
      required: true,
    },
  },
  methods: {
    navigate() {
      this.$router.push({ name: 'PlayerView', params: { team: this.team } });
    },
    cardClass(team) {
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
    },
  },
};
</script>

<style lang='scss' scoped>
@import '../styles/index.scss';

.Hawks {
  background: $hawks;
}
.Celtics {
  background: $celtics;
}
.Nets {
  background: $nets;
}
.Hornets {
  background: $hornets;
}
.Bulls {
  background: $bulls;
}
.Cavs {
  background: $cavs;
}
.Mavs {
  background: $mavs;
}
.Nuggets {
  background: $nuggets;
}
.Pistons {
  background: $pistons;
}
.Warriors {
  background: $warriors;
}
.Rockets {
  background: $rockets;
}
.Pacers {
  background: $pacers;
}
.Clippers {
  background: $clippers;
}
.Lakers {
  background: $lakers;
}
.Grizzlies {
  background: $grizzlies;
}
.Heat {
  background: $heat;
}
.Bucks {
  background: $bucks;
}
.Wolves {
  background: $wolves;
}
.Pels {
  background: $pels;
}
.Knicks {
  background: $knicks;
}
.Thunder {
  background: $thunder;
}
.Magic {
  background: $magic;
}
.Sixers {
  background: $sixers;
}
.Suns {
  background: $suns;
}
.Blazers {
  background: $blazers;
}
.Kings {
  background: $kings;
}
.Spurs {
  background: $spurs;
}
.Raptors {
  background: $raptors;
}
.Jazz {
  background: $jazz;
}
.Wizards {
  background: $wizards;
}

.card {
  display: flex;
  width: 300px;
  max-width: 300px;
  height: 450px;
  margin: 1em auto;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s, box-shadow 0.4s;
  box-shadow: 0 6px 6px 0 rgba(60, 64, 67, 0.302),
    0 1px 3px 1px rgba(60, 64, 67, 0.149);
  border-radius: 10px;
}

.card:hover {
  cursor: pointer;
}

.front,
.card-photo {
  width: 100%;
  height: 100%;
}

.card-face {
  backface-visibility: hidden;
  border-radius: 10px;
  margin: auto;
  width: 100%;
  height: 30%;
}

.card:hover {
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.302),
    0 4px 8px 3px rgba(60, 64, 67, 0.149);
}
</style>
