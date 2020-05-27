<template>
  <v-card>
    <v-card-title class="headline">
      User Detail
    </v-card-title>
    <v-divider />
    <v-card-text>Id: {{ user.id }}</v-card-text>
    <v-card-text>Name: {{ user.name }}</v-card-text>
    <v-card-text>E-Mail: {{ user.email }}</v-card-text>
    <v-divider />
    <v-container>
      <v-row>
        <v-col class="text-center">
          <v-btn
            color="blue-grey"
            dark
            small
            fab
            @click="showDeleteDialg = true"
          >
            <v-icon>mdi-delete-forever</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <v-btn color="green" dark small fab @click="goEditPage">
            <v-icon>mdi-lead-pencil</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <v-btn color="blue" dark small right fab @click="returnPage">
            <v-icon>mdi-keyboard-return</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="showDeleteDialg" max-width="500px">
      <v-card>
        <v-card-title>
          <span>Do you delete really?</span>
        </v-card-title>
        <v-card-actions class="text-right">
          <v-container>
            <v-row>
              <v-col class="text-center">
                <v-btn outlined color="orange" @click="doDelete">Ok</v-btn>
              </v-col>
              <v-col class="text-center">
                <v-btn
                  outlined
                  color="orange"
                  right
                  @click="showDeleteDialg = false"
                  >Cancel</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ErrorUtils from '@@/utils/ErrorUtils'
import { Endpoint } from '@@/utils/ApiUtils'
export default {
  /**
   * API: コンテキスト
   * https://ja.nuxtjs.org/api/context/
   */
  async fetch({ store, route, app, error, redirect, params }) {
    try {
      await store.dispatch('users/fetchUser', params.id)
    } catch (err) {
      ErrorUtils.setErrorsByAxiosError(store, err)
      if (err && err.response) {
        if (err.response.status >= 500) {
          error({
            statusCode: err.response.status
          })
        } else if (err.response.status === 400) {
          redirect('/users')
          return
        }
      }
      error({
        statusCode: err.response.status
      })
    }
  },
  data() {
    return {
      showDeleteDialg: false
    }
  },
  computed: {
    ...mapState('users', ['user'])
  },
  methods: {
    async returnPage(row) {
      await this.$router.go(-1)
    },
    async doDelete() {
      this.showDeleteDialg = false
      await axios.delete(Endpoint.delete(this.user.id))
      await this.$router.go(-1)
    },
    async goEditPage() {
      await this.$router.push({
        name: 'users-id-edit',
        params: { id: this.user.id }
      })
    }
  }
}
</script>
