<template>
  <div class="Side_bar_Component">
    <h2 class="menu-title" @click="goTo('/')">Menù</h2>

    <p class="menu-element" @click="goTo('/add-patient')">
      <span class="link">Aggiungi Paziente</span>
    </p>
    <p class="menu-element" @click="goTo('/delete-patient')">
      <span class="link">Elimina Paziente</span>
    </p>
    <p class="menu-element" @click="goTo('/modify-patient')">
      <span class="link">Modifica Paziente</span>
    </p>
    <p class="menu-element" @click="goTo('/get-results')">
      <span class="link">Risultati Paziente</span>
    </p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goTo = (pageName) => {
  router.push(pageName);
};
</script>

<style>
p {
  cursor: pointer;
}
.main-content {
  display: flex;
}
.Side_bar_Component {
  background-color: #7fd388;
  /* position: fixed; */
  width: 250px;
  padding: 20px;
  height: 100vh;
  color: #fff;
}

.menu-title {
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
}

.link {
  color: #fff;
  text-decoration: none;
  margin-bottom: 20px;
}

.menu-element {
  text-align: center;
  font-size: 15px;
  border-radius: 50px;
  padding: 15px;
  transition: 0.3s;
}
.menu-element:hover {
  background-color: lightgreen;
}
</style>
