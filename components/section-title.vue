<template>
    <section>
        <section :style="titleColor">
            <h1 class="title-text text-1">{{ titleText }}</h1>
        </section>
        <section :style="subtextColor" v-if="subText" class="text-6">
            {{ subText }}
        </section>
    </section>
</template>
<script>
export default {
    props: ['titleText', 'subText', 'titleTextColor', 'subTextColor'],
    computed: {
        titleColor() {
            return this.titleTextColor;
        },
        subtextColor(){
            return this.subTextColor
        }
    }
}
</script>
<style scoped>
h1 {
  line-height: 50px;
}
section {
    background-color: var(bg-color)
}
</style>