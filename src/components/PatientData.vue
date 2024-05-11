<template>
  <div class="card">
    <div class="card-header">
      <h2>Dati paziente</h2>
    </div>
    <div class="card-body">
      <div class="user-info">
        <div class="user-info-row">
          <p><strong>Username:</strong> {{ patientData.username }}</p>
          <p><strong>First Name:</strong> {{ patientData["first-name"] }}</p>
          <p><strong>Last Name:</strong> {{ patientData["last-name"] }}</p>
          <p><strong>Birth Date:</strong> {{ patientData["birth-date"] }}</p>
        </div>
        <div class="user-info-row">
          <p>
            <strong>Height:</strong> {{ patientData.height.value }}
            {{ patientData.height.unit }}
          </p>
          <p>
            <strong>Weight:</strong> {{ patientData.weight.value }}
            {{ patientData.weight.unit }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  patientData: Object,
});
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 100%;
  position: sticky;
}

.card-header {
  background-color: #4caf50;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.card-body {
  padding: 20px;
}

.user-info {
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
}

.user-info-row {
  flex: 1;
}
</style>
