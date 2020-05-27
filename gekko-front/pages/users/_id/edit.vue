<template>
  <v-card>
    <v-card-title class="headline">
      User Edit
    </v-card-title>
    <v-divider />
    <v-form ref="formX" v-model="valid">
      <v-text-field
        v-model="user.name"
        :rules="rules.name"
        :counter="32"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.email"
        :rules="rules.email"
        :counter="256"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        :rules="rules.password"
        :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="hidePassword ? 'password' : 'text'"
        min="8"
        :counter="32"
        label="Password"
        required
        @click:append="hidePassword = !hidePassword"
      ></v-text-field>
      <v-text-field
        v-model="user.confirmPassword"
        :rules="
          rules.confirmPassword.concat(
            user.password === user.confirmPassword || 'Password must be match'
          )
        "
        :append-icon="hideConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="hideConfirmPassword ? 'password' : 'text'"
        min="8"
        :counter="32"
        label="Password (Confirm)"
        required
        @click:append="hideConfirmPassword = !hideConfirmPassword"
      ></v-text-field>
      <v-divider />
      <v-btn
        :disabled="!valid || loading"
        color="primary"
        :loading="loading"
        @click="doUpdate"
      >
        submit
      </v-btn>
    </v-form>
  </v-card>
</template>
<script>
import axios from 'axios'
// import { mapState } from 'vuex'
import { UserModel, UserValidation } from '@@/models/UserModel'
import { Endpoint } from '@@/utils/ApiUtils'
import ErrorUtils from '@@/utils/ErrorUtils'
export default {
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
      valid: false,
      user: UserModel.create(this.$store.getters['users/getUser']),
      rules: UserValidation.EditRules,
      hidePassword: true,
      hideConfirmPassword: true,
      loader: null,
      loading: false
    }
  },
  computed: {
    /*
     * Storeの値を直接変更してしまうのか下記のエラーが発生した為、
     * Storeのオブジェクトを直接利用しないように変更
     * client.js?06a0:84 Error: [vuex] do not mutate vuex store state outside mutation handlers.
     */
    // ...mapState('users', ['user'])
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  destroyed() {
    ErrorUtils.clearErrors(this.$store)
  },
  methods: {
    async doUpdate() {
      try {
        this.loader = 'loading'
        if (this.$refs.formX.validate()) {
          const param = {
            name: this.user.name,
            email: this.user.email
          }
          if (this.user.password.length > 0) {
            param.password = this.user.password
          }
          await axios.patch(Endpoint.Users.edit(this.user.id), param)
          await this.$router.go(-1)
        }
      } catch (err) {
        ErrorUtils.setErrorsByAxiosError(this.$store, err)
      }
    }
  }
}
</script>
