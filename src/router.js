import { createRouter, createWebHistory } from "vue-router";
import Home from "./page/Home.vue";
import ListCocktail from "./components/ListCocktail.vue";
import Login from "./components/Login.vue";
import Store from "./components/Store.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/drinks",
    name: "Drinks",
    component: ListCocktail,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/store",
    name: "Store",
    component: Store, 
    meta: { requiresAuth: true }, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); 
  } else {
    next(); 
  }
});

export default router;
