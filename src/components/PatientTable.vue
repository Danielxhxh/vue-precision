<template>
  <div class="patient-table">
    <table v-if="patients && patients.length">
      <caption class="table-caption">
        Lista Pazienti
      </caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="patient in patients"
          :key="patient.id"
          @click="goTo('/get-results?id=' + patient.id)"
        >
          <td>{{ patient.id }}</td>
          <td>{{ patient.username }}</td>
          <td>{{ patient.password }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Nessun paziente trovato.</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goTo = (pageName) => {
  router.push(pageName);
};

const patients = ref([]);
fetch(`${import.meta.env.VITE_BACKEND}/api/patient/id/all`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("tokenMedico")}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    patients.value = data.patients;
  })
  .catch((error) => {
    console.error("Error fetching patients:", error);
  });
</script>

<style scoped>
/* .patient-table {
  display: flex;
  margin-top: 20px;
  width: 100%;
  overflow-x: auto;
} */

table {
  margin: 20px;
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 20px;
  background-color: #7fd388;
  color: #fff;
}

td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
}

.th.table-header {
  font-weight: bold;
}

.table-cell {
  font-family: Arial, sans-serif;
}
.table-caption {
  font-weight: bold;
  font-size: 30px;
  color: green;
  text-align: center;
  margin-bottom: 20px;
}
</style>
