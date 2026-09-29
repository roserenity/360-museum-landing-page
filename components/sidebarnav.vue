<template>
  <section v-click-outside="onClickOutside">
    <section class="float-menu d-flex flex-row">
        <v-icon
        v-show="!drawer"
        role="button"
        aria-hidden="false"
        color="white"
        x-large
        @click.stop="drawer = !drawer"
        class="mr-6"
        title="menu button"
        >
          mdi-menu
        </v-icon>
        <v-icon
          v-show="drawer"
          role="button"
          aria-hidden="false"
          color="white"
          x-large
          @click.stop="drawer = !drawer"
          class="mr-6"
          title="menu button"
        >
          mdi-close
        </v-icon>
      <v-img
        class="siteLogo"
        :src="siteLogo"
        alt="Pinoy Hoops logo"
        width="80"/>
    </section>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      class="black navigation-drawer"
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="white--text"
          class="white--text text-left pl-3"
        >
          <v-list-item @click.stop="navigateTo('#museum-360')" class="white--text m-16 text-6 pa-2 text-wrap">
            ABOUT
          </v-list-item>
          <v-list-item @click.stop="navigateTo('#access-pass')" class="white--text m-16 text-6 pa-2 text-wrap">
            GENERAL ACCESS
          </v-list-item>
          <v-list-item @click.stop="navigateTo('#meta-zone')" class="white--text m-16 text-6 pa-2 text-wrap">
            LIMITED ACCESS
          </v-list-item>
          <!-- <v-list-item v-for="item in navItem" :key="item.name" :href="item.link" @click.stop="drawer = false">
            <v-list-item-title class="white--text m-16 text-4 text-wrap">
                {{ item.name }}
            </v-list-item-title>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </section>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    siteLogo: require('~/assets/images/logo.svg'),
    navItem: [
      { name: "GENERAL ACCESS", link: "/general-access" },
      { name: "LIMITED ACCESS", link: "/limited-access" },
    ],
  }),
  methods: {
    onClickOutside () {
      this.drawer = false
    },
    navigateTo (target) {
      this.drawer = false
      this.$vuetify.goTo(target)
    }
  },
};
</script>
<style>

.float-menu {
  background-color: transparent !important;
  top: 8vh;
  left: 10vw;
  position: absolute;
  z-index: 5;
}
.v-navigation-drawer {
  position: absolute;
  z-index: 3;
  width: 40vw !important;
}
.v-list {
  margin-top: 18vh;
}
.v-list-item-group > .v-list-item {
  margin-left: 20%;
}
@media screen and (max-device-width: 480px) {
  .v-navigation-drawer {
    width: 70vw !important;
  }
}

</style>
