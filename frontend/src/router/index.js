import { createRouter, createWebHistory } from "vue-router";
//import Home from "../views/Home.vue";
import store from '../store/index.js';


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
    path: "/test1",
    name: "Login-Sugg",
    component: () =>
      import("../components/allUsers.vue"),
  },
  {
    path: "/test4",
    name: "Signup-page4",
    component: () =>
      import("../views/allPosts.vue"),
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
    path: `/test11/?id=:id`,
    name: "User-page",
    component: () =>
      import("../components/UserPage-TEST.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
	const isLogged = store.state.isLogged
	if ((to.name !== 'login' && !isLogged) && (to.name !== 'signup' && !isLogged)) next({ name: 'login' })
	else next()
})

export default router;