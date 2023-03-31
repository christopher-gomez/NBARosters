<template>
  <div class='card' :class='{flipped: isFlipped}'>
    <div class='front card-face'>
      <img :src='photoLink' alt='NBA Player Headshot' class='card-photo'>
      <div class='player-info' v-if='currPlayer'>
        <h2 style='margin-top:1em;'>{{currPlayer.first_name+' '+currPlayer.last_name}}</h2>
        <hr style='width:70%; background-color:black;'>
        <p>Position: {{currPlayer.position}}</p>
        <p>Height: {{currPlayer.height_feet}}'{{currPlayer.height_inches}}</p>
        <p>Weight: {{currPlayer.weight_pounds}}</p>
      </div>
      <div v-else class='player-info'>
        <input
          class='form-styling'
          type='text'
          name='position'
          placeholder='New Player'
          style='width:80%;height:35px; margin-top:1em'
          autocomplete='off'
          v-model='createdPlayer.full_name'
        >
        <hr style='width:70%; background-color:black;'>
        <label for='position'>Position:</label>
        <input
          class='form-styling'
          type='text'
          name='position'
          placeholder
          autocomplete='off'
          v-model='createdPlayer.position'
        >
        <br>
        <div style='margin:.5em .5em;'>
          <label for='height'>Height:</label>
          <input
            class='form-styling'
            type='text'
            name='height'
            placeholder
            style='width:10%'
            autocomplete='off'
            v-model='createdPlayer.height_feet'
            id='height'
          >
          <p style='display:inline-block;margin:0 2px;'>'</p>
          <input
            class='form-styling'
            type='text'
            name='height'
            placeholder
            style='width:10%'
            autocomplete='off'
            v-model='createdPlayer.height_inches'
          >
        </div>
        <label for='height'>Weight:</label>
        <input
          class='form-styling'
          type='text'
          name='weight'
          placeholder
          autocomplete='off'
          v-model='createdPlayer.weight_pounds'
        >
        <button
          style='display:block;color:black;height:10px;width:60px;font-size:18px;margin:.7em auto;'
          @click='createPlayer()'
        >Save</button>
      </div>
      <i class='flip-button' @click='flip()' v-if='player'>
        <font-awesome-icon icon='share'/>
      </i>
      <i class='trash-button' @click='deletePlayer()' v-if='player'>
        <font-awesome-icon icon='trash'/>
      </i>
    </div>
    <div class='back card-face'>
      <h3 style='margin-top:1em'>Additional Facts</h3>
      <hr style='background:white;width:70%'>
      <div v-if='currPlayer && currPlayer.additional_facts'>
        <p v-for='(fact, index) in currPlayer.additional_facts' :key='index' v-on:mouseover='factHover=true' v-on:mouseleave='factHover=false' style='display:block;margin:0 auto;'>{{ fact }}
          <i class='fact-trash-button' v-if='factHover' @click='removeFact(fact)'>
            <font-awesome-icon icon='trash'/>
          </i>
        </p>
      </div>
      <input
          class='form-styling'
          type='text'
          name='additional_fact'
          placeholder='Fact'
          style='width:80%;height:35px;margin:1em 2em;display:block;bottom:2em; position:absolute;'
          autocomplete='off'
          v-model='addiFact'
          v-on:keyup.enter='addFact()'
        >
      <i class='flip-button' @click='flip()'>
        <font-awesome-icon icon='share'/>
      </i>
      <i class='trash-button' @click='addFact()'>
        <font-awesome-icon icon='plus'/>
      </i>
    </div>
  </div>
</template>

<script>
import NBA from '@/services/NBAService.js';
import { required, minLength, maxLength, integer, alpha } from 'vuelidate/lib/validators';

export default {
  name: 'PlayerCard',
  props: {
    player: {
      type: Object,
      required: false,
    },
    team: {
      type: Object,
      required: true
    }
  },
  validations: {
    createdPlayer: {
      full_name: {
        required,
        minLength: minLength(1),
      },
      position: {
        minLength: minLength(1),
        maxLength: maxLength(3),
        required,
        alpha,
      },
      height_feet: {
        minLength: minLength(1),
        required,
        integer,
      },
      height_inches: {
        minLength: minLength(1),
        maxLength: maxLength(2),
        required,
        integer,
      },
      weight_pounds: {
        minLength: minLength(1),
        required,
        integer,
      }
    },
    addiFact: {
      required,
      minLength: minLength(1),
    }
  },
  data() {
    return {
      currPlayer: Object,
      updatePlayer: Object,
      isFlipped: false,
      photoLink: '',
      createdPlayer: {
        full_name: '',
        first_name: '',
        last_name: '',
        position: '',
        height_feet: '',
        height_inches: '',
        weight_pounds: '',
        team: {
          id: this.team.id,
          abbreviation: this.team.abbreviation,
          city: this.team.city,
          conference: this.team.conference,
          division: this.team.division,
          full_name: this.team.full_name,
          name: this.team.name
        },
      },
      addiFact: '',
      factHover: false,
    };
  },
  mounted() {
    this.currPlayer = this.player;
    this.updatePlayer = this.player;
    if (this.player === undefined) {
      this.photoLink = require('@/assets/sil.png');
      return;
    }
    var url = `https://aerobic-ward-301402.wl.r.appspot.com/players/${
      this.player.last_name
    }/${this.player.first_name}`;
    var self = this;
    this.imageExists(url, function(exists) {
      if (!exists) {
        self.photoLink = require('@/assets/sil.png');
      } else {
        self.photoLink = url;
      }
    });
  },
  methods: {
    flip() {
      this.isFlipped = !this.isFlipped;
    },
    imageExists(url, callback) {
      var img = new Image();
      img.onload = function() {
        callback(true);
      };
      img.onerror = function() {
        callback(false);
      };
      img.src = url;
    },
    async createPlayer() {
      this.$v.$touch()
      if(this.$v.createdPlayer.$invalid) {
        return;
      } else {
        let res = this.createdPlayer.full_name.split(' ');
        this.createdPlayer.first_name = res[0];
        if (res[1] !== undefined) {
          this.createdPlayer.last_name = res[1];
        }
        const response = await NBA.createPlayer(this.createdPlayer);
        if (response.status === 200) {
          this.$emit('add');
        }
      }
    },
    async deletePlayer() {
      if (this.player === undefined) {
        return;
      }
      const response = await NBA.deletePlayer(this.player._id);
      if (response.status === 200) {
        this.$emit('delete', this.player);
      }
    },
    async addFact() {
      this.$v.$touch()
      if(this.$v.addiFact.$invalid) {
        return;
      } else {
        this.updatePlayer.additional_facts.push(this.addiFact);
        const response = await NBA.updatePlayer(this.updatePlayer);
        if (response.status === 200) {
          this.addiFact = '';
          this.currPlayer = this.updatePlayer;
        }
      }
    },
    async removeFact(fact) {
      this.updatePlayer.additional_facts = this.updatePlayer.additional_facts.filter(item => item !== fact);
      const response = await NBA.updatePlayer(this.updatePlayer);
      if (response.status === 200) {
        this.currPlayer = this.updatePlayer;
      }
    },
  },
};
</script>

<style scoped>
.form-styling {
  width: 20%;
  height: 25px;
  border: none;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.2);
  color: black;
  display: inline-block;
  text-align: center;
}

::placeholder {
  /* Firefox, Chrome, Opera */
  color: black;
  opacity: .6;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: black;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: black;
}

label {
  display: inline-block;
  margin-right: 0.5em;
}

:focus {
  outline: none;
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
  background: #abbaab;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #ffffff, #abbaab);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #ffffff, #abbaab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  pointer-events: auto;
  color:black;
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
  background: #abbaab;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #ffffff, #abbaab);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #ffffff, #abbaab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  transform: rotateY(180deg);
  text-align: center;
  color: black;
  border-radius: 10px;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
}

.back p {
  margin: 0;
  font-weight:200;
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

.trash-button {
  position: absolute;
  bottom: 1em;
  left: 1em;
}

.fact-trash-button {
  display:inline-block;
  margin-left:1em;
}

.trash-button:hover {
  cursor: pointer;
}
.fact-trash-button:hover {
  cursor: pointer;
}
</style>
