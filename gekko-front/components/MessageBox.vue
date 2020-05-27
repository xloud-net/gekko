<template
  ><v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card light>
        <v-card-title><slot name="title">Title</slot></v-card-title>
        <v-divider />
        <v-card-text>
          <slot name="contents">Contents</slot>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
