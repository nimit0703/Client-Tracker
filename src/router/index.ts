import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ClientView from "../views/ClientView.vue";
import AddClientView from "@/views/AddClientView.vue";
import SignupSignIn from "@/views/SignupSignIn.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AboutView from "@/views/AboutView.vue";
import AddUser from "@/views/users/AddUser.vue";
import NotAuthorized from "@/views/NotAuthorized.vue";
import ClientDetailsView from "@/views/ClientDetailsView.vue";
import UsersView from "@/views/UsersView.vue";
import PdfForms from "@/components/viewClientForms/PdfForms.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/clients",
      name: "clients",
      component: ClientView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/new-client",
      name: "new-client",
      component: AddClientView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: SignupSignIn,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/new-user",
      name: "new-user",
      component: AddUser,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path:'/notAuthorized',
      name:'notAuthorized',
      component: NotAuthorized,
    },
    {
      path:'/x',
      name:'x',
      component: PdfForms,
    },
    {
      path:'/clients/client-details',
      name:'client-details',
      component: ClientDetailsView,
      meta: {
        requiresAuth: true,
      },
    },
      ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListner = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListner();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/register");
    }
  } else {
    next();
  }
});

export default router;
