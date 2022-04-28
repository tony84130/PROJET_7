<template>
  <div class="home">
    <div class="container">
      <Nav />
      <User />
      <Post />
    </div>
  </div>
</template>

<script>
  // Récupération des composants qui vont créer la page profil d'un utilisateur
  import Nav from "@/components/Navbar.vue";
  import User from "@/components/UserInfos.vue";
  import Post from "@/components/allPostsFromUser.vue";
  export default {
    name: "Profil-page",
    components: {
      Nav,
      User,
      Post,
    },
  };
</script>

<style lang="scss" scoped></style>