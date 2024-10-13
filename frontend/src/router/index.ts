import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BoardView from '../views/BoardView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Wisely | To do app' },
  },
  {
    path: '/board/:id',
    name: 'board',
    component: BoardView,
    meta: { title: 'Wisely | Tablero' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title = toRoute.meta.title as string;
  next();
});

export default router;