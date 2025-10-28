import { ref, nextTick, computed } from 'vue'

export function useAdminForm() {
  // State for redigering
  const editingRecipe = ref(null)

 // SKABELON: Sådan ser en tom formular ud
  const getInitialFormData = () => ({
    recipeTitle: '',
    category: '',
    difficulty: '',
    materialUsed: '',
    steps: '',
    videoLink: '',
    imageUrl: ''
  })

  // Her gemmes alt det brugeren skriver i formularen
  const formData = ref(getInitialFormData())

  // Start med at redigere en eksisterende opskrift
  const startEditing = async (recipe) => {
    editingRecipe.value = recipe // Husk hvilken opskrift vi redigerer

    // STEP 2: Fyld formularen med opskriftens data
    formData.value = {
      recipeTitle: recipe.recipeTitle,
      category: recipe.category,
      difficulty: recipe.difficulty,

      // ARRAY TIL TEKST: Hvis materialUsed er en liste, lav det til tekst
      // Eksempel: ['Uldgarn', 'Hæklekrog'] bliver til 'Uldgarn\nHæklekrog'
      materialUsed: Array.isArray(recipe.materialUsed)
        ? recipe.materialUsed.join('\n') // Sæt hver ting på ny linje
        : recipe.materialUsed, // Eller brug som den er

      // SAMME IGEN
      steps: Array.isArray(recipe.steps)
        ? recipe.steps.join('\n')
        : recipe.steps,

      videoLink: recipe.videoLink || '', // Brug video link eller tom tekst
      imageUrl: recipe.imageUrl || '' // Brug billede link eller tom tekst
    }


    // STEP 3: Vent til siden er færdig med at opdatere
    await nextTick()

    // NU er siden opdateret - nu kan vi scroll korrekt
    // STEP 4: Scroll automatisk ned til formularen så brugeren kan se den
    // '?' betyder "hvis elementet findes, så scroll - ellers gør ingenting"
    document.querySelector('.recipeMaker')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start' // Scroll til toppen af formularen
    })
  }

  // FUNKTION: Annuller redigering og gå tilbage til "tilføj ny" mode
  const cancelEditing = () => {
    editingRecipe.value = null // Glem hvilken opskrift vi redigerede
    formData.value = getInitialFormData()
  }

  // FUNKTION: Nulstil formularen til dens oprindelige tilstand
  const resetForm = () => {
    formData.value = getInitialFormData()
  }

  // SMART TJEK: Er vi i redigerings-mode eller tilføj-mode?
  // Dette opdateres automatisk når editingRecipe ændres
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
