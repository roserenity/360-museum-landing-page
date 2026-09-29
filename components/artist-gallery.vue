<template>
        <v-row no-gutters class="mt-6">
            <v-col
                v-for="artist in artists"
                :key="artist.name"
                class="d-flex child-flex"
                lg="3"
                md="3"
                sm="6"
            >
            <v-card
                color="transparent"
                elevation="0">
                <v-img
                    eager
                    :src="artist.src"
                    :alt="artist.alt"
                    contain
                    class="mx-auto"
                    height="200px"
                />
                <v-card-title class="title-text white--text justify-center">
                    <span class="text-4 mb-2">{{ artist.name }}</span>
                </v-card-title>
                <v-card-subtitle class="white--text justify-center">
                    <span class="text-8">{{ artist.description }}</span>
                </v-card-subtitle>
            </v-card>
        </v-col>
    </v-row>
</template>

<style>
</style>

<script>
// Fictional artists for the portfolio version of this project. The photos show art supplies,
// not the artists or their work, so no real person is presented as one of them.
export default {
    data: () => ({
      artists: [
        { name: 'Rina Villareal',
            description: 'Rina is a graphic designer and illustrator whose bold, jersey-inspired prints mix streetball energy with Filipino folk patterns.',
            alt: 'Jars of well-used paint brushes',
            src: require("~/assets/artists-imgs/artist-1.jpg")},
        { name: 'Jomar Castañeda',
            description: 'Jomar is a visual artist whose work explores time, culture and community, told through the neighborhood courts he grew up on.',
            alt: 'A cluttered artist studio table',
            src: require("~/assets/artists-imgs/artist-2.jpg")},
        { name: 'Bea Lacsamana',
            description: 'Bea is a designer and muralist whose colorful, geometric style has brightened barangay courts across Metro Manila.',
            alt: 'Paint box and palette',
            src: require("~/assets/artists-imgs/artist-3.jpg")},
        { name: 'Nico Almazan',
            description: 'Nico is an illustrator based in Cebu whose playful character art celebrates the everyday rituals of Pinoy basketball fans.',
            alt: 'Tubes of paint in a wooden case',
            src: require("~/assets/artists-imgs/artist-4.jpg") },
      ]
    })
}
</script>
