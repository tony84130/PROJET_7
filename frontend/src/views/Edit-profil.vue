<template>
  <div class="home">
    <div class="container">
      <Nav />
      <Edit />
      <Profil />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
// @ is an alias to /src
import Nav from "@/components/Navbar.vue";
import Edit from "@/components/Edit-profil.vue";
import Profil from "@/components/allPostsFromUser.vue";
export default {
  name: "Profil-page",
  components: {
    Nav,
    Edit,
    Profil,
  },
};
</script>