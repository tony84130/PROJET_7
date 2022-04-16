import { createRouter, createWebHashHistory } from "vue-router";
//import Home from "../views/Home.vue";


const routes = [
  {
    path: "/home",
    name: "Home",
    component: () =>
    import("../views/Home.vue"),
  },
  {
    path: "/navbar",
    name: "navbar",
    component: () =>
    import("../components/Navbar.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import("../views/Signup.vue"),
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () =>
      import("../views/Profil.vue"),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () =>
      import("../views/Edit-profil.vue"),
  },
  {
    path: '/profil',
    name: 'profil',
    component: () =>
      import("../views/Profil.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/Login.vue"),
  },
  {
    path: "/test",
    name: "Login-Post",
    component: () =>
      import("../components/allPosts.vue"),
  },
  {
    path: "/test1",
    name: "Login-Sugg",
    component: () =>
      import("../components/allUsers.vue"),
  },
  {
    path: "/test2",
    name: "Signup-page",
    component: () =>
      import("../views/Test-page2.vue"),
  },
  {
    path: "/test3",
    name: "Login-page3",
    component: () =>
      import("../views/Test-page3.vue"),
  },
  {
    path: "/test4",
    name: "Signup-page4",
    component: () =>
      import("../views/Test-Post.vue"),
  },
  {
    path: "/test5",
    name: "Signup-page5",
    component: () =>
      import("../components/allPostsFromUser.vue"),
  },
  {
    path: "/test6",
    name: "Signup-page6",
    component: () =>
      import("../components/UserInfos.vue"),
  },
  {
    path: "/test7",
    name: "Signup-page7",
    component: () =>
      import("../components/addPost.vue"),
  },
  {
    path: "/test8",
    name: "Signup-page8",
    component: () =>
      import("../views/Test-delete.vue"),
  },
  {
    path: "/test9",
    name: "Signup-page9",
    component: () =>
      import("../views/Test-addPost.vue"),
  },
  {
    path: "/test10",
    name: "Signup-page10",
    component: () =>
      import("../components/Post-liked.vue"),
  },
  {
    path: "/liked",
    name: "Liked-page",
    component: () =>
      import("../views/Liked-page.vue"),
  },
  {
    path: "/test11",
    name: "User-page",
    component: () =>
      import("../components/UserPage-TEST.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;