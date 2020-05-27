<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-carousel
          cycle
          height="300"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="slide.color" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="">{{ slide.title }} Slide({{ i + 1 }})</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-carousel height="300">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            :href="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      slides: [
        { title: 'First', color: 'indigo' },
        { title: 'Second', color: 'warning' },
        { title: 'Third', color: 'pink darken-2' },
        { title: 'Fourth', color: 'red lighten-1' },
        { title: 'Fifth', color: 'deep-purple accent-4' }
      ],
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  }
}
</script>
