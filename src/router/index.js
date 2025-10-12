import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth.js';
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/composables/firebase.js'
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

    {path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },

   {
      path: '/recipe/:id',
      name: 'SingleRecipe',
      component: () => import('@/views/SingleRecipeView.vue')
    },

       {
      path: '/generator',
      name: 'Generator',
      component: () => import('@/views/GeneratorView.vue')
    },

    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/AdminView.vue'),
      meta: { requiresAdmin: true }
    },
  ],

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

// Tilføj denne navigation guard FØR "export default router"
router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  if (requiresAdmin) {
    const auth = getAuth()
    // Vent et øjeblik for at sikre, at Firebase har initialiseret brugeren
    await new Promise(resolve => setTimeout(resolve, 100))
    const user = auth.currentUser

    if (!user) {
      // Bruger er ikke logget ind -> send til login
      next({ name: 'Login' })
    } else {
      // Bruger er logget ind, tjek om de er admin i Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        // Bruger er admin -> giv adgang
        next()
      } else {
        // Bruger er ikke admin -> send til forsiden
        next({ name: 'home' })
      }
    }
  } else {
    // Ruten kræver ikke admin, så giv bare adgang
    next()
  }
})



export default router
