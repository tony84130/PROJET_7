<template>
  <div class="home">
    <div class="container">
      <Nav />
      <Sugg />
      <Add />
      <Post /> 
    </div>
  </div>
</template>

<script>
  // Récupération des composants qui vont créer la page d'acceuil
  import Nav from "@/components/Navbar.vue";
  import Sugg from "@/components/allUsers.vue";
  import Add from "@/components/addPost.vue";
  import Post from "@/components/allPosts.vue";

  export default {
    name: "Home-page",
    components: {
      Nav,
      Sugg,
      Add,
      Post,
    },
  };
</script>

<style lang="scss" scoped></style>