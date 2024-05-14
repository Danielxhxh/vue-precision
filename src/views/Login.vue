<template>
  <div class="card">
    <h1>Login</h1>
    <form class="login-form" @submit.prevent="login">
      <input
        type="text"
        v-model="username"
        placeholder="Username"
        autocomplete="username"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        autocomplete="current-password"
        required
      />
      <button type="submit">Accedi</button>
    </form>
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const login = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/api/doctor/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username.value,
          password: password.value,
        }),
      }
    );
    const data = await response.json();

    localStorage.setItem("tokenMedico", data.accessToken);
    router.push("/");
  } catch (error) {
    errorMessage.value = "Si è verificato un errore. Per favore, riprova.";
  }
};
</script>

<style scoped>
.card {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.error-message {
  color: #ff0000;
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
}
</style>
