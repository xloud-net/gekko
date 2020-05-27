<template>
  <div>
    <p>{{ hello }}</p>
    <p>{{ dt }}</p>
    <p>{{ user.id }}</p>
    <p>{{ user.name }}</p>
    <p v-show="isShow" :class="['primary', { error: hasError }]">
      This is xxx.
    </p>
    <v-btn @click="isShow = !isShow">{{ isShow ? 'Hide' : 'Show' }}</v-btn>
    <v-btn @click="hasError = !hasError">{{
      hasError ? 'Normal' : 'Error'
    }}</v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasError: false,
      isShow: true
    }
  },
  computed: {
    hello() {
      return 'Hello,World!'
    },
    user() {
      return {
        id: 1,
        name: 'Jack'
      }
    },
    dt() {
      return new Date()
    }
  }
}
</script>
