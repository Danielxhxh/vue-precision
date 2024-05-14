<template>
  <div class="main-container">
    <Side_bar_Component />
    <div class="content-div">
      <div class="centered-div">
        <div class="patient-div">
          <label for="patientId">Cerca paziente da eliminare tramite ID:</label>
          <form @submit.prevent="fetchPatientData">
            <input type="number" v-model="patientId" required />
            <button type="submit">Cerca</button>
          </form>
          <div v-if="message">
            <p :class="message.type">{{ message.message }}</p>
          </div>
          <div v-if="patient">
            <PatientData :patientData="patient" />
            <button class="delete-button" @click="deletePatient">
              Elimina paziente
            </button>
          </div>
          <div v-else>
            <p v-if="patient != ''">
              Non è stato trovato alcun paziente con questo ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import Side_bar_Component from "../components/SidebarMenu.vue";
import PatientData from "../components/PatientData.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const patientId = ref("");
const patient = ref("");
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

const fetchPatientData = async () => {
  // Fetch patient data
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}/api/patient/${patientId.value}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenMedico")}`,
      },
    }
  );
  const data = await response.json();
  patient.value = data.patient;
};

const deletePatient = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/api/patient/${patientId.value}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenMedico")}`,
        },
      }
    );

    if (response.ok) {
      message.value = {
        message: `Paziente ${patient.value.username} con ID:${patient.value.id} eliminato con successo.`,
        type: "success",
      };
      patient.value = "";
    } else {
      const data = await response.json();
      message.value = {
        message:
          "Si è verificato un errore durante l'eliminazione del paziente.",
        type: "error",
      };
      if (data && data.errorMessage) {
        throw new Error(data.errorMessage);
      } else {
        throw new Error("Errore durante l'eliminazione del paziente.");
      }
    }
  } catch (error) {
    message.value = {
      message: "Si è verificato un errore durante l'eliminazione del paziente.",
      type: "error",
    };
  }
};
</script>

<style>
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

.delete-button {
  background-color: red;
  color: white;
  margin-left: 0px;
  width: 100%;
  transition: 0.3s;
}
.delete-button:hover {
  background-color: lightcoral;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
