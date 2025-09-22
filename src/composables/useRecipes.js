import { ref, onMounted } from 'vue'
import { db } from './firebase.js'
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";

const recipesFirebaseCollectionRef = collection(db, "recipes");

export function useRecipes() {
  const recipes = ref([]);
  const newRecipeTitle = ref("");

  onMounted(() => {
    onSnapshot(recipesFirebaseCollectionRef, (snapshot) => {
      recipes.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  });

  const addRecipe = async () => {
    if (newRecipeTitle.value.trim() == "") return;
    await addDoc(recipesFirebaseCollectionRef, {
      postName: newRecipeTitle.value
    });
    newRecipeTitle.value = "";
  };

  const deleteRecipe = async(id) => {
    const recipeDoc = doc(db, "recipes", id);
    await deleteDoc(recipeDoc);
  };

  return { recipes, newRecipeTitle, addRecipe, deleteRecipe };
}
