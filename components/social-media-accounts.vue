<template>
  <section class="pt-10">
    <v-btn
      v-for="link in socmedLinks"
      :key="link.name"
      icon
      link 
      :href="link.url" 
      target="_blank"
      class="pa-5"
      :title="link.title">
      <v-icon
        aria-hidden="false"
        color="white"
        x-large
      >
        {{ link.icon }}
      </v-icon>
    </v-btn>
  </section>
</template>

<script>
export default {
  data: () => ({
    socmedLinks: [
      {
        name: 'facebook',
        icon: "mdi-facebook",
        title: 'Facebook',
        url: 'https://www.facebook.com'
      },
      {
        name: 'instagram',
        icon: "mdi-instagram",
        title: 'Instagram',
        url: 'https://www.instagram.com'
      },
      {
        name: 'twitter',
        icon: "mdi-twitter",
        title: 'Twitter',
        url: 'https://twitter.com'
      },
    ],
  }),
}
</script>