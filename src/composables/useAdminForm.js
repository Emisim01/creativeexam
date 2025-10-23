// composables/useAdminForm.js
import { ref, nextTick, computed } from 'vue'

export function useAdminForm() {
  // State for redigering
  const editingRecipe = ref(null)

  // Initial form data
  const getInitialFormData = () => ({
    recipeTitle: '',
    category: '',
    difficulty: '',
    materialUsed: '',
    steps: '',
    videoLink: '',
    imageUrl: ''
  })

  // Form data state
  const formData = ref(getInitialFormData())

  // Start editing a recipe
  const startEditing = async (recipe) => {
    editingRecipe.value = recipe

    // Map recipe data til form format
    formData.value = {
      recipeTitle: recipe.recipeTitle,
      category: recipe.category,
      difficulty: recipe.difficulty,
      materialUsed: Array.isArray(recipe.materialUsed)
        ? recipe.materialUsed.join('\n')
        : recipe.materialUsed,
      steps: Array.isArray(recipe.steps)
        ? recipe.steps.join('\n')
        : recipe.steps,
      videoLink: recipe.videoLink || '',
      imageUrl: recipe.imageUrl || ''
    }

    // Scroll til formularen efter DOM er opdateret
    await nextTick()
    document.querySelector('.recipeMaker')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  // Cancel editing
  const cancelEditing = () => {
    editingRecipe.value = null
    formData.value = getInitialFormData()
  }

  // Reset form
  const resetForm = () => {
    formData.value = getInitialFormData()
  }

  // Check if form is in edit mode
  const isEditing = computed(() => editingRecipe.value !== null)

  return {
    editingRecipe,
    formData,
    startEditing,
    cancelEditing,
    resetForm,
    isEditing
  }


}
