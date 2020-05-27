<template>
  <v-card>
    <v-card-title>Check await console.log.</v-card-title>
    <v-card-subtitle>SSR</v-card-subtitle>
    <v-card-text>
      <ul>
        <li>SSR in plugin</li>
        <li>SSR in middleware</li>
        <li>SSR in validate | data:undefined, computed:undefined</li>
        <li>SSR in asyncData | data:-, computed:-</li>
        <li>SSR in fetch | data:undefined, computed:undefined</li>
        <li>SSR in beforeCreate | data:undefined, computed:OK</li>
        <li>SSR in data | data:undefined, computed:OK</li>
        <li>SSR in created | data:undefined, computed:OK</li>
        <li>CSR in beforeCreate | data:undefined, computed:undefined</li>
        <li>CSR in data | data:undefined, computed:undefined</li>
        <li>CSR in created | data:undefined, computed:OK</li>
        <li>CSR in head | data:undefined, computed:OK</li>
        <li>CSR in beforeMount | data:undefined, computed:OK</li>
        <li>CSR in mounted | data:undefined, computed:OK</li>
      </ul>
    </v-card-text>
    <v-card-subtitle>CSR</v-card-subtitle>
    <v-card-text>
      <ul>
        <li>CSR in middleware</li>
        <li>CSR in validate | data:undefined, computed:undefined</li>
        <li>CSR in asyncData | data:-, computed:-</li>
        <li>CSR in fetch | data:undefined, computed:undefined</li>
        <li>CSR in beforeCreate | data:undefined, computed:undefined</li>
        <li>CSR in data | data:undefined, computed:undefined</li>
        <li>CSR in created | data:undefined, computed:OK</li>
        <li>CSR in head | data:undefined, computed:OK</li>
        <li>CSR in beforeMount | data:undefined, computed:OK</li>
        <li>CSR in mounted | data:undefined, computed:OK</li>
      </ul>
    </v-card-text>
  </v-card>
</template>
<script>
/* eslint-disable no-console */
export default {
  /**
   * 	このページのミドルウェアを設定する
   * ミドルウェアは、ページをレンダリングする前に呼び出される
   */
  middleware: 'example',
  /**
   * ページをレンダリングする前にストアを満たすために使用される
   * dataメソッドに似ているが、コンポーネントデータは設定しない
   */
  async fetch({ store, route, app, error, redirect, params }) {
    if (process.server) {
      await console.log(
        `SSR in fetch | data:${this.variable}, computed:${this.computedVariable}`
      )
    } else {
      await console.log(
        `CSR in fetch | data:${this.variable}, computed:${this.computedVariable}`
      )
    }
  },
  /**
   * コンポーネントを初期化する前に非同期の処理を行う
   */
  async asyncData() {
    if (process.server) {
      await console.log(`SSR in asyncData | data:-, computed:-`)
    } else {
      await console.log(`CSR in asyncData | data:-, computed:-`)
    }
  },
  async data() {
    if (process.server) {
      await console.log(
        `SSR in data | data:${this.variable}, computed:${this.computedVariable}`
      )
    } else {
      await console.log(
        `CSR in data | data:${this.variable}, computed:${this.computedVariable}`
      )
    }
    return {
      variable: 'OK'
    }
  },
  computed: {
    computedVariable() {
      return `OK`
    }
  },
  async beforeCreate() {
    if (process.server) {
      await console.log(
        `SSR in beforeCreate | data:${this.variable}, computed:${this.computedVariable}`
      )
    } else {
      await console.log(
        `CSR in beforeCreate | data:${this.variable}, computed:${this.computedVariable}`
      )
    }
  },
  async created() {
    if (process.server) {
      await console.log(
        `SSR in created | data:${this.variable}, computed:${this.computedVariable}`
      )
    } else {
      await console.log(
        `CSR in created | data:${this.variable}, computed:${this.computedVariable}`
      )
    }
  },
  async beforeMount() {
    await console.log(
      `CSR in beforeMount | data:${this.variable}, computed:${this.computedVariable}`
    )
  },
  async mounted() {
    await console.log(
      `CSR in mounted | data:${this.variable}, computed:${this.computedVariable}`
    )
  },
  async beforeUpdate() {
    await console.log(
      `CSR in beforeUpdate | data:${this.variable}, computed:${this.computedVariable}`
    )
  },
  async updated() {
    await console.log(
      `CSR in updated | data:${this.variable}, computed:${this.computedVariable}`
    )
  },
  async beforeDestroy() {
    await console.log(
      `CSR in beforeDestroy | data:${this.variable}, computed:${this.computedVariable}`
    )
  },
  async destroyed() {
    await console.log(
      `CSR in destroyed | data:${this.variable}, computed:${this.computedVariable}`
    )
  },
  methods: {},
  /**
   * 現在のページに対して特定の <meta> タグを設定する
   */
  async head() {
    if (process.server) {
      await console.log(
        `SSR in head | data:${this.variable}, computed:${this.computedVariable}`
      )
    } else {
      await console.log(
        `CSR in head | data:${this.variable}, computed:${this.computedVariable}`
      )
    }
  },
  /**
   * 動的なルーティングに対する検証を行う
   */
  async validate({ params, query, store }) {
    if (process.server) {
      await console.log(
        `SSR in validate | data:${this.variable}, computed:${this.computedVariable}`
      )
    } else {
      await console.log(
        `CSR in validate | data:${this.variable}, computed:${this.computedVariable}`
      )
    }
    return true
  }
}
</script>
