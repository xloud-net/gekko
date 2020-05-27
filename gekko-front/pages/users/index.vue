<template>
  <v-card>
    <v-card-title class="headline">
      User List
    </v-card-title>
    <v-divider />
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="5"
      class="elevation-1"
      @click:row="goDetailPage"
    />
    <v-card-text style="height: 100px; position: relative">
      <v-fab-transition>
        <v-btn
          color="pink"
          dark
          small
          absolute
          top
          left
          fab
          @click="goCreatePage"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
  </v-card>
</template>
<script>
import axios from 'axios'
import ErrorUtils from '@@/utils/ErrorUtils'
import { Endpoint } from '@@/utils/ApiUtils'
export default {
  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        { text: 'Name', value: 'name' },
        { text: 'E-Mail', value: 'email' },
        { text: 'Created Date', value: 'createdAt' },
        { text: 'Updated Date', value: 'updatedAt' }
      ],
      users: []
    }
  },
  mounted() {
    axios.get(Endpoint.Users.list()).then((response) => {
      this.users = response.data.users
    })
  },
  methods: {
    async goDetailPage(row) {
      ErrorUtils.clearErrors(this.$store)
      await this.$router.push({ name: 'users-id', params: { id: row.id } })
    },
    async goCreatePage() {
      ErrorUtils.clearErrors(this.$store)
      await this.$router.push({ name: 'users-new' })
    }
  }
}
</script>
