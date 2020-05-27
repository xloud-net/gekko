/* eslint-disable no-console */
import Vue from 'vue'

if (process.server) {
  console.log('SSR in plugin')
} else {
  console.log('CSR in plugin')
}
// Call such as "this.$echo()" in script or template
Vue.prototype.$echo = () => {
  console.log('Hello,World!')
}
