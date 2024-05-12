<template>
  <div class="main-container">
    <Side_bar_Component />
    <div>Modify user</div>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import Side_bar_Component from "../components/SidebarMenu.vue";
import { useRouter } from "vue-router";

const router = useRouter();

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
</script>

<style>
.main-container {
  display: flex;
}
</style>
