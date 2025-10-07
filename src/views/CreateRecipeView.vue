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

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries


// // Initialize Firebase
// const app = initializeApp(firebaseConfig); //initialize firebase
// const db = getFirestore(app); //initialize Firestore and store the reference db


</script>


<style scoped>

</style>
