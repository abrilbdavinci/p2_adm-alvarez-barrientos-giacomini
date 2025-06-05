<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar color="deep-purple accent-4" dark elevate-on-scroll>
      <v-toolbar-title class="text-h5 font-weight-bold">
        <RouterLink to="/">
          <v-icon left>icon</v-icon>
        </RouterLink>
      </v-toolbar-title>

      <v-spacer />

      <v-btn text :to="'/'" exact> Home </v-btn>
      <v-btn text :to="'/favoritos'"> Favoritos </v-btn>
    </v-app-bar>

    <v-main class="-4">
      <RouterView v-slot="{ Component }">
        <transition mode="out-in" enter-active-class="animate__animated animate__bounceInUp">
          <component :is="Component" />
        </transition>
      </RouterView>
    </v-main>

    <v-footer color="deep-purple accent-4" dark padless>
      <v-col class="text-center white--text py-1">
        &copy; Parical 2 ADM Alvarez Barrientos Giacomini DWM3AP
      </v-col>
    </v-footer>
  </v-app>
</template>
