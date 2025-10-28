import { ref, computed } from 'vue'
import { firebaseApp } from '../composables/firebase'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword  } from 'firebase/auth'

const auth = getAuth(firebaseApp)

const currentUser = ref(null) // null = ingen er logget ind
const isLoggedIn = computed(() => !!currentUser.value)// Er nogen logget ind? !! betyder "konverter til true/false"
const authError = ref(null)
const loading = ref(false) // LOADING SPINNER: Viser "Loading..." mens vi venter. False = ikke loading
const user = ref(null)

onAuthStateChanged(auth, (user) => {
  currentUser.value = user
})


// FUNKTION: Log en bruger ind
const login = async (email, password) => {
  console.log('Logging in with: ', email)
  loading.value = true
  authError.value = null
  try {
    await signInWithEmailAndPassword(auth, email, password)
  }
  catch(error) {
    authError.value = error.message
  }
  finally {
    loading.value = false
  }
}

// Opret ny bruger konto
const register = async (email, password) => {
  console.log("Attempting registration with email:", email);
  loading.value = true;
  authError.value = null;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  }
  catch (error) {
    authError.value = error.message
  }
  finally {
    loading.value = false;
  }
}

// Log brugeren ud
const logout = async (routerInstance) => {
  console.log('Logging out of this mail: ', currentUser.value?.email)
  loading.value = true
  authError.value = null
  try {
    await signOut(auth)
    // Send brugeren til forsiden (hvis router er givet)
    if (routerInstance) {
      routerInstance.push('/')
    }
  }
  catch(error) {
    authError.value = error.message
  }
  finally {
    loading.value = false
  }
}

//skal være der igen for at comment section registrerer ændringer i brugerens login status
export function useAuth() {
    const auth = getAuth()
  onAuthStateChanged(auth, (u) => {
    user.value = u
  })
  return {
    currentUser,
    isLoggedIn,
    authError,
    loading,
    user,
    login,
    logout,
    register
  }
}
