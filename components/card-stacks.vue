<template>
    <section class="card-stack">
        <v-row justify="center" no-gutters>
            <v-col cols="12" lg="6" md="6" sm="12" class="d-flex align-center justify-center">
                <v-card
                    height="350px"
                    width="280px" 
                    color="transparent">
                        <v-card
                        class="stack"
                        v-for="item in cardStackItems" 
                        :key="item.index"
                        :zIndex="item.index"
                        :class="'z-'+item.index"
                        height="200px"
                        color="transparent">
                            <v-img
                                eager
                                :src="item.src"
                                :alt="item.title+' card'"
                                contain
                            />
                        </v-card>
                        <v-slider
                            title="readonly slider"
                            :min=sliderValue.min
                            :max=sliderValue.max
                            track-color="red"
                            thumb-color="red"
                            color="white"
                            v-model="sliderValue.value"
                            vertical
                            readonly
                            class="stack"
                        />
                </v-card>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="12" class="d-flex align-center justify-center">
                <v-card
                    height="340px" 
                    width="280px"
                    color="transparent"
                    class="d-flex align-center justify-center">
                        <v-card
                            class="stack card-stack"
                            v-for="item in cardStackItems" 
                            :key="'text'+item.index"
                            :class="'text'+item.index"
                            color="transparent"
                            outlined>
                            <v-card-title class="white--text mb-2 ">
                                <span class="text-5 card-stack-title pl-2">{{ item.title }}</span>
                            </v-card-title>
                            <v-card-text class="white--text mt-1">
                                <span class="text-8">{{ item.description }}</span>
                            </v-card-text>
                            <v-card-actions class="mx-sm-auto">
                                <!-- Hidden until the tour video is back: it only scrolls to the 360 preview image -->
                                <!-- <v-btn text justify="center" class="btn mt-3 title-text text-2" @click="$vuetify.goTo('#museum-video')"> EXPLORE MUSEUM </v-btn> -->
                            </v-card-actions>
                        </v-card>
                </v-card>
            </v-col>
        </v-row>
    </section>
</template>
<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
    mounted(){
        // gsap.context scopes the class selectors below to this component and lets us revert everything on destroy
        this.ctx = gsap.context(() => {
        const tl = gsap.timeline({
        scrollTrigger: {
            trigger: this.$el,
            start: "top bottom",
            end: "+=100px",
        },
        repeat:-1
        });

        tl.to(".z-3", {delay: 2, rotation: -20, x: -100, opacity: 0, })
            .to([".text3", ".text1"], {opacity: 0}, "<")
            .to(".text2", {opacity: 1}, "<")
            .to(this.sliderValue, { value: 2 }, "<")
            .addLabel("slide-2", ">")
            .set(".z-3", { opacity: 1, zIndex: 0, top: 35, left: 20, width: 160, duration: 0.8, rotation: 0, x: 0})
            .to(".z-2", { zIndex: 2, top: 80, left: 0, width: 200, duration: 0.8}, "<")
            .to(".z-1", { zIndex: 1, top: 55, left: 10, width: 180, duration: 0.8}, "<")

            .to(".z-2", {delay: 2, rotation: -20, x: -100, opacity: 0, })
            .to([".text3", ".text2"], {opacity: 0}, "<")
            .to(".text1", {opacity: 1}, "<")
            .to(this.sliderValue, { value: 1 }, "<")
            .addLabel("slide-1", ">")
            .set(".z-2", { opacity: 1, zIndex: 0, top: 35, left: 20, width: 160, duration: 0.8, rotation: 0, x: 0})
            .to(".z-1", { zIndex: 2, top: 80, left: 0, width: 200, duration: 0.8}, "<")
            .to(".z-3", { zIndex: 1, top: 55, left: 10, width: 180, duration: 0.8}, "<")

            .to(".z-1", {delay: 2, rotation: -20, x: -100, opacity: 0, })
            .to([".text2", ".text1"], {opacity: 0}, "<")
            .to(".text3", {opacity: 1}, "<")
            .to(this.sliderValue, { value: 3 }, "<")
            .addLabel("slide-3", ">")
            .set(".z-1", { opacity: 1, zIndex: 0, top: 35, left: 20, width: 160, duration: 0.8, rotation: 0, x: 0})
            .to(".z-3", { zIndex: 2, top: 80, left: 0, width: 200, duration: 0.8}, "<")
            .to(".z-2", { zIndex: 1, top: 55, left: 10, width: 180, duration: 0.8}, "<")
        }, this.$el);

        /**
         * slider control for cards
         * 
            document.querySelector(".v-slider").onclick = () => {
                tl.pause();
                tl.seek("slide-"+this.sliderValue.value)
            }
        */
    },
    beforeDestroy(){
        this.ctx.revert();
    },
    data: () => ({
        sliderValue: {
            min: 1,
            max: 3,
            value: 3,
        },
        cardStackItems: [
            {
                index: '3',
                src: require("~/assets/stack-imgs/card-1.png"),
                title: "Create your avatar",
                description: "Express your fandom by dressing your avatar in your favorite team's jersey."
             },
            {
                index: '2',
                src: require("~/assets/stack-imgs/card-2.png"),
                title: "Move and interact freely",
                description: "Experience the exclusive 360 content, as if you were at the museum yourself! No seat is better than courtside at the first limited-access basketball fandom museum."
            },
            {
                index: '1',
                src: require("~/assets/stack-imgs/card-3.png"),
                title: "Spectacular visuals",
                description: "A museum experience that showcases the impact of basketball fans around the world through a virtual museum."
            },
        ],
    }),
}

</script>
<style>
.card-stack-title {
    border-left: 3px solid red;
    word-break: normal;
}
.stack {
    position: absolute;
}
.v-slider {
    left: 220px;
    top: 80px;
}
.z-3 {
    width: 200px;
    z-index: 2;
    left: 0px;
    top: 80px;
}
.z-2 {
    width: 180px;
    z-index: 1;
    left: 10px;
    top: 55px;
}
.z-1 {
    width: 160px;
    left: 20px;
    top: 35px;
}
.text3 {
    z-index: 2;
}
.text2, .text1 {
    opacity: 0;
}

</style>