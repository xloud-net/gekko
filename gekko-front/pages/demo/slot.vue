<template
  ><v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <MyMessageBox>
        <template #title>
          Slot Example
        </template>
        <template #contents>
          This message is injecting from page to component.
        </template>
      </MyMessageBox>
    </v-flex>
  </v-layout>
</template>
<script>
import MessageBox from '@@/components/MessageBox.vue'
export default {
  components: {
    MyMessageBox: MessageBox
  }
}
</script>
