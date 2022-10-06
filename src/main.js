import { createApp, Vue } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SuiVue from 'semantic-ui-vue';



createApp(App).use(SuiVue).use(store).use(router).mount("#app");
