<template>
  <v-card>
    <v-card-title class="headline">{{ $store.state.demo.title }}</v-card-title>
    <v-card-subtitle>{{ message }}</v-card-subtitle>
    <v-divider />
    <v-card-text>
      Count 1 uses the store directly. Count 2 uses the store with helpers
    </v-card-text>
    <v-card-text>{{ count1 }}</v-card-text>
    <v-card-text>{{ count1Edited }}</v-card-text>
    <v-divider />
    <v-card-text>{{ count2 }}</v-card-text>
    <v-card-text>{{ getCount2 }}</v-card-text>
    <v-divider />
    <v-card-actions>
      <v-row>
        <v-col cols="6" sm="3">
          <v-btn color="primary" small width="100%" @click="countup1"
            >Count Up(1)</v-btn
          >
        </v-col>
        <v-col cols="6" sm="3">
          <v-btn color="primary" small width="100%" @click="clear1"
            >Clear(1)</v-btn
          >
        </v-col>
        <v-col cols="6" sm="3">
          <v-btn color="primary" small width="100%" @click="countup2"
            >Count Up(2)</v-btn
          >
        </v-col>
        <v-col cols="6" sm="3">
          <v-btn color="primary" small width="100%" @click="setCount2(0)"
            >Clear(2)</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('demo', ['message', 'count2']),
    ...mapGetters('demo', ['getCount2']),
    count1() {
      return this.$store.state.demo.count1
    },
    count1Edited() {
      return this.$store.getters['demo/getCount1']
    }
  },
  methods: {
    countup1() {
      this.$store.dispatch('demo/countup1')
    },
    ...mapActions('demo', ['countup2']),
    clear1() {
      this.$store.commit('demo/setCount1', 0)
    },
    ...mapMutations('demo', ['setCount2'])
  }
}
</script>
