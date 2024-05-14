<template>
  <div class="Side_bar_Component">
    <h2 class="menu-title" @click="goTo('/')">Menu</h2>

    <p class="menu-element" @click="goTo('/add-patient')">
      <span class="link"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          /></svg
        >Aggiungi Paziente</span
      >
    </p>
    <p class="menu-element" @click="goTo('/delete-patient')">
      <span class="link"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
          /></svg
        >Elimina Paziente</span
      >
    </p>
    <p class="menu-element" @click="goTo('/modify-patient')">
      <span class="link"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
          /></svg
        >Modifica Paziente</span
      >
    </p>
    <p class="menu-element" @click="goTo('/get-results')">
      <span class="link"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm64 192c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm64-64c0-17.7 14.3-32 32-32s32 14.3 32 32V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V160zM320 288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V320c0-17.7 14.3-32 32-32z"
          /></svg
        >Risultati Paziente</span
      >
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
svg {
  width: 15px;
  height: 15px;
  margin-right: 10px;
  margin-left: 22px;
  fill: white;
}
p {
  cursor: pointer;
}
.main-content {
  display: flex;
}
.Side_bar_Component {
  background-color: #7fd388;
  position: fixed;
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
  font-size: 18px;
  border-radius: 50px;
  padding: 15px;
  transition: 0.3s;
}
.menu-element:hover {
  background-color: lightgreen;
}
</style>
