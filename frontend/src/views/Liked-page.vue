<template>
  <div class="home">
    <div class="container">
      <Nav />
      <Post />
    </div>
  </div>
</template>

<script>
  // Récupération des composants qui vont créer la page des posts likés par l'utilisateur
  import Nav from "@/components/Navbar.vue";
  import Post from "@/components/Post-liked.vue";
  export default {
    name: "Profil-page",
    components: {
      Nav,
      Post,
    },
  };
</script>

<style lang="scss" scoped></style>