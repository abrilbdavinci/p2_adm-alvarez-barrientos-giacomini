<script setup>
import { ref, onMounted } from 'vue'

const favoritos = ref([])

const cargarFavoritos = () => {
  // Cargar los favoritos desde localStorage, si no hya, crear un array vacío
  // JSON.parse convierte el string de localStorage a un objeto JavaScript
  favoritos.value = JSON.parse(localStorage.getItem('favoritos')) || []
}

const eliminarFavorito = (id) => {
  favoritos.value = favoritos.value.filter((peli) => peli.id !== id)
  localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
}

// Cargar los favoritos al montar el componente
onMounted(() => {
  cargarFavoritos()
})
</script>

<template>
  <v-container>
    <v-row justify="center" class="mb-6">
      <v-col cols="12" class="text-center">
        <h1>Mis Películas Favoritas</h1>
      </v-col>
    </v-row>

    <v-row justify="center" v-if="favoritos.length === 0" class="fav-content">
      <v-col cols="12" class="text-center">
        <v-alert type="info" border="left" prominent>
          No hay películas favoritas guardadas.
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col v-for="pelicula in favoritos" :key="pelicula.id" cols="12" sm="6" md="3" lg="3">
        <v-card elevation="4" class="d-flex flex-column" style="height: 100%">
          <v-img
            :src="
              pelicula.poster_path
                ? `https://image.tmdb.org/t/p/w300${pelicula.poster_path}`
                : 'https://dummyimage.com/300x450/cccccc/ffffff&text=Sin+Imagen'
            "
            height="300"
            class="rounded-lg"
            cover
            alt="Poster"
          />
          <v-card-title class="text-truncate" style="font-weight: 700">
            {{ pelicula.title }}
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn
              color="red darken-2"
              text
              @click="eliminarFavorito(pelicula.id)"
              aria-label="Eliminar de favoritos"
              block
            >
              <v-icon left>mdi-delete</v-icon> Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
