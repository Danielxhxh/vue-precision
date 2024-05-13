<template>
  <div class="card">
    <div class="card-header">
      <h2>Risultati paziente</h2>
    </div>
    <div class="card-body">
      <ul
        class="results-info-row"
        v-for="(result, index) in patientResults"
        :key="index"
      >
        <Result :result="result" />
      </ul>
    </div>
  </div>
</template>

<script setup>
import Result from "./Result.vue";

const props = defineProps({
  patientResults: Object,
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
</style>
