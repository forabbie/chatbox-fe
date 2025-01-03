import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Lara from "@primevue/themes/lara";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Lara,
  },
});

app.mount("#app");
