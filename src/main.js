import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueFire } from "vuefire";
import { firebaseApp } from "./database/firestore";

import App from "./App.vue";
// import router from "./router";

const app = createApp(App);

app.use(createPinia());
// app.use(router);
app.use(VueFire, { firebaseApp });

app.mount("#app");
