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
          <tr v-for="row in displayList" :key="row.index">
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
import axios from 'axios'
import { Endpoint } from '@@/utils/ApiUtils'
export default {
  data() {
    return {
      page: 1,
      length: 0,
      displayList: [],
      offset: 0,
      pageSize: 5
    }
  },
  mounted() {
    axios
      .get(Endpoint.Users.list(), {
        params: {
          limit: this.pageSize,
          offset: this.offset
        }
      })
      .then((response) => {
        this.displayList = response.data.users
        this.length = Math.ceil(response.data.total / this.pageSize)
      })
  },
  methods: {
    pageChange(pageNo) {
      this.offset = this.pageSize * (pageNo - 1)
      axios
        .get(Endpoint.Users.list(), {
          params: {
            limit: this.pageSize,
            offset: this.offset
          }
        })
        .then((response) => {
          this.displayList = response.data.users
          this.length = Math.ceil(response.data.total / this.pageSize)
        })
    }
  }
}
</script>
