<template>
  <div class="main-container">
    <Side_bar_Component />
    <div class="content-div">
      <div class="centered-div">
        <div class="card">
          <form @submit.prevent="handleSubmit">
            <label for="id">ID:</label>
            <input type="text" id="id" v-model="id" required />

            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required />

            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />

            <label for="birth-date">Data di nascita:</label>
            <input type="date" id="birth-date" v-model="BirthDate" required />

            <label for="height">Altezza:</label>
            <input type="number" id="height" v-model="Height" required />

            <label for="weight">Peso:</label>
            <input type="number" id="weight" v-model="Weight" required />

            <button type="submit">Invia</button>
          </form>
          <div v-if="message">
            <p :class="message.type">{{ message.message }}</p>
          </div>
        </div>
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
.card {
  max-width: 400px;
  max-height: 500px;
  margin: auto;
  padding: 30px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
