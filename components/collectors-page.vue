<template>
    <v-row no-gutters class="px-9">
        <v-col
            v-for="collector in collectors"
            :key="collector.name"
            class="d-flex child-flex justify-center padding-lr pa-8"
            lg="4"
            md="4"
            sm="4">
            <v-card
                color="#f81b28"
                class="bg-red collector_card justify-space-between"
                tile
                align="center">
                <v-img
                    eager
                    :src="collector.src"
                    :lazy-src="collector.src"
                    :alt="collector.coverAlt"
                    width="100%"
                    contain
                />
                <v-card-title class="white--text justify-center flex-column px-2">
                    <span class="title-text text-4">{{ collector.name }}</span>
                    <span class="text-8 mb-2">@{{ collector.insta }}</span>
                </v-card-title>
                <v-card-subtitle class="white--text justify-center px-2 text-8">
                    <span class="text-8">{{ collector.description }}</span>
                </v-card-subtitle>
                <v-card-actions class="align-end">
                    <v-btn text class="btn title-text mx-auto mb-2 text-8" width="auto" :id="collector.name" @click="view_collection(collector.id)"> VIEW COLLECTION </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <div>
            <v-dialog
                v-model="dialog"
                class="custom-bg-1"
                width="400"
            >
                <v-card class="custom-bg-1 collectors-dialog">
                    <v-toolbar color="transparent" flat>
                        <v-spacer></v-spacer>
                        <v-icon
                            role="img"
                            aria-hidden="false"
                            color="white"
                            @click="dialog = false"
                            fab
                            class="float-end"
                        >
                            mdi-close
                        </v-icon>
                    </v-toolbar>
                    <v-container class="d-flex flex-column justify-center align-center">
                        <h1 class="title-text text-1 text-center">
                            <span class="redText">{{ collectors[collection_id_view].name }}</span><span class="white--text">'S<br>COLLECTION</span>
                        </h1>
                        <v-img 
                            small
                            :src="arrow"
                            alt="arrow pointing to collection"
                            class="arrow-img" />
                        <v-carousel
                            hide-delimiters
                            hide-delimiter-background
                            cycle
                            justify="center"
                            align="center"
                            height="100%">
                            <v-carousel-item
                                v-for="(collection, i) in collectionList[collection_id_view].photos" 
                                :key="i"
                                >
                                <v-img
                                    :src="collection.src"
                                    :lazy-src="collection.src"
                                    :alt="collection.title"
                                    width="190"
                                    height="190"
                                    class="mx-auto mb-6"/>
                                <p class="title-text redText justify-center text-7">
                                    {{ collection.title }}
                                </p>
                                <p class="white--text text-8 justify-center">
                                    {{ collection.subtext }}
                                </p>
                            </v-carousel-item>
                        </v-carousel>
                    </v-container>
                    <v-spacer></v-spacer>
                </v-card>
            </v-dialog>
        </div>
    </v-row>
</template>

<style scoped>
h1 {
    text-transform: uppercase;  
    line-height: 50px;
}
.collection-title {
    line-height: 30px;
}

.collectors-dialog {
    height: 75vh;
}

.v-responsive__content {
    justify-content: space-evenly;
    display: flex;
    flex-direction: column;
}
</style>

<style>
.arrow-img {
    position: absolute;
    z-index: 2;
    width: 45px;
    margin-bottom: 200px;
    margin-left: 300px;
}
@media screen and (max-device-width: 480px) {
    .arrow-img {
        width: 30px;
        margin-left: 65%;
    }
    .collectors-dialog {
        width: 90vw
    }
    .collector_card {
        width: 40vw
    }
}
</style>

<script>
export default {
    data: () => ({
        arrow: require("~/assets/images/arrow.png"),
        // Fictional collectors and items for the portfolio version of this project
        collectors: [
            {   id: '0',
                name: 'Migs Dela Cruz',
                insta: 'migs.hoopvault',
                description: 'Migs has been collecting since his first courtside game at age ten. His collection includes game balls, a championship net piece, and prints of unforgettable shots.',
                coverAlt: 'Basketball resting on an outdoor court',
                src: require("~/assets/collection-imgs/collector-1.jpg")
            },
            {   id: '1',
                name: 'Carla Reyes',
                insta: 'sole.searching.ph',
                description: 'Carla is a sneakerhead who calls her collection Sole Searching. It includes limited releases, pairs worn to unforgettable games, and the very first pair that started it all.',
                coverAlt: 'White sneakers on the grass',
                src: require("~/assets/collection-imgs/collector-2.jpg")
            },
            {
                id: '2',
                name: 'Ben Tolentino',
                insta: 'courtside.archive',
                description: 'Ben is a lifelong fan and amateur historian whose archive ranges from antique leather balls and old team photographs to hardwood from gyms that no longer exist.',
                coverAlt: 'Vintage photograph of a basketball team',
                src: require("~/assets/collection-imgs/collector-3.jpg")
            }
        ],
        collectionList: [
            {
                photos: [
                    {   title: "FIRST COURTSIDE GAME BALL",
                        src: require("~/assets/collection-imgs/collector-1/collection-1.jpg"),
                        subtext: 'Kept exactly as it was, scuffs and all' },
                    {   title: "GAME-WINNER PRINT",
                        src: require("~/assets/collection-imgs/collector-1/collection-2.jpg"),
                        subtext: 'Limited-edition print of a buzzer-beater' },
                    {   title: "PLAYOFF GAME BALL",
                        src: require("~/assets/collection-imgs/collector-1/collection-3.jpg"),
                        subtext: 'Caught in the stands during a playoff run' },
                    {   title: "CHAMPIONSHIP NET PIECE",
                        src: require("~/assets/collection-imgs/collector-1/collection-4.jpg"),
                        subtext: 'Cut down after a title-clinching win' }
                ]
            },
            {
                photos: [
                    {   title: "LIMITED LIGHT-UP COURT SNEAKERS",
                        src: require("~/assets/collection-imgs/collector-2/collection-1.jpg"),
                        subtext: 'One of only a few hundred pairs' },
                    {   title: "THE FIRST PAIR",
                        src: require("~/assets/collection-imgs/collector-2/collection-2.jpg"),
                        subtext: 'The pair that started the collection' },
                    {   title: "SUMMER LEAGUE PAIR",
                        src: require("~/assets/collection-imgs/collector-2/collection-3.jpg"),
                        subtext: 'Worn to every summer league game in 2019' },
                    {   title: "CLASSIC WHITE LOW-TOPS",
                        src: require("~/assets/collection-imgs/collector-2/collection-4.jpg"),
                        subtext: 'A timeless staple of courtside style' }
                ]
            },
            {
                photos: [
                    {   title: "ANTIQUE LEATHER BALLS",
                        src: require("~/assets/collection-imgs/collector-3/collection-1.jpg"),
                        subtext: 'Hand-stitched balls from the early days of the game' },
                    {   title: "RETIRED HARDWOOD FLOOR",
                        src: require("~/assets/collection-imgs/collector-3/collection-2.jpg"),
                        subtext: 'Planks saved from a gym that no longer exists' },
                    {   title: "1940s GAME PHOTOGRAPH",
                        src: require("~/assets/collection-imgs/collector-3/collection-3.jpg"),
                        subtext: 'Original print from a college game' },
                    {   title: "1930s WOMEN’S TEAM PHOTO",
                        src: require("~/assets/collection-imgs/collector-3/collection-4.jpg"),
                        subtext: 'Proof the game has always been for everyone' },
                ]
            }
        ],
        dialog: false,
        collection_id_view: 0
    }),
    methods: {
        view_collection(id){
            this.dialog = true;
            this.collection_id_view = id;
        }
    }
}
</script>