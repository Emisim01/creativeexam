// src/composables/useRecipes.js
import { db } from './firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export function useRecipes() {
  const addRecipe = async (recipe) => {
    try {
      await addDoc(collection(db, 'recipes'), {
        title: recipe.title,
        category: recipe.category,
        difficulty: recipe.difficulty,
        images: recipe.images,
        materialsUsed: recipe.materialsUsed,
        steps: recipe.steps,
        createdAt: serverTimestamp()
      })
      console.log("Opskrift gemt!")
    } catch (e) {
      console.error("Fejl ved tilføjelse:", e)
    }
  }

  return { addRecipe }
}
