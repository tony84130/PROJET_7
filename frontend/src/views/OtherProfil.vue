<template>
  <div class="home">
    <div class="container">
      <Nav />
      <User />
      <Post />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
// @ is an alias to /src
import Nav from "@/components/Navbar.vue";
import User from "@/components/UserPage-TEST.vue";
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