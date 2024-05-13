<template>
  <div class="main-container">
    <Side_bar_Component />
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />

        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />

        <label for="id">ID:</label>
        <input type="number" id="id" v-model="id" required />

        <label for="birth-date">BirthDate:</label>
        <input type="date" id="birth-date" v-model="BirthDate" required />

        <label for="height">Height:</label>
        <input type="number" id="height" v-model="Height" required />

        <label for="weight">Weight:</label>
        <input type="number" id="weight" v-model="Weight" required />

        <button type="submit">Submit</button>
      </form>
      <div v-if="message">
        <p :class="message.type">{{ message.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import Side_bar_Component from "../components/SidebarMenu.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const username = ref("");
const password = ref("");
const id = ref("");
const BirthDate = ref("");
const Height = ref("");
const Weight = ref("");

const message = ref({ message: "", type: "" });

onBeforeMount(async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}/api/doctor/verify-token`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenMedico")}`,
      },
    }
  );
  const data = await response.json();

  if (!data.valid) {
    localStorage.removeItem("tokenMedico");
    router.push("/login");
  }
});

const handleSubmit = () => {
  const userData = {
    id: id.value,
    username: username.value,
    password: password.value,
    "first-name": "",
    "last-name": "",
    "birth-date": BirthDate.value,
    height: {
      unit: "centimeters",
      value: parseInt(Height.value),
    },
    weight: {
      unit: "kilograms",
      value: parseInt(Weight.value),
    },
  };

  fetch(`${import.meta.env.VITE_BACKEND}/api/patient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tokenMedico")}`,
    },
    body: JSON.stringify(userData),
  })
    .then((data) => {
      console.log("Data sent successfully:", data);
      message.value = {
        message: "Paziente aggiunto con successo!",
        type: "success",
      };
    })
    .catch((error) => {
      console.error("Error sending data:", error);
      message.value = {
        message: "Errore nel aggiungere il paziente!",
        type: "error",
      };
    });

  username.value = "";
  password.value = "";
  id.value = "";
  BirthDate.value = "";
  Height.value = "";
  Weight.value = "";
};
</script>

<style>
.main-container {
  display: flex;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
