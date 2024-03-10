// import './assets/main.css'
import { createApp } from "vue";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import App from "./App.vue";
import router from "./router";
import { store } from "./stores/store";
const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
