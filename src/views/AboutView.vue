<template>
  <div></div>
<!--   <div class="about">
    <h1>This is an about page grabbing stuff from firebase</h1>
    <h3>Posts:</h3>
    <input type="text" placeholder="Enter post title" v-model="newPostTitle"/>
    <button @click="addPost">Add Post</button>
    <ul>
      <li v-for="post in posts" :key="post">
        {{ post.postName }} & {{ post.id }}

       <button @click="deletePost(post.id)">Delete</button>

      </li>
    </ul>

  </div> -->
</template>

<script setup>

/* import { usePosts } from '../composables/usePosts.js'
const { posts, newPostTitle, addPost, deletePost } = usePosts(); */


// import { onMounted, ref } from 'vue'

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB9Pku9_2ebq8X-NaXBF736nZHXIaCEKO8",
//   authDomain: "creative-exam.firebaseapp.com",
//   projectId: "creative-exam",
//   storageBucket: "creative-exam.firebasestorage.app",
//   messagingSenderId: "96387611280",
//   appId: "1:96387611280:web:99ca0e2ad4ee21339f7615"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig); //initialize firebase
// const db = getFirestore(app); //initialize Firestore and store the reference db

// const postsFirebaseCollectionRef = collection(db, "posts"); //reference to the collection "posts" in Firestore

// const posts = ref([])
// const newPostTitle = ref("")

// onMounted(() => {
//   // Fetch posts from Firestore
//   const postsCollection = postsFirebaseCollectionRef;
//   onSnapshot(postsCollection, (snapshot) => {
//     posts.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//   })
// })

// const addPost = async () => {
//   if (newPostTitle.value.trim() == "") return;

//   await addDoc(postsFirebaseCollectionRef, {
//     postName: newPostTitle.value
//   })

//   newPostTitle.value = ""
//   console.log("Post added:")
// }

// const deletePost = async(id) => {
//   console.log("deleting post with id:", id)
//   const postDoc = doc(db, "posts", id)
//   await deleteDoc(postDoc)
// }



</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
