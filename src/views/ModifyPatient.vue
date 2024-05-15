<template>
  <div class="main-container">
    <Side_bar_Component />
    <div class="content-div">
      <div class="centered-div">
        <div>
          <img
            src="https://media4.giphy.com/media/Lr4HRF6DEEJo90SQXF/giphy.gif?cid=6c09b9526e66j3fhy070oftr56qjar9rt5jc3akk4hoigq2y&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
            alt=""
            style="width: 20%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import Side_bar_Component from "../components/SidebarMenu.vue";
import { useRouter } from "vue-router";

const router = useRouter();

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
</script>

<style></style>
