<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Parametro</th>
          <th>Valore</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in result" :key="key">
          <td>{{ key }}</td>

          <td v-if="!value">-</td>
          <td
            v-else-if="
              typeof value === 'object' && value.hasOwnProperty('value')
            "
          >
            {{ value.value }} {{ value.unit }}
          </td>
          <td v-else-if="typeof value === 'string'">{{ value }}</td>
          <td v-else>
            <span v-for="(val, k) in value" :key="k">
              {{ k }}: {{ val }}<br />
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

const props = defineProps({
  result: Object,
});
const result = ref(props.result);

const filterData = () => {
  delete result.value["flow-volume-curve-points"];
  delete result.value["volume-time-curve-points"];
  delete result.value.patient;
};

onBeforeMount(() => {
  filterData();
});
</script>

<style scoped>
table {
  width: 100%;
  margin-bottom: 80px;
}
thead:first-child {
  text-align: left;
  font-size: 18px;
  color: green;
}
td {
  width: 50%;
}

tr:nth-child(even) {
  background-color: #d6eeee;
}
</style>
