import { ref } from 'vue'
import { db } from '@/composables/firebase.js'
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { useAuth } from './useAuth'

export function useComments(recipeId) {
  const comments = ref([])
  const { user } = useAuth()
  const commentText = ref('')
  const loading = ref(false)
  const error = ref(null)

  // Hent kommentarer live
  const fetchComments = () => {
    const q = query(
      collection(db, 'recipes', recipeId, 'comments'),
      orderBy('createdAt', 'desc')
    )
    onSnapshot(q, (snapshot) => {
      comments.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
  }

  // Tilføj kommentar
  const addComment = async () => {
    if (!user.value) {
      error.value = 'You must be logged in to comment.'
      return
    }
    if (!commentText.value.trim()) return
    loading.value = true
    try {
      await addDoc(collection(db, 'recipes', recipeId, 'comments'), {
        user: user.value.email,
        text: commentText.value,
        createdAt: serverTimestamp()
      })
      commentText.value = ''
    } catch {
      error.value = 'Could not add comment.'
    }
    loading.value = false
  }

  return { comments, commentText, addComment, fetchComments, loading, error, user }
}
