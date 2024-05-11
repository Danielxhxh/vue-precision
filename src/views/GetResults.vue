<template>
  <div class="main-container">
    <Side_bar_Component />
    <div class="content-container">
      <div class="patient-div">
        <label for="patientId">ID del paziente:</label>
        <form @submit.prevent="fetchPatientData">
          <input type="number" v-model="patientId" required />
          <button type="submit">Cerca</button>
        </form>
        <div v-if="patient">
          <PatientData :patientData="patient" />
        </div>
        <div v-else>
          <p>Non è stato trovato alcun paziente con questo ID.</p>
        </div>
      </div>
      <div class="results-div" v-if="patient">
        <div v-if="results.length > 0">
          <PatientResults :patientResults="results" />
        </div>
        <div v-else>
          <p>Non ci sono risultati per questo paziente.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

import Side_bar_Component from "../components/SidebarMenu.vue";
import PatientData from "../components/PatientData.vue";
import PatientResults from "../components/PatientResults.vue";

const patientId = ref("");
const patient = ref("");
const results = ref("");

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

const fetchPatientData = async () => {
  // Fetch patient data
  const response = await fetch(
    `http://localhost:3000/api/patient/${patientId.value}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenMedico")}`,
      },
    }
  );
  const data = await response.json();
  patient.value = data.patient;

  // Fetch patient results
  if (patient.value) {
    const resultsResponse = await fetch(
      `http://localhost:3000/api/results/${patientId.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenMedico")}`,
        },
      }
    );
    const resultsData = await resultsResponse.json();
    results.value = resultsData.results;
  }
};

if (route.query.id) {
  patientId.value = route.query.id;
  fetchPatientData();
}
</script>

<style scoped>
.main-container {
  display: flex;
}

.content-container {
  width: 70%;
  padding: 20px;
}

.patient-div {
  margin-bottom: 20px;
}

input[type="number"] {
  width: 70%;
}

button {
  width: 28%;
  margin-left: 2%;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
