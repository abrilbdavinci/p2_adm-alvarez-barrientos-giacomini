import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetallePelicula from '../views/DetallePelicula.vue'
import FavoritosView from '../views/FavoritosView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/pelicula/:id', name: 'detalle', component: DetallePelicula },
  { path: '/favoritos', name: 'favoritos', component: FavoritosView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
