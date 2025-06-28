<template>
  <v-container>
    <div class="buscadores">
      <!-- Campo de búsqueda para películas -->
      <v-text-field
        v-model="busqueda"
        label="Buscar películas..."
        append-inner-icon="mdi-magnify"
        @input="buscarPeliculas"
        clearable
      />

    <!-- Selector de género para filtrar películas -->
    <v-select
      class="filtro"
      v-model="filtroGenero"
      :items="generos"
      item-title="name"
      item-value="id"
      label="Filtrar por género"
      @update:model-value="buscarPeliculas"
      clearable
    >
      <!-- Si no hay generos disponibles, mostrar un mensaje -->
      <template v-slot:no-data>
        <div>No hay géneros disponibles</div>
      </template>
    </v-select>
    </div>

    <v-row>
      <!-- por cada pelicula en el array de peliculas, muestra su info en una card -->
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
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const peliculas = ref([])
const busqueda = ref('')
const filtroGenero = ref('')
const generos = ref([])

const API_KEY = '0926f4c23dbf7d3a4f8aef7a7ec28aab'

/*funcion para buscar peliculas*/
const buscarPeliculas = async () => {
  // query = lo que busca el usuario
  const query = busqueda.value.trim()
  // convertir el valor del filtro de género a número
  const genero = Number(filtroGenero.value)

  let url = ''
  /* Si no hay búsqueda ni filtro de género, mostrar películas populares */
  if (!query && genero === 0) {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    /* Si no hay busqueda pero si genero, muestra los resultados del genero elegido */
  } else if (!query && genero > 0) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genero}`
    /*  Si hay búsqueda pero no género, muestra resultados de búsqueda */
  } else {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
  }

    console.log('URL de búsqueda:', url)

  /* Espera a que la búsqueda se complete */
  const res = await fetch(url)
  /* Espera a que la respuesta se convierta en un json? */
  const data = await res.json()

  /* muestra peliculas si hay genero seleccionado o no*/
  peliculas.value = genero
    /* Si hay género seleccionado, filtra las películas por género */
    // data.results = pelis que devuelve la api
    // p = peliculas
    // Array.isArray(p.genre_ids) = verifica si genre_ids es un array
    // p.genre_ids.includes(genero) = verifica si el genero seleccionado está en el array de géneros de la película
    ? data.results.filter((p) => Array.isArray(p.genre_ids) && p.genre_ids.includes(genero))
    /* Si no hay género seleccionado, muestra todas las películas recibidas de la api*/
    : data.results

    console.log('filtroGenero:', filtroGenero.value, 'genero:', genero)
}

/* Función para obtener los géneros de películas */
const obtenerGeneros = async () => {
  try {
    // res = respuesta de la api
    // fetch = hace una petición a la api de themoviedb para obtener los géneros de películas
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

// inicializar funciones al cargar el componente
onMounted(() => {
  obtenerGeneros()
  buscarPeliculas()
})
</script>
