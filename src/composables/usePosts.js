// import { ref, onMounted } from 'vue'
// import { db } from './firebase.js'
// import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";

// const postsFirebaseCollectionRef = collection(db, "posts");

// export function usePosts() {
//   const posts = ref([]);
//   const newPostTitle = ref("");

//   onMounted(() => {
//     onSnapshot(postsFirebaseCollectionRef, (snapshot) => {
//       posts.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     });
//   });

//   const addPost = async () => {
//     if (newPostTitle.value.trim() == "") return;
//     await addDoc(postsFirebaseCollectionRef, {
//       postName: newPostTitle.value
//     });
//     newPostTitle.value = "";
//   };

//   const deletePost = async(id) => {
//     const postDoc = doc(db, "posts", id);
//     await deleteDoc(postDoc);
//   };

//   return { posts, newPostTitle, addPost, deletePost };
// }
