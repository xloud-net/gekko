<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn v-show="drawer" icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn v-show="drawer" icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <!--
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!--
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      -->
    </v-app-bar>
    <v-content>
      <v-container>
        <v-alert
          v-for="error in errors"
          :key="error.message"
          :value="true"
          type="error"
          dismissible
        >
          {{ error.message }}
        </v-alert>
        <nuxt />
      </v-container>
    </v-content>
    <!--
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    -->
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
/*
 * ■about Vuetify
 * https://vuetifyjs.com/ja/components/api-explorer/
 *
 * ■about Material Design Icons
 * https://materialdesignicons.com/cdn/2.0.46/
 *
 */
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Demo',
          to: '/demo'
        },
        {
          icon: 'mdi-human',
          title: 'Users',
          to: '/users'
        },
        {
          icon: 'mdi-yin-yang',
          title: 'About',
          to: '/about'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Gekko'
    }
  },
  computed: {
    errors() {
      return this.$store.getters['errors/get']
    }
  },
  created() {
    // this.errors = []
    // this.setListener()
  },
  methods: {
    /*
    setListener() {
      this.$nuxt.$on('updateErrors', this.setErrors)
    },
    setErrors(errors) {
      this.errors = errors || []
    }
    */
  }
}
</script>
