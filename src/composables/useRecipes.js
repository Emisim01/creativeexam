import { ref, onMounted } from 'vue'
import { db } from './firebase.js'
import { collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, } from "firebase/firestore";

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
  const newRecipe = ref(createNewRecipeObject());

onMounted(() => {
  // FJERN orderBy midlertidigt for at se dine eksisterende opskrifter
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
      videoLink: newRecipe.value.videoLink,
      createdAt: serverTimestamp() // TILFØJ DETTE for at kunne sortere
    });

    // Nulstil formularen efter tilføjelse
    newRecipe.value = createNewRecipeObject();
  };

  // Opdater en eksisterende opskrift
  const updateRecipe = async (id, updatedData) => {
    try {
      // Validering
      if (!updatedData.recipeTitle || !updatedData.category || !updatedData.difficulty) {
        alert("Please fill out title, category, and difficulty.");
        return;
      }

      const recipeDoc = doc(db, "recipes", id);
      await updateDoc(recipeDoc, {
        recipeTitle: updatedData.recipeTitle,
        category: updatedData.category,
        difficulty: updatedData.difficulty,
        materialUsed: updatedData.materialUsed.split('\n').filter(m => m.trim() !== ''),
        steps: updatedData.steps.split('\n').filter(s => s.trim() !== ''),
        videoLink: updatedData.videoLink,
        updatedAt: serverTimestamp()
      });

      console.log(`Recipe with ID: ${id} has been updated.`);

      // Nulstil formularen
      newRecipe.value = createNewRecipeObject();
    } catch (error) {
      console.error("Error updating recipe: ", error);
      alert("Could not update the recipe. Check the console for errors.");
    }
  };

  const deleteRecipe = async(id) => {
    const recipeDoc = doc(db, "recipes", id);
    await deleteDoc(recipeDoc);
  };

  return { recipes, newRecipe, addRecipe, updateRecipe, deleteRecipe };
}
