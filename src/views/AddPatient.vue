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

onBeforeMount(async () => {
  const response = await fetch(
    "http://localhost:3000/api/doctor/verify-token",
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

  fetch("http://localhost:3000/api/patient", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tokenMedico")}`,
    },
    body: JSON.stringify(userData),
  })
    .then((data) => {
      console.log("Data sent successfully:", data);
      alert("Data sent successfully!");
    })
    .catch((error) => {
      console.error("Error sending data:", error);
      alert("Error sending data!");
    });
};
</script>

<style>
.main-container {
  display: flex;
}
</style>
