<template>
  <v-row align="center" justify="center" no-gutters class="map-directory">
    <v-col cols="12" md="7" class="d-flex justify-center">
      <!-- The floor plan is a basketball: its seams are the hallways between the four wings -->
      <svg
        class="museum-map"
        viewBox="0 0 520 540"
        role="group"
        aria-label="Interactive museum floor map">
        <defs>
          <pattern id="map-pebble" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#000" fill-opacity="0.14"/>
            <circle cx="5.5" cy="5.5" r="1" fill="#000" fill-opacity="0.14"/>
          </pattern>
          <radialGradient id="map-shade" cx="0.35" cy="0.3" r="0.85">
            <stop offset="0" stop-color="#fff" stop-opacity="0.22"/>
            <stop offset="0.55" stop-color="#fff" stop-opacity="0"/>
            <stop offset="1" stop-color="#000" stop-opacity="0.35"/>
          </radialGradient>
          <filter id="map-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <circle cx="260" cy="250" r="232" fill="#F81B28" fill-opacity="0.12"/>

        <g
          v-for="zone in wings"
          :key="zone.id"
          class="zone"
          :class="zoneClass(zone)"
          tabindex="0"
          role="button"
          :aria-label="zone.name + ': ' + zone.description"
          @mouseenter="active = zone.id"
          @focus="active = zone.id"
          @click="active = zone.id"
          @keydown.enter="visit(zone)">
          <path :d="zone.path" :fill="active === zone.id ? zone.color : zone.base" class="zone-fill"/>
          <path :d="zone.path" fill="url(#map-pebble)"/>
          <text :x="zone.label.x" :y="zone.label.y" class="zone-number">{{ zone.number }}</text>
          <text
            v-for="(line, i) in zone.label.lines"
            :key="i"
            :x="zone.label.x"
            :y="zone.label.y + 30 + i * 26"
            :style="zone.label.size ? { fontSize: zone.label.size + 'px' } : null"
            class="zone-label">{{ line }}</text>
        </g>

        <!-- ball shading, seams (hallways) and outline sit above the wings but ignore the mouse -->
        <g pointer-events="none">
          <circle cx="260" cy="250" r="220" fill="url(#map-shade)"/>
          <g class="seams">
            <circle cx="260" cy="250" r="220"/>
            <path d="M260,30 V470 M40,250 H480"/>
            <path d="M101.6,98.2 Q220.4,250 101.6,401.8"/>
            <path d="M418.4,98.2 Q299.6,250 418.4,401.8"/>
          </g>
          <g class="walkways">
            <path d="M260,30 V470 M40,250 H480"/>
            <path d="M101.6,98.2 Q220.4,250 101.6,401.8"/>
            <path d="M418.4,98.2 Q299.6,250 418.4,401.8"/>
          </g>
        </g>

        <g
          class="zone zone-center"
          :class="zoneClass(center)"
          tabindex="0"
          role="button"
          :aria-label="center.name + ': ' + center.description"
          @mouseenter="active = center.id"
          @focus="active = center.id"
          @click="active = center.id"
          @keydown.enter="visit(center)">
          <circle
            cx="260" cy="250" r="46"
            :fill="active === center.id ? center.color : '#151E27'"
            stroke="#F2B233" stroke-width="5"
            class="zone-fill"/>
          <text x="260" y="246" class="zone-label center-label">CENTER</text>
          <text x="260" y="268" class="zone-label center-label">COURT</text>
        </g>
      </svg>
    </v-col>

    <v-col cols="12" md="5" class="map-info-col">
      <div class="map-info text-left" aria-live="polite">
        <template v-if="activeZone">
          <p class="title-text text-5 map-info-number">ZONE {{ activeZone.number }}</p>
          <h3 class="title-text text-7 redText">{{ activeZone.name }}</h3>
          <p class="white--text text-6">{{ activeZone.description }}</p>
          <ul class="white--text text-8 mb-4">
            <li v-for="item in activeZone.highlights" :key="item">{{ item }}</li>
          </ul>
          <v-btn text class="btn title-text text-2" @click="visit(activeZone)"> VISIT </v-btn>
        </template>
        <template v-else>
          <h3 class="title-text text-7 redText">Explore the museum</h3>
          <p class="white--text text-6">
            Hover over or tap a zone on the map to see what's inside. The hallways follow the seams of a basketball, and every wing starts at Center Court.
          </p>
        </template>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      active: null,
      wings: [
        {
          id: 'exhibit',
          number: '01',
          name: 'Exhibit Hall',
          description: 'Digitized exhibit pieces that capture decades of Pinoy hoops fandom, from barangay courts to packed arenas.',
          highlights: ['The Pinoy Fandom photo gallery', 'Kultura artist collaborations', 'Hold artifacts up close in A.R.'],
          target: '#fandom-gallery',
          path: 'M260,250 L40,250 A220,220 0 0 1 260,30 Z',
          base: '#E8742A',
          color: '#00428C',
          label: { x: 196, y: 138, lines: ['EXHIBIT', 'HALL'] },
        },
        {
          id: 'collectors',
          number: '02',
          name: "Collectors' Room",
          description: "Rare memorabilia from some of the country's most devoted fan collectors.",
          highlights: ['Signed jerseys and game balls', 'Game-worn sneakers', 'A piece of a retired arena floor'],
          target: '#collectors',
          path: 'M260,250 L260,30 A220,220 0 0 1 480,250 Z',
          base: '#DE6B24',
          color: '#F81B28',
          label: { x: 320, y: 138, lines: ['COLLECTORS’', 'ROOM'], size: 22 },
        },
        {
          id: 'meta',
          number: '03',
          name: 'Meta Zone',
          description: 'Create your avatar, suit up in your team\'s jersey, and hang out with fellow museum-goers.',
          highlights: ['Avatar creator', 'Fan meet-ups', 'Explore freely in 3D'],
          target: '#meta-zone',
          path: 'M260,250 L260,470 A220,220 0 0 1 40,250 Z',
          base: '#DE6B24',
          color: '#1E7F86',
          label: { x: 196, y: 318, lines: ['META', 'ZONE'] },
        },
        {
          id: 'theater',
          number: '04',
          name: '360 Theater',
          description: 'Step courtside with immersive 360° content. No seat is better than this one.',
          highlights: ['360° virtual tour', 'Behind-the-scenes footage', 'Watch together with other fans'],
          target: '#museum-360',
          path: 'M260,250 L480,250 A220,220 0 0 1 260,470 Z',
          base: '#E8742A',
          color: '#5B2A86',
          label: { x: 324, y: 318, lines: ['360', 'THEATER'] },
        },
      ],
      center: {
        id: 'center',
        number: '00',
        name: 'Center Court',
        description: 'The heart of the museum, where every hallway meets. The Championship Trophy stands here.',
        highlights: ['The Championship Trophy', 'View it in A.R.', 'Starting point of every tour'],
        target: '#trophy',
        color: '#B7791F',
      },
    }),
    computed: {
      activeZone () {
        return [...this.wings, this.center].find(zone => zone.id === this.active) || null
      },
    },
    methods: {
      zoneClass (zone) {
        return { active: this.active === zone.id, dimmed: this.active && this.active !== zone.id }
      },
      visit (zone) {
        this.$vuetify.goTo(zone.target)
      },
    },
  }
</script>

<style scoped>
.map-directory {
  padding: 3% 0;
}
.museum-map {
  width: 100%;
  max-width: 520px;
  height: auto;
  overflow: visible;
}
.zone {
  cursor: pointer;
  outline: none;
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.zone-fill {
  transition: fill 0.25s ease;
}
.zone.active {
  transform: scale(1.04);
  filter: url(#map-glow);
}
.zone.dimmed {
  opacity: 0.55;
}
.zone:focus-visible .zone-fill {
  stroke: #fff;
  stroke-width: 4;
}
.zone-number {
  font-family: "Bebas Neue", sans-serif;
  font-size: 22px;
  fill: #fff;
  fill-opacity: 0.75;
  text-anchor: middle;
}
.zone-label {
  font-family: "Bebas Neue", sans-serif;
  font-size: 28px;
  letter-spacing: 1px;
  fill: #fff;
  text-anchor: middle;
  paint-order: stroke;
  stroke: #3a1a05;
  stroke-width: 4px;
  stroke-linejoin: round;
}
.center-label {
  font-size: 20px;
  stroke: none;
}
.seams {
  fill: none;
  stroke: #1a1206;
  stroke-width: 12;
  stroke-linecap: round;
}
.walkways {
  fill: none;
  stroke: #F2B233;
  stroke-width: 2;
  stroke-dasharray: 2 10;
  stroke-linecap: round;
  opacity: 0.8;
}
.entrance {
  fill: none;
  stroke: #fff;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.entrance text {
  font-family: "Bebas Neue", sans-serif;
  font-size: 20px;
  letter-spacing: 2px;
  fill: #fff;
  stroke: none;
}
.map-info {
  border-left: 3px solid #F81B28;
  padding: 8px 0 8px 24px;
  min-height: 260px;
}
.map-info-number {
  color: #F2B233;
  margin-bottom: 0;
}
.map-info ul {
  padding-left: 18px;
}
@media screen and (max-width: 959px) {
  .map-info-col {
    padding: 24px 16px 0;
  }
  .map-info {
    min-height: 0;
  }
}
</style>
