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
  // Récupération des composants qui vont créer la page profil d'un autre utilisateur
  import Nav from "@/components/Navbar.vue";
  import User from "@/components/OtherUserInfos.vue";
  import Post from "@/components/allPostsFromOtherUser.vue";
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