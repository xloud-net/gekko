<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Gekko Project.
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/about">
            Go
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>
