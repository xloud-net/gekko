<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Name</th>
            <th class="text-left">Name</th>
            <th class="text-left">E-Mail</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in list" :key="row.index">
            <td class="text-center">{{ row.id }}</td>
            <td class="text-left">{{ row.name }}</td>
            <td class="text-left">{{ row.email }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-pagination
      v-model="page"
      :length="length"
      @input="pageChange"
    ></v-pagination>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  async fetch({ store, route, app, error, redirect, params }) {
    await store.dispatch('pagination/fetchData', {
      offset: 0,
      limit: 5
    })
  },
  data() {
    return {
      page: 1,
      offset: 0,
      pageSize: 5
    }
  },
  computed: {
    ...mapState('pagination', ['total', 'list']),
    length() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    ...mapActions('pagination', ['fetchData']),
    async pageChange(pageNo) {
      this.offset = this.pageSize * (pageNo - 1)
      await this.fetchData({ offset: this.offset, limit: this.pageSize })
    }
  }
}
</script>
