import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/modules/useAuth.js'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

     {
      path: '/recipes',
      name: 'Recipes',
      component: () => import('@/views/RecipesView.vue'),
      meta: { requiresAuth: true }
    },

         {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    },

   {
      path: '/recipe/:id',
      name: 'SingleRecipe',
      component: () => import('@/views/SingleRecipeView.vue')
    },

  ],

    scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },

})

// Navigation guard to protect routes that require authentication
router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuth()
  if (to.meta.requiredAuth && !isLoggedIn.value) {
    next({ name: 'Login' })
  }
  else {
    next()
  }

})




export default router
