<template>
  <div class='card' :class='{flipped: isFlipped}'>
    <div class='front card-face'>
      <img :src='photoLink' alt='NBA Player Headshot' class='card-photo'>
      <div class='player-info'>
        <h2>{{player.first_name+' '+player.last_name}}</h2>
        <hr style='width:70%; background-color:white;'>
        <h3>{{player.team.name}}</h3>
        <p>Position: {{player.position}}</p>
        <p>Height: {{player.height_feet}}'{{player.height_inches}}</p>
        <p>Weight: {{player.weight_pounds}}</p>
      </div>
      <i class='flip-button' @click='flip()'>
        <font-awesome-icon icon='share'/>
      </i>
    </div>
    <div class='back card-face'>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      <i class='flip-button' @click='flip()'>
        <font-awesome-icon icon='share'/>
      </i>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PlayerCard',
  props: {
    player: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isFlipped: false,
      photoLink: '',
    };
  },
  mounted() {
    this.photoLink = `https://nba-players.herokuapp.com/players/${this.player.last_name}/${this.player.first_name}`;
  },
  methods: {
    flip() {
      this.isFlipped = !this.isFlipped;
    },
  },
};
</script>

<style scoped>
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
  background: #000000; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #434343,
    #000000
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #434343,
    #000000
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  pointer-events: auto;
}

.front,
.back,
.card-photo {
  width: 100%;
  height: 100%;
}

.card-face {
  position: absolute;
  backface-visibility: hidden;
  height: 100%;
  border-radius: 10px;
}

.card-face .player-info {
  line-height: 80%;
}

.card-photo {
  border-radius: 50%;
  object-fit: none;
  height: 50%;
  width: 70%;
}

.card:hover {
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.302),
    0 4px 8px 3px rgba(60, 64, 67, 0.149);
}

.back {
  background-color: gray;
  transform: rotateY(180deg);
  text-align: center;
  color: darkgray;
  border-radius: 10px;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
}

.back p {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.flipped {
  transform: rotateY(180deg);
}

.flip-button {
  position: absolute;
  bottom: 1em;
  right: 1em;
}

.flip-button:hover {
  cursor: pointer;
}
</style>
