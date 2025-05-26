import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import CarrinhoCompras from '@/components/CarrinhoCompras.vue'
import Game from '@/views/Game.vue' 
import Termo from '@/views/Termo.vue'
import Equipe from '@/views/Equipe.vue'
import Devolucao from '@/views/Devolucao.vue'
import Envio from '@/views/Envio.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/carrinho', name: 'Carrinho', component: CarrinhoCompras },
  { path: '/game/:id', name: 'Game', component: Game, props: true },
  { path: '/termo', name: 'Termo', component: Termo},
  { path: '/equipe', name: 'Equipe', component: Equipe},
  { path: '/envio', name: 'Envio', component: Envio},
  { path: '/devolucao', name: 'Devolucao', component: Devolucao},
]

const router = createRouter({
  history: createWebHistory(),
  routes
  
  
})



export default router