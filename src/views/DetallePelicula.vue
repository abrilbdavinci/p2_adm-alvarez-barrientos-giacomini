<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pelicula = ref(null)
const API_KEY = '0926f4c23dbf7d3a4f8aef7a7ec28aab'

const obtenerPelicula = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${API_KEY}&language=es-ES`,
  )
  const data = await res.json()
  pelicula.value = data
}

const agregarAFavoritos = (pelicula) => {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []

 // Verifica si la película ya está en favoritos
  // Si no está, la agrega; si ya está, muestra un alert
  // favoritos.some() verifica si al menos un elemento del array cumple con la condición
  if (!favoritos.some((fav) => fav.id === pelicula.id)) {
    favoritos.push({
      id: pelicula.id,
      title: pelicula.title,
      poster_path: pelicula.poster_path,
      release_date: pelicula.release_date,
    })
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
    alert(`La película "${pelicula.title}" fue agregada a favoritos.`)
  } else {
    alert(`La película "${pelicula.title}" ya está en favoritos.`)
  }
}

onMounted(() => {
  obtenerPelicula()
})
</script>

<template>
  <v-container>
    <v-row justify="center" align="center" class="my-6">
      <v-col cols="12" md="4">
        <v-img
          v-if="pelicula && pelicula.poster_path"
          :src="`https://image.tmdb.org/t/p/w400${pelicula.poster_path}`"
          alt="Poster"
          height="600"
          class="rounded-lg"
          cover
        ></v-img>
        <v-img
          v-else
          src="https://dummyimage.com/400x600/cccccc/ffffff&text=Sin+Imagen"
          alt="No image"
          height="600"
          class="rounded-lg"
          cover
        ></v-img>
      </v-col>

      <v-col cols="12" md="6">
        <h1 class="text-h4 font-weight-bold mb-4">{{ pelicula?.title }}</h1>
        <v-divider></v-divider>
        <p class="my-4"><strong>Resumen:</strong> {{ pelicula?.overview || 'No disponible' }}</p>
        <p><strong>Año:</strong> {{ pelicula?.release_date || 'N/A' }}</p>
        <p><strong>Rating:</strong> {{ pelicula?.vote_average || 'N/A' }}</p>

        <v-btn
          class="btn-agregar"
          color="deep-purple accent-4"
          dark
          @click.prevent="agregarAFavoritos(pelicula)"
        >
          <v-icon left>mdi-heart</v-icon> Agregar a Favoritos
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
