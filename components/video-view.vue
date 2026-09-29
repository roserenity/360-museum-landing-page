<template>
    <section id="museum-video" class="museum-video d-flex justify-center align-center padding-tb">
        <video
          v-if="video"
          ref="video"
          :src="video"
          :poster="thumbnail"
          controls
          muted
          class="video-view"
          type="video/mp4"
          title="Museum tour video">
        </video>
        <img
          v-else
          :src="thumbnail"
          class="video-view"
          alt="Preview of the 360° virtual tour: a domed arena interior">
    </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  mounted(){
    const videoElem = this.$refs.video
    if (!videoElem) return
    const playVideo = () => {
      if (ScrollTrigger.isInViewport(videoElem, 1)) {
        // play() rejects if the browser blocks autoplay; the controls still work
        videoElem.play().catch(() => {})
      }
    }
    this.trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: playVideo
    });
    playVideo()
  },
  beforeDestroy(){
    if (this.trigger) this.trigger.kill()
  },
  data: () => ({
    // The original tour video was client-owned. Drop a licensed clip into
    // assets/museum/ and require it here to bring the autoplaying video back.
    video: null,
    thumbnail: require("~/assets/museum/thumbnail.jpg"),
  })
}
</script>

<style>
.video-view {
  width: 100%;
  height: auto;
}
</style>
