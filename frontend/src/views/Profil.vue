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
  // @ is an alias to /src
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