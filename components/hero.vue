<template>
  <section>
    <sidebarnav/>
    <section class="header flex-center-center-column padding-lr">
      <section class="text-center logo-text whiteOutline">
        <h1 class="text-3 blueText blueShadow">HOOPS</h1>
        <h2 class="text-0 redText redShadow">PINOY FANDOM MUSEUM</h2>
      </section>
      <p class="text-center text-6">
        "It's not just a game, but a way of life" — may be overused, but it aptly describes how basketball has become an integral part of Filipino culture, history and identity.
      </p>
      <p class="text-center text-6">
        Finally — a place like this exists. <br />
        Welcome to the Pinoy Hoops Fandom Museum.
      </p>
      <v-btn text class="btn mt-5 title-text text-2" @click="$vuetify.goTo('#access-pass')"> COMING SOON </v-btn>
    </section>
    <v-carousel
      delimiter-icon="mdi-minus"
      height="100vh"
      width="100vw"
      :show-arrows="false"
      hide-delimiter-background
      cycle
    >
      <v-carousel-item 
        v-for="(item, i) in items" 
        :key="i" 
        :src="item.src"
        :title="item.text">
      </v-carousel-item>
    </v-carousel>
  </section>
</template>

<script>
export default {
  data: () => ({
    model: 0,
    items: [
      {
        src: require("~/assets/carousel-imgs/carousel-1.jpg"),
        text: "Fan looking out over a packed arena"
      },
      {
        src: require("~/assets/carousel-imgs/carousel-2.jpg"),
        text: "Fans cheering under the lights"
      },
      {
        src: require("~/assets/carousel-imgs/carousel-3.jpg"),
        text: "Ball dropping toward the hoop at night"
      },
    ],
  }),
};
</script>

<style scoped>
h1 {
  line-height: 100px;
}
.header {
  background-color: rgb(0, 0, 0, 0.8) !important;
  position: absolute;
  z-index: 1;
  top: 0;
  height:100vh;
  width:100vw;
  color: white;
}
.whiteOutline {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
} 
.blueShadow {
  text-shadow: 0 0 10px #00428C, 0 0 20px #00428C, 0 0 30px #00428C;
}
.redShadow {
  text-shadow: 0 0 10px #F81B28, 0 0 20px #F81B28;
}
.v-carousel--hide-delimiter-background .v-carousel__controls {
  bottom: 0;
}
.v-carousel__controls__item.v-btn:before {
  background-color: transparent !important;
}
.v-carousel__controls__item.v-btn {
  color:  gray !important;
}
.v-carousel__controls__item.v-btn--active {
  color: white !important;
}

@media screen and (max-device-width: 480px) {
  h1 {
    line-height: 70px;
  }
  h2 {
    line-height: 60px;
  }
}
@media screen and (max-device-width: 320px) {
  h1 {
    line-height: 70px;
  }
  h2 {
    line-height: 50px;
  }
}
/* .v-btn__content > .v-icon::before {
  font-size: 50px;
} */
</style>
