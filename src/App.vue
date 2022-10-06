<template>

  <template v-if="user">
    <router-view />
  </template>
  <Auth v-if="!user && user !== undefined"/>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { auth } from "./utils/firebase";
import { useStore } from "vuex";
import { computed } from "vue";
import Auth from "./views/Auth.vue";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        store.commit("setUser", user);
      });
    });
    return {
      user,
    };

  },
  components:{
    Auth
  }
};
</script>

<style lang="scss"></style>
