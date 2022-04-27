import { createRouter, createWebHistory } from "vue-router";
import store from '../store/index.js';


const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
    import("../views/Home.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import("../views/Signup.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/Login.vue"),
  },
  {
    path: '/profil',
    name: 'profil',
    component: () =>
      import("../views/Profil.vue"),
  },
  {
    path: `/user/:id`,
    name: "User-page",
    props: true,
    component: () =>
      import("../views/OtherProfil.vue"),
  },
  {
    path: "/publication/:id",
    name: "Modify-Publication",
    component: () =>
      import("../views/Modify-Publication.vue"),
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
  }
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