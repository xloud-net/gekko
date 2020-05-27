<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card height="200px">
        <v-card-title class="blue white--text">
          <span class="headline">Menu</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-list color="white">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-btn color="primary" block @click="$router.push(item.path)">
              {{ item.title }}
            </v-btn>
          </v-list-item>
        </v-list>
        <v-card-text> </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Bind', path: '/demo/bind' },
      { title: 'Store', path: '/demo/store' },
      { title: 'Life Cycle', path: '/demo/lifecycle' },
      { title: 'Slot', path: '/demo/slot' },
      { title: 'Carousels', path: '/demo/carousels' },
      { title: 'Pagination', path: '/demo/pagination' },
      { title: 'Pagination With API', path: '/demo/paginationapi' },
      {
        title: 'Pagination With API And Store',
        path: '/demo/paginationapistore'
      }
    ]
  }),
  methods: {
    goto(path) {
      this.$router.push(path)
    }
  }
}
</script>
