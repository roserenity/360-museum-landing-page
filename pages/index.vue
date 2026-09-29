<template>
	<v-app>
		<hero/>
		<v-main>
			<v-section id="fandom-gallery" class="custom-bg-2 text-center padding-tb">
				<template v-slot:top-content>
					<section-title
						:titleText="header.title"
						:titleTextColor="redText"/>
					<p class="white--text text-6">
						There's nothing like Pinoy's love for hoops. <br/>
						Now, it's finally recognized and immortalized. <br/>
						As it should be.
					</p>
					<!-- <v-btn text class="btn mb-8 title-text text-2"> {{ header.button }} </v-btn> -->
				</template>
				<template v-slot:bottom-content>
					<gallery/>
				</template>
			</v-section>

			<v-section class="custom-bg-2 text-center padding-tb px-3">
				<template v-slot:top-content>
					<section-title 
						:titleText="mapDirectorySection.title"
						:subText="mapDirectorySection.subText"
						:titleTextColor="redText"
						:subTextColor="whiteText"/>
				</template>
				<template v-slot:bottom-content>
					<map-directory />
				</template>
			</v-section>	
			<section class="bg-red" >
				<v-row 
					align="center" 
					justify="center" 
					no-gutters>
					<v-col 
						cols="12" 
						lg="6" 
						sm="12">
						<section-title 
							:titleText="virtualMuseumSection.title"
							:subText="virtualMuseumSection.subText"
							:titleTextColor="whiteText"
							:subTextColor="whiteText"
							class="padding-a"
						 />
					</v-col>
					<v-col 
						cols="12" 
						lg="6" 
						sm="12">
						<v-img 
							:src="virtualMuseumImg" 
							alt="Browsing the museum on a phone and laptop"
							min-height="250px"
							height="100%" 
							width="100%"/>
					</v-col>
				</v-row>
			</section>

			<v-section class="bg-dark-gray text-center padding-tb px-3">
				<template v-slot:top-content>
					<section-title 
						:titleText="kulturaArtistsSection.title"
						:subText="kulturaArtistsSection.subText"
						:titleTextColor="redText"
						:subTextColor="whiteText"/>
					<v-btn text class="btn my-4  title-text" @click="$vuetify.goTo('#kultura-artists')"> {{ kulturaArtistsSection.button }} </v-btn>
				</template>
				<template v-slot:bottom-content>
					<artist-gallery id="kultura-artists"/>
				</template>
			</v-section>

			<v-section id="meta-zone" class="custom-bg-2 padding-a">
				<template v-slot:top-content>
					<section-title
						:titleText="metaZoneSection.title"
						:subText="metaZoneSection.subText"
						:titleTextColor="redText"
						:subTextColor="whiteText"
						class="text-center"/>
				</template>
				<template v-slot:bottom-content>
					<card-stacks/>
				</template>
			</v-section>

			<v-section id="museum-360" class="museum360Section custom-bg-2 text-center padding-a pt-10">
				<template v-slot:top-content>
					<section-title 
						:titleText="museum360Section.title"
						:subText="museum360Section.subText"
						:titleTextColor="redText"
						:subTextColor="whiteText"
						class="text-center"/>
				</template>
				<template v-slot:bottom-content>
					<!-- Hidden until the tour video is back: it only scrolls to the preview image right below -->
					<!-- <v-btn text class="btn my-5 title-text text-2" @click="$vuetify.goTo('#museum-video')"> {{ museum360Section.button }} </v-btn> -->
					<video-view class="pb-10"/>
				</template>
			</v-section>

			<section id="trophy" class="bg-dark-gray padding-lr py-6" >
				<v-row 
					align="center" 
					justify="center" 
					no-gutters>
					<v-col 
						cols="12" 
						lg="6" 
						sm="12">
						<section-title 
							:titleText="trophySection.title"
							:subText="trophySection.subText"
							:titleTextColor="redText"
							:subTextColor="whiteText"
							class="res-center"/>
					</v-col>
					<v-col cols="12" lg="6" sm="12" class="yellow-glow-div">
						<v-img 
							:src="trophyImg"
							alt="Championship trophy"
							class="mx-auto my-6 trophy-photo"
							width="45%"/>
					</v-col>
				</v-row>
			</section>

			<v-section id="collectors" class="custom-bg-2 text-center padding-tb">
				<template v-slot:top-content>
					<section-title
						:titleText="collectorsPageSection.title"
						:titleTextColor="redText"
						class="my-3"/>
				</template>
				<template v-slot:bottom-content>
					<collectors-page/>
				</template>
			</v-section>

			<h-section id="access-pass" class="custom-bg-1 py-6 padding-lr" >
				<template v-slot:left-content>
					<section-title 
						:titleText="accessPassSection.title"
						:subText="accessPassSection.subText"
						:titleTextColor="redText"
						:subTextColor="whiteText"/>
					<!-- Hidden until the museum has real accounts: the icons only link to the generic homepages -->
					<!-- <social-media-accounts/> -->
				</template>
				<template v-slot:right-content>
					<access-pass-form/>
				</template>
			</h-section>

		</v-main>

		<v-btn
			fab
			absolute
			@click="goToTop"
			class="goToTopBtn">
			<v-icon
				role="img"
				aria-hidden="false"
				color="black"
				title="arrow up icon"
			>
				mdi-arrow-up
			</v-icon>
		</v-btn>
		<footerr/>
	</v-app>
</template>
<script>
export default {
	data: () => ({
		redText: {
			'color' : '#F81B28',
		},
		whiteText: {
			'color' : 'white',
		},
		virtualMuseumImg: require("~/assets/images/virtual-museum.jpg"),
		trophyImg: require("~/assets/images/trophy.jpg"),
		header: {
			title: 'The Pinoy Fandom',
			button: 'LOVE FOR THE GAME'
		},
		mapDirectorySection: {
			title: "Map Directory",
			subText: "Immerse yourself in a unique virtual experience! Marvel at the exhibit pieces, all in digitalized form. Hold the artifacts via A.R.! Interact with fellow fans in the Meta Zone."
		},
		virtualMuseumSection: {
			title: "Access anytime, anywhere",
			subText: "The first-ever museum dedicated to Filipino basketball fandom, and it's 100% virtual. For maximum accessibility to every Pinoy fan, anywhere in the world."
		},
		kulturaArtistsSection: {
			title: "Meet the Kultura Artists",
			subText: "Experience a mix between Filipino culture and the game of basketball through the works of different Pinoy artists.",
			button: "VIEW ARTWORKS"
		},
		metaZoneSection: {
			title: "The Meta Zone",
			subText: "Immerse yourself in a unique virtual experience! Visit the Meta Zone and view artifacts using Augmented Reality all while interacting with fellow museum-goers.",
			button: "Explore Museum"
		},
		museum360Section: {
			title: "360 Museum built for the fans",
			subText: "The first-ever museum dedicated to Filipino basketball fandom, and it's 100% virtual. For maximum accessibility to every Pinoy fan, anywhere in the world.",
			button: "Sneak Peek"
		},
		trophySection: {
			title: "The Championship Trophy",
			subText: "Witness decades of championship culture up close. Bring the trophy right in front of you with A.R., and feel the thrill of victory yourself.",
			button: "WITNESS WINNING"
		},
		collectorsPageSection: {
			title: "Collector’s Page",
		},
		accessPassSection: {
			title: "Get your access pass",
			subText: "Be among the first to visit a must-see event for every Pinoy fan!"
		}
	}),
	methods: {
		goToTop() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}
	}
}
</script>
<style scoped>
.goToTopBtn {
	bottom: 4%;
	right: 5%;
}
.yellow-glow-div {
  background-image: radial-gradient(circle at center, rgb(184, 123, 17) 0%, transparent 35%);
  background-image: -o-radial-gradient(circle at center, rgb(184, 123, 17) 0%, transparent 35%);
  background-image: -ms-radial-gradient(circle at center, rgb(184, 123, 17) 0%, transparent 35%);
  background-image: -moz-radial-gradient(circle at center, rgb(184, 123, 17) 0%, transparent 35%);
  background-image: -webkit-radial-gradient(circle at center, rgb(184, 123, 17) 0%, transparent 35%);
}

.trophy-photo {
	border-radius: 16px;
	box-shadow: 0 0 40px rgba(242, 178, 51, 0.45);
}

/* .drop-glow {
	filter: drop-shadow(0 0 1rem rgb(151, 104, 25));
} */
@media screen and (max-device-width: 480px) {
	.h-btns {
		width: 100%;
	}
}
</style>