import { ref, onMounted } from 'vue'
import { db } from './firebase.js'
import { collection, onSnapshot, getDocs } from "firebase/firestore";

const tasksFirebaseCollectionRef = collection(db, "tasks");

export function useTasks() {
  const tasks = ref([]);

  // Hent tasks fra Firebase, når komponenten loades
  onMounted(() => {
    onSnapshot(tasksFirebaseCollectionRef, (snapshot) => {
      tasks.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  });

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(tasksFirebaseCollectionRef)
    tasks.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }

  return { tasks, fetchTasks }
}
