<template>
	<v-carousel
		delimiter-icon="minus"
		hide-delimiters
		hide-delimiter-background
		height="auto"
		:continuous="false">
		<v-carousel-item
			v-for="(galleryGroup,i) in galleryList"
			:key="i">
			<v-sheet
				justify="center"
				fluid
				color="transparent"
				class="px-16 mx-lg-16"
			>
				<v-row justify="center"  >
					<v-col cols="6" lg="4" md="4" sm="4"
						v-for="(item,j) in galleryGroup.imgset"
						:key="j">
						<v-img
							:src="item.src"
							:alt="item.text"
							class="item"
							aspect-ratio="1"
							cover />
					</v-col>
				</v-row>
			</v-sheet>
		</v-carousel-item>
	</v-carousel>
</template>

<script>
export default {
	data: () => ({
		model: 0,
		galleryList: [
			{
				imgset: [
					{ text: "Hoop and backboard against a blue sky",
						src: require("~/assets/gallery-imgs/img-1.png") },
					{ text: "Outdoor court with a yellow backboard",
						src: require("~/assets/gallery-imgs/img-2.png") },
					{ text: "Fans making heart hands at a show",
						src: require("~/assets/gallery-imgs/img-3.png") },
					{ text: "Hoop against an orange wall",
						src: require("~/assets/gallery-imgs/img-4.png") },
					{ text: "On the court",
						src: require("~/assets/gallery-imgs/img-5.png") },
					{ text: "Friends playing a pickup game",
						src: require("~/assets/gallery-imgs/img-6.png") }
				]
			},
			{
				imgset: [
					{ text: "Kulturang Pinoy",
						src: require("~/assets/gallery-imgs/img-7.png") },
					{ text: "Hoop on a green wooden backboard",
						src: require("~/assets/gallery-imgs/img-8.png") },
					{ text: "Empty indoor court",
						src: require("~/assets/gallery-imgs/img-9.png") },
					{ text: "Fan filming the show on a phone",
						src: require("~/assets/gallery-imgs/img-10.png") },
					{ text: "Net hanging from the rim",
						src: require("~/assets/gallery-imgs/img-11.png") },
					{ text: "Players battling for the ball",
						src: require("~/assets/gallery-imgs/img-12.png") }
				]
			},
			{
				imgset: [
					{ text: "Looking up through the rim",
						src: require("~/assets/gallery-imgs/img-13.png") },
					{ text: "Hoop on a sunny day",
						src: require("~/assets/gallery-imgs/img-14.png") },
					{ text: "Colorful neighborhood court",
						src: require("~/assets/gallery-imgs/img-15.png") },
					{ text: "Ball tossed up in a dark arena",
						src: require("~/assets/gallery-imgs/img-16.png") },
					{ text: "Chain net close-up",
						src: require("~/assets/gallery-imgs/img-17.png") },
					{ text: "In the zone",
						src: require("~/assets/gallery-imgs/img-18.png") }
				]
			},
			{
				imgset: [
					{ text: "Hoop under the lights at night",
						src: require("~/assets/gallery-imgs/img-19.png") },
					{ text: "Chain net at sunset",
						src: require("~/assets/gallery-imgs/img-20.png") },
					{ text: "Elevate your game",
						src: require("~/assets/gallery-imgs/img-21.png") },
					{ text: "Indoor gym court",
						src: require("~/assets/gallery-imgs/img-22.png") },
					{ text: "Fans with hands in the air",
						src: require("~/assets/gallery-imgs/img-23.png") },
					{ text: "Ball flying toward the hoop",
						src: require("~/assets/gallery-imgs/img-24.png") }
				]
			},
		],
	}),
}
</script>

<style>
.item {
	width: 95%;
	border-radius: 18px;
}
.v-window__next {
	right: 0%;
}
</style>
