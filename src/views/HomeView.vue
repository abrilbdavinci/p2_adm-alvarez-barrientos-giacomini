<template>
  <v-container-fluid>
    <div class="buscadores">
      <v-text-field
        v-model="busqueda"
        label="Buscar películas..."
        append-inner-icon="mdi-magnify"
        @input="buscarPeliculas"
        clearable
      />

      <v-select
        class="filtro"
        v-model="filtroGenero"
        :items="generos"
        item-title="name"
        item-value="id"
        label="Filtrar por género"
        @change="buscarPeliculas"
        clearable
      >
        <template v-slot:no-data>
          <div>No hay géneros disponibles</div>
        </template>
      </v-select>
    </div>

    <v-row>
      <v-col v-for="pelicula in peliculas" :key="pelicula.id" cols="12" sm="6" md="4" lg="3">
        <RouterLink :to="`/pelicula/${pelicula.id}`" class="router-link">
          <v-card class="mx-auto peli-card" max-width="300" elevation="4">
            <v-img
              :src="`https://image.tmdb.org/t/p/w300${pelicula.poster_path}`"
              :alt="pelicula.title"
              height="300"
              cover
            />
            <v-card-title class="text-wrap">{{ pelicula.title }}</v-card-title>
          </v-card>
        </RouterLink>
      </v-col>
    </v-row>
  </v-container-fluid>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const peliculas = ref([])
const busqueda = ref('')
const filtroGenero = ref('')
const generos = ref([])

const API_KEY = '0926f4c23dbf7d3a4f8aef7a7ec28aab'

const buscarPeliculas = async () => {
  const query = busqueda.value.trim()
  const genero = Number(filtroGenero.value)

  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=es-ES`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`

  const res = await fetch(url)
  const data = await res.json()

  peliculas.value = genero
    ? data.results.filter((p) => Array.isArray(p.genre_ids) && p.genre_ids.includes(genero))
    : data.results
}

const obtenerGeneros = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es-ES`,
    )
    if (!res.ok) throw new Error('Error al obtener géneros')
    const data = await res.json()
    generos.value = data.genres || []
  } catch (error) {
    console.error('Error en obtenerGeneros:', error)
    generos.value = []
  }
}

onMounted(() => {
  obtenerGeneros()
  buscarPeliculas()
})
</script>
