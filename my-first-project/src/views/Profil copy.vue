<template>
  <div class="home">
    <div class="container">
      <Nav />
      <User />
      <Profil />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
// @ is an alias to /src
import Nav from "@/components/Navbar.vue";
import User from "@/components/UserInfos.vue";
import Profil from "@/components/Profil.vue";
export default {
  name: "Profil-page",
  components: {
    Nav,
    User,
    Profil,
  },
};
</script>