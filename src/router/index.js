import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/composables/firebase.js'

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
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
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

// HELPER-FUNKTION: Venter på at Firebase kender brugerens status
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener(); // Stop med at lytte, når vi har fået svar
        resolve(user);
      },
      reject
    );
  });
};

// OPDATERET NAVIGATION GUARD
router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  if (requiresAdmin) {
    const user = await getCurrentUser(); // Vent på at få den rigtige bruger

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
