import { ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/composables/firebase.js'

// Gør isAdmin til en global state, så den er den samme overalt i appen
const isAdmin = ref(false)

export function useAdmin() {
  const auth = getAuth()

  // Denne funktion tjekker brugerens rolle i databasen
  const checkAdminRole = async (user) => {
    if (!user) {
      isAdmin.value = false
      return
    }
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      isAdmin.value = userDoc.exists() && userDoc.data().role === 'admin'
    } catch (error) {
      console.error("Fejl ved tjek af admin-status:", error)
      isAdmin.value = false
    }
  }

  // Lyt til ændringer i login-status
  onAuthStateChanged(auth, (user) => {
    checkAdminRole(user)
  })

  // Returner den delte isAdmin-værdi og en manuel check-funktion (selvom den ikke er nødvendig længere)
  return { isAdmin, checkAdmin: () => checkAdminRole(auth.currentUser) }
}
