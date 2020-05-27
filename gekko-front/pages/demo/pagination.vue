<template>
  <v-content>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-list width="100%">
          <v-list-item v-for="row in displayList" :key="row.index">
            <v-list-item-content>
              <v-list-item-title>{{ row.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-pagination
          v-model="page"
          :length="length"
          @input="pageChange"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-content>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      length: 0,
      list: [],
      displayList: [],
      pageSize: 10
    }
  },
  mounted() {
    this.list = new Array(100).fill().map((v, i) => {
      return { id: i, title: 'Title' + (i + 1) }
    })
    this.length = Math.ceil(this.list.length / this.pageSize)
    this.displayList = this.list.slice(0, this.pageSize)
  },
  methods: {
    pageChange(pageNo) {
      const offset = this.pageSize * (pageNo - 1)
      this.displayList = this.list.slice(offset, offset + this.pageSize)
    }
  }
}
</script>
