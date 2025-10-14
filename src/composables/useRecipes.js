import { ref, onMounted } from 'vue'
import { db } from './firebase.js'
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";

const recipesFirebaseCollectionRef = collection(db, "recipes");

// Funktion til at nulstille formularen
const createNewRecipeObject = () => ({
  recipeTitle: "",
  category: "",
  difficulty: "",
  materialUsed: "", // Bliver til et array senere
  steps: "",        // Bliver til et array senere
  videoLink: ""
});

export function useRecipes() {
  const recipes = ref([]);
  // Vi bruger nu et objekt til at holde alle data for en ny opskrift
  const newRecipe = ref(createNewRecipeObject());

  onMounted(() => {
    onSnapshot(recipesFirebaseCollectionRef, (snapshot) => {
      recipes.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  });

  const addRecipe = async () => {
    // Tjekker om de vigtigste felter er udfyldt
    if (!newRecipe.value.recipeTitle || !newRecipe.value.category || !newRecipe.value.difficulty) {
      alert("Please fill out title, category, and difficulty.");
      return;
    }

    // Omdan tekst fra textarea til arrays ved at splitte på linjeskift
    const materialsArray = newRecipe.value.materialUsed.split('\n').filter(m => m.trim() !== '');
    const stepsArray = newRecipe.value.steps.split('\n').filter(s => s.trim() !== '');

    await addDoc(recipesFirebaseCollectionRef, {
      recipeTitle: newRecipe.value.recipeTitle,
      category: newRecipe.value.category,
      difficulty: newRecipe.value.difficulty,
      materialUsed: materialsArray,
      steps: stepsArray,
      videoLink: newRecipe.value.videoLink
    });

    // Nulstil formularen efter tilføjelse
    newRecipe.value = createNewRecipeObject();
  };

  const deleteRecipe = async(id) => {
    const recipeDoc = doc(db, "recipes", id);
    await deleteDoc(recipeDoc);
  };

  // Returner det nye objekt og de eksisterende funktioner
  return { recipes, newRecipe, addRecipe, deleteRecipe };
}
