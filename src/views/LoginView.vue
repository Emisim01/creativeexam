<template>
  <div class="loginView p-4 text-4xl font-bold text-white justify-center gap-4">
    <h1>Login here!</h1>
<form @submit.prevent="loginUser">
<div class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
<input type="email" v-model="email" placeholder="Email" required />
<input type="password" v-model="password" placeholder="Password" required />
</div>
<button type="submit" :disabled="loading">Login</button>
</form>

<div class="error" v-if="authError">
  {{ authError }}

</div>
<div v-if="isLoggedIn">
  Logged in as {{ currentUser?.email }}

</div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../modules/useAuth'

const { login, authError,loading, isLoggedIn, currentUser } = useAuth()

const email = ref('')
const password = ref('')

const loginUser = () => {
  login(email.value, password.value)
}

</script>

<style scoped>
.login-view {
  max-width: 400px;
  margin: 20px auto;
}

.error {
  color: red;
  margin-top: 16px
}
</style>
