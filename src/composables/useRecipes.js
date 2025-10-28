import { ref, onMounted } from 'vue'
import { db } from './firebase.js'
import { collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, } from "firebase/firestore";

const recipesFirebaseCollectionRef = collection(db, "recipes");

// Funktion til at nulstille formularen
const createNewRecipeObject = () => ({
  recipeTitle: "",
  category: "",
  difficulty: "",
  materialUsed: "",
  steps: "",
  videoLink: "",
  imageUrl: ""
});

export function useRecipes() {
  const recipes = ref([]);
  const newRecipe = ref(createNewRecipeObject());

onMounted(() => {

// Dette opdaterer automatisk når tilføjer/ændrer opskrifter!
  onSnapshot(recipesFirebaseCollectionRef, (snapshot) => {
    const recipesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // SIMPEL sortering - nyeste først
    recipes.value = recipesData.sort((a, b) => {
      // Hvis begge har createdAt
      if (a.createdAt && b.createdAt) {
        return b.createdAt.seconds - a.createdAt.seconds
      }
      // Hvis kun en har createdAt, sæt den med timestamp først
      if (a.createdAt) return -1
      if (b.createdAt) return 1

      // Hvis ingen har timestamp, behold original rækkefølge
      return 0
    });
  });
});

const addRecipe = async (recipeData) => {

  // Tjekker om de vigtigste felter er udfyldt
  if (!recipeData.recipeTitle || !recipeData.category || !recipeData.difficulty) {
    alert("Please fill out title, category, and difficulty.");
    return; // Stop funktionen hvis noget mangler
  }

  // Omdan tekst fra textarea til arrays ved at splitte på linjeskift
  const materialsArray = recipeData.materialUsed.split('\n').filter(m => m.trim() !== '');
  const stepsArray = recipeData.steps.split('\n').filter(s => s.trim() !== '');


  await addDoc(recipesFirebaseCollectionRef, {
    recipeTitle: recipeData.recipeTitle,
    category: recipeData.category,
    difficulty: recipeData.difficulty,
    materialUsed: materialsArray,
    steps: stepsArray,
    videoLink: recipeData.videoLink,
    imageUrl: recipeData.imageUrl,
    createdAt: serverTimestamp()
  });

  console.log('Recipe added successfully!');
};

  // Opdater en eksisterende opskrift
  const updateRecipe = async (id, updatedData) => {
    try {
      // Sikkerhedstjek
      if (!updatedData.recipeTitle || !updatedData.category || !updatedData.difficulty) {
        alert("Please fill out title, category, and difficulty.");
        return;
      }

  const materialsArray = updatedData.materialUsed.split('\n').filter(m => m.trim() !== '');
  const stepsArray = updatedData.steps.split('\n').filter(s => s.trim() !== '');

      const recipeDoc = doc(db, "recipes", id);
      await updateDoc(recipeDoc, {
        recipeTitle: updatedData.recipeTitle,
        category: updatedData.category,
        difficulty: updatedData.difficulty,
        materialUsed: materialsArray,
        steps: stepsArray,
        videoLink: updatedData.videoLink,
        imageUrl: updatedData.imageUrl,
        updatedAt: serverTimestamp()
      }); // Dette objekt kaldes en "payload" (data der sendes)

      console.log(`Recipe with ID: ${id} has been updated.`);

      // Nulstil formularen
      newRecipe.value = createNewRecipeObject();
    } catch (error) {
      console.error("Error updating recipe: ", error);
      alert("Could not update the recipe. Check the console for errors.");
    }
  };

  // Slet opskrift fra databasen
  const deleteRecipe = async(id) => {
    // FIND og SLET: Peg på opskriften og fjern den
    const recipeDoc = doc(db, "recipes", id);
    await deleteDoc(recipeDoc);
    // onSnapshot opdaterer automatisk listen når opskriften er slettet!
  };

  return {
    recipes,
    newRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe
  };
}
