<template>
  <v-card>
    <v-card-title class="headline">
      User Create
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
        @click="doCreate"
      >
        submit
      </v-btn>
    </v-form>
  </v-card>
</template>
<script>
/*
 * :append-icon-cb is deprecated
 * https://stackoverflow.com/questions/48015419/how-to-call-a-function-on-append-icon-click-in-vuetify-js
 *-
 * 子コンポーネントから親コンポーネントへのデータ連携
 * https://qiita.com/yama-t/items/b051cd9ea802f69da118
 *
 * 関連チェック
 * https://stackoverflow.com/questions/58130439/vuetify-custom-validation-for-confirm-password
 */
import axios from 'axios'
import { UserModel, UserValidation } from '@@/models/UserModel'
import { Endpoint } from '@@/utils/ApiUtils'
import ErrorUtils from '@@/utils/ErrorUtils'
export default {
  data: () => ({
    valid: false,
    user: UserModel.create(),
    rules: UserValidation.CreateRules,
    hidePassword: true,
    hideConfirmPassword: true,
    loader: null,
    loading: false
  }),
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
    async doCreate() {
      ErrorUtils.clearErrors(this.$store)
      try {
        this.loader = 'loading'
        if (this.$refs.formX.validate()) {
          await axios.post(Endpoint.Users.create(), {
            name: this.user.name,
            email: this.user.email,
            password: this.user.password
          })
          await this.$router.go(-1)
        }
      } catch (err) {
        ErrorUtils.setErrorsByAxiosError(this.$store, err)
      }
    }
  }
}
</script>
