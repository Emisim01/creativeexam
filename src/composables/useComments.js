import { ref } from 'vue'
import { db } from '@/composables/firebase.js'
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { useAuth } from './useAuth'

// HOVEDFUNKTION: Håndterer alle kommentarer for én specifik opskrift
export function useComments(recipeId) {
  // STORAGE: Liste af alle kommentarer til denne opskrift
  const comments = ref([])

  const { user } = useAuth()

  // FORMULAR DATA: Hvad brugeren skriver i kommentar feltet
  const commentText = ref('')

  const loading = ref(false)
  const error = ref(null)

  // Hent kommentarer live fra databasen
  const fetchComments = () => {
    const q = query(
      collection(db, 'recipes', recipeId, 'comments'),
      orderBy('createdAt', 'desc') // sorterer nyeste først
    )
    onSnapshot(q, (snapshot) => { //Lytter til databasen for ændringer. når der sker en ændring, opdateres comments automatisk
      comments.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
  }

  // Tilføj kommentar
  const addComment = async () => {
    if (!user.value) {
      error.value = 'You must be logged in to comment.'
      return // Stop funktionen her
    }

    // Har brugeren skrevet noget? (fjern mellemrum og tjek)
    if (!commentText.value.trim()) return
    loading.value = true
    try {
      // Gem kommentaren i Firebase
      await addDoc(collection(db, 'recipes', recipeId, 'comments'), {
        user: user.value.email,       // Hvem skrev kommentaren?
        text: commentText.value,      // Hvad skrev de?
        createdAt: serverTimestamp()  // Hvornår blev den skrevet?
      })

      // STEP 5: Ryd tekstfeltet efter success
      commentText.value = ''
    } catch {
      error.value = 'Could not add comment.'
    }
    loading.value = false
  }

  return {
    comments,
    commentText,
    addComment,
    fetchComments,
    loading,
    error,
    user
   }
}
