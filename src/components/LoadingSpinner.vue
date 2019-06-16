<template>
  <div class='bubble-wrapper' v-if='visible'>
    <div ref='bubble' class='bubble'>
      <img class='bubble-image' src='../assets/nba.png'>
    </div>
		<p class='text'>...Loading...
			<br>...This may take a while due to limitations with the API I found...
		  <br>(Loader animated with GSAP!)
		</p>
    <div ref='bubblePulse' class='bubble-pulse'></div>
  </div>
</template>

<script>
import { TimelineLite, Back, Elastic, Expo } from 'gsap';
export default {
	props: {
		visible: {
			type: Boolean,
			required: true,
		},
	},
  mounted() {
    const { bubble, bubblePulse } = this.$refs;
    const timeline = new TimelineLite({
      onComplete: () => timeline.restart()
    })

    timeline.to(bubble, 0.4, {
      scale: 0.8,
      rotation: 16,
      ease: Back.easeOut.config(1.7)
    });
    timeline.to(
      bubblePulse,
      0.5,
      {
        scale: 0.9,
        opacity: 1
      },
      '-=0.6'
    );

    timeline.to(bubble, 1.2, {
      scale: 1,
      rotation: '-=16',
      ease: Elastic.easeOut.config(2.5, 0.5)
		});
		
    timeline.to(
      bubblePulse,
      1.1,
      {
        scale: 3,
        opacity: 0,
        ease: Expo.easeOut
      },
      '-=1.2'
		);
		
  }
};
</script>

<style scoped>
.bubble-wrapper {
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
}
.bubble {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  border-radius: 50%;
  height: 120px;
  width: 120px;
	margin-top: -60px;
  margin-left: -60px;
	top: 50%;
  left: 50%;
}
.text {
	position:absolute;
  z-index: 2;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
	top:60%;
	color:black;
}
.bubble-pulse {
  position: absolute;
  z-index: 1;
  height: 120px;
  width: 120px;
  top: 50%;
  left: 50%;
  margin-top: -60px;
  margin-left: -60px;
  background: #b92b27;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #1565C0, #b92b27);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #1565C0, #b92b27); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
}
.bubble-image {
  height: 50%;
	background: transparent !important;
	border-radius:50%;
}
</style>
